import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isSaturday,
  isToday,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
} from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import type { Locale } from 'date-fns/locale/types';
import { Check, ChevronLeft, ChevronRight, Loader2, X } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import { CompassIcon, Modal, Reveal } from '@/components';
import { NAVBAR_LINKS } from '../Navbar';

interface BookedRange {
  start: string;
  end: string;
}

interface Selection {
  start: Date | null;
  end: Date | null;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s().-]{6,19}$/;
const MIN_SUBMIT_DELAY_MS = 1500;

function isDateBooked(day: Date, ranges: BookedRange[]): boolean {
  // Booked ranges come from all-day iCal events with no time component. The API
  // serializes them through toISOString(), so range.start/end land as UTC instants
  // that don't line up with the browser's local midnight. Re-flooring both ends to
  // local start-of-day keeps the comparison in whole calendar days on both sides -
  // without it, a positive UTC offset (e.g. Europe/Paris) makes the checkout day
  // falsely read as still booked.
  return ranges.some(
    (range) =>
      day >= startOfDay(new Date(range.start)) && day < startOfDay(new Date(range.end)),
  );
}

function isRangeFree(start: Date, end: Date, ranges: BookedRange[]): boolean {
  return !eachDayOfInterval({ start, end: subDays(end, 1) }).some((day) =>
    isDateBooked(day, ranges),
  );
}

export function Disponibilites(): React.JSX.Element {
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.startsWith('fr') ? fr : enUS;
  const today = useMemo(() => startOfDay(new Date()), []);

  const [monthOffset, setMonthOffset] = useState(0);
  const [booked, setBooked] = useState<BookedRange[]>([]);
  const [configured, setConfigured] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [selection, setSelection] = useState<Selection>({ start: null, end: null });
  const [hoverDay, setHoverDay] = useState<Date | null>(null);

  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const formShownAt = useRef<number | null>(null);

  useEffect(() => {
    if (selection.start && selection.end) {
      formShownAt.current = Date.now();
    }
  }, [selection.start, selection.end]);

  function updateField<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(values: FormState): FieldErrors {
    const errors: FieldErrors = {};
    if (values.name.trim().length < 2) {
      errors.name = t('disponibilites.form.errors.name');
    }
    if (!EMAIL_REGEX.test(values.email.trim())) {
      errors.email = t('disponibilites.form.errors.email');
    }
    if (values.phone.trim() && !PHONE_REGEX.test(values.phone.trim())) {
      errors.phone = t('disponibilites.form.errors.phone');
    }
    return errors;
  }

  useEffect(() => {
    let isMounted = true;

    fetch('/api/availability')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setBooked(data.booked ?? []);
        setConfigured(data.configured ?? false);
      })
      .catch(() => {
        if (isMounted) setConfigured(false);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const firstMonth = addMonths(startOfMonth(today), monthOffset);
  const secondMonth = addMonths(firstMonth, 1);

  function handleDayClick(day: Date) {
    if (selection.start && !selection.end) {
      if (isSameDay(day, selection.start)) {
        setSelection({ start: null, end: null });
        return;
      }
      setSelection({ start: selection.start, end: day });
      setStatus('idle');
      return;
    }

    setSelection({ start: day, end: null });
    setStatus('idle');
  }

  const selectionHint = !selection.start
    ? t('disponibilites.selectStart')
    : !selection.end
      ? t('disponibilites.selectEnd')
      : null;

  function resetSelection() {
    setSelection({ start: null, end: null });
    setStatus('idle');
    setForm({ name: '', email: '', phone: '', message: '' });
    setFieldErrors({});
    setHoneypot('');
  }

  const nights =
    selection.start && selection.end ? differenceInCalendarDays(selection.end, selection.start) : 0;
  const weeks = nights / 7;

  const rangeLabel =
    selection.start && selection.end
      ? t('disponibilites.form.dateRange', {
        start: format(selection.start, 'd MMMM', { locale }),
        end: format(selection.end, 'd MMMM yyyy', { locale }),
      })
      : '';

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selection.start || !selection.end || !WEB3FORMS_ACCESS_KEY) return;

    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const elapsed = formShownAt.current ? Date.now() - formShownAt.current : Infinity;
    const looksLikeBot = honeypot.trim().length > 0 || elapsed < MIN_SUBMIT_DELAY_MS;

    if (looksLikeBot) {
      // Silently pretend success rather than tipping off the bot to a rejection.
      setStatus('success');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Demande de réservation Kerluskellik : ${rangeLabel}`,
          from_name: form.name.trim(),
          // Web3Forms builds the email body from these field names directly
          // (capitalizing only the first letter), and reads "email" specifically
          // to set the Reply-To header - so that one key must stay as-is.
          nom: form.name.trim(),
          email: form.email.trim(),
          téléphone: form.phone.trim(),
          'dates du séjour': rangeLabel,
          'nombre de nuits': nights,
          message: form.message.trim(),
          botcheck: honeypot,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <Main id={NAVBAR_LINKS.DISPONIBILITES}>
      <Reveal className="flex flex-col items-center">
        <HeaderBlock>
          <CompassBadge>
            <CompassIcon size={22} />
          </CompassBadge>
          <Eyebrow>{t('disponibilites.title')}</Eyebrow>
          <Rule />
          <Hook>{t('disponibilites.hook')}</Hook>
        </HeaderBlock>
      </Reveal>

      {isLoading ? (
        <Unavailable>{t('common.loading')}</Unavailable>
      ) : !configured ? (
        <Unavailable>{t('disponibilites.unavailable')}</Unavailable>
      ) : (
        <Reveal delay={0.1} className="flex flex-col items-center w-full">
          <StatusBar>
            <HintGroup>
              {selectionHint && <SelectionHint>{selectionHint}</SelectionHint>}
              {selection.start && !selection.end && (
                <CancelLink
                  type="button"
                  onClick={() => setSelection({ start: null, end: null })}
                >
                  {t('disponibilites.cancelSelection')}
                </CancelLink>
              )}
            </HintGroup>
            <Nav>
              <NavButton
                type="button"
                aria-label={t('disponibilites.prevMonth')}
                disabled={monthOffset === 0}
                onClick={() => setMonthOffset((offset) => Math.max(0, offset - 1))}
              >
                <ChevronLeft size={18} />
              </NavButton>
              <NavButton
                type="button"
                aria-label={t('disponibilites.nextMonth')}
                onClick={() => setMonthOffset((offset) => offset + 1)}
              >
                <ChevronRight size={18} />
              </NavButton>
            </Nav>
          </StatusBar>

          <Months>
            <MonthGrid
              monthDate={firstMonth}
              today={today}
              booked={booked}
              locale={locale}
              selection={selection}
              hoverDay={hoverDay}
              onDayClick={handleDayClick}
              onDayHover={setHoverDay}
            />
            <SecondMonth>
              <MonthGrid
                monthDate={secondMonth}
                today={today}
                booked={booked}
                locale={locale}
                selection={selection}
                hoverDay={hoverDay}
                onDayClick={handleDayClick}
                onDayHover={setHoverDay}
              />
            </SecondMonth>
          </Months>

          <Legend>
            <LegendItem>
              <Swatch $variant="booked" />
              <LegendLabel>{t('disponibilites.legend.booked')}</LegendLabel>
            </LegendItem>
            <LegendItem>
              <Swatch $variant="selected" />
              <LegendLabel>{t('disponibilites.legend.selected')}</LegendLabel>
            </LegendItem>
            <LegendItem>
              <Swatch $variant="free" />
              <LegendLabel>{t('disponibilites.legend.free')}</LegendLabel>
            </LegendItem>
          </Legend>

          <Modal
            isOpen={Boolean(selection.start && selection.end)}
            onRequestClose={resetSelection}
            contentClassName="relative !w-[92vw] sm:!w-[32rem] !max-w-[32rem] !max-h-[85vh] overflow-y-auto !rounded-2xl !bg-cream !p-6 sm:!p-10"
          >
            <ModalCloseButton
              type="button"
              onClick={resetSelection}
              aria-label={t('common.close')}
            >
              <X size={18} />
            </ModalCloseButton>

            {status === 'success' ? (
              <SuccessPanel>
                <SuccessIconWrap>
                  <Check size={20} />
                </SuccessIconWrap>
                <SuccessText>
                  {t('disponibilites.form.success', { email: form.email })}
                </SuccessText>
                <ChangeDatesButton type="button" onClick={resetSelection}>
                  {t('disponibilites.form.newRequest')}
                </ChangeDatesButton>
              </SuccessPanel>
            ) : (
              <FormPanel onSubmit={handleSubmit} noValidate>
                <RequestBadge>{t('disponibilites.form.requestBadge')}</RequestBadge>

                <Summary>
                  <div>
                    <SummaryDates>{rangeLabel}</SummaryDates>
                    <SummaryNights>{t('disponibilites.form.weeks', { count: weeks })}</SummaryNights>
                  </div>
                  <ChangeDatesButton type="button" onClick={resetSelection}>
                    {t('disponibilites.form.changeDates')}
                  </ChangeDatesButton>
                </Summary>

                <RequestNote>{t('disponibilites.form.requestNote')}</RequestNote>

                <HoneypotField
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHoneypot(e.target.value)
                  }
                />

                <FieldsRow>
                  <Field>
                    <Label htmlFor="disponibilites-name">
                      {t('disponibilites.form.name')}
                    </Label>
                    <Input
                      id="disponibilites-name"
                      required
                      maxLength={100}
                      $hasError={Boolean(fieldErrors.name)}
                      value={form.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateField('name', e.target.value)
                      }
                    />
                    {fieldErrors.name && <ErrorText>{fieldErrors.name}</ErrorText>}
                  </Field>
                  <Field>
                    <Label htmlFor="disponibilites-email">
                      {t('disponibilites.form.email')}
                    </Label>
                    <Input
                      id="disponibilites-email"
                      type="email"
                      required
                      maxLength={150}
                      $hasError={Boolean(fieldErrors.email)}
                      value={form.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateField('email', e.target.value)
                      }
                    />
                    {fieldErrors.email && <ErrorText>{fieldErrors.email}</ErrorText>}
                  </Field>
                </FieldsRow>

                <Field>
                  <Label htmlFor="disponibilites-phone">
                    {t('disponibilites.form.phone')}
                  </Label>
                  <Input
                    id="disponibilites-phone"
                    type="tel"
                    maxLength={20}
                    $hasError={Boolean(fieldErrors.phone)}
                    value={form.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateField('phone', e.target.value)
                    }
                  />
                  {fieldErrors.phone && <ErrorText>{fieldErrors.phone}</ErrorText>}
                </Field>

                <Field>
                  <Label htmlFor="disponibilites-message">
                    {t('disponibilites.form.message')}
                  </Label>
                  <Textarea
                    id="disponibilites-message"
                    rows={3}
                    maxLength={2000}
                    placeholder={t('disponibilites.form.messagePlaceholder')}
                    value={form.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      updateField('message', e.target.value)
                    }
                  />
                </Field>

                {!WEB3FORMS_ACCESS_KEY ? (
                  <Warning>{t('disponibilites.form.notConfigured')}</Warning>
                ) : (
                  <>
                    <SubmitButton type="submit" disabled={status === 'submitting'}>
                      {status === 'submitting' && (
                        <Loader2 size={16} className="animate-spin" />
                      )}
                      {status === 'submitting'
                        ? t('disponibilites.form.submitting')
                        : t('disponibilites.form.submit')}
                    </SubmitButton>
                    {status === 'error' && <Warning>{t('disponibilites.form.error')}</Warning>}
                  </>
                )}
              </FormPanel>
            )}
          </Modal>
        </Reveal>
      )}
    </Main>
  );
}

interface MonthGridProps {
  monthDate: Date;
  today: Date;
  booked: BookedRange[];
  locale: Locale;
  selection: Selection;
  hoverDay: Date | null;
  onDayClick: (day: Date) => void;
  onDayHover: (day: Date | null) => void;
}

function MonthGrid(props: MonthGridProps): React.JSX.Element {
  const { monthDate, today, booked, locale, selection, hoverDay, onDayClick, onDayHover } = props;
  const { t } = useTranslation();

  const weekStart = startOfWeek(monthDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const weekDayLabels = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, { weekStartsOn: 1 }),
  });

  // Stays run whole weeks, Saturday to Saturday, and can span more than one week.
  // With no arrival picked yet, hovering a bookable Saturday previews a 1-week stay.
  // Once an arrival is picked, hovering a later, reachable Saturday previews that
  // departure instead, so the range can be extended to 2, 3+ weeks.
  const previewStart = !selection.start ? hoverDay : selection.start;
  const previewEnd = !selection.start ? (hoverDay ? addDays(hoverDay, 7) : null) : hoverDay;
  const rangeStart = selection.start ?? previewStart;
  const rangeEnd = selection.end ?? previewEnd;
  const previewStartIsGhost = !selection.start;
  const previewEndIsGhost = !selection.end;

  return (
    <MonthCol>
      <MonthLabel>{format(monthDate, 'MMMM yyyy', { locale })}</MonthLabel>
      <WeekRow>
        {weekDayLabels.map((day) => (
          <WeekDay key={day.toISOString()}>{format(day, 'EEE', { locale }).slice(0, 2)}</WeekDay>
        ))}
      </WeekRow>
      <DaysGrid onMouseLeave={() => onDayHover(null)}>
        {days.map((day) => {
          const inMonth = isSameMonth(day, monthDate);
          const isPast = isBefore(day, today) && !isSameDay(day, today);
          const isBookedDay = isDateBooked(day, booked);
          const isConfirmedStart = Boolean(selection.start && isSameDay(day, selection.start));

          let isSelectable: boolean;
          if (!selection.start) {
            // Picking an arrival date: only a Saturday whose following week is
            // entirely free can start a stay.
            isSelectable =
              inMonth && !isPast && isSaturday(day) && isRangeFree(day, addDays(day, 7), booked);
          } else if (!selection.end) {
            // Picking a departure date: any later Saturday reachable without
            // crossing a booked day extends the stay by full weeks.
            const minEnd = addDays(selection.start, 7);
            isSelectable =
              inMonth &&
              isSaturday(day) &&
              !isBefore(day, minEnd) &&
              isRangeFree(selection.start, day, booked);
          } else {
            isSelectable = false;
          }
          // The confirmed arrival stays clickable so it can be tapped again to
          // restart the selection while picking a departure date.
          const isClickable = isSelectable || isConfirmedStart;

          const isConfirmedEnd = Boolean(selection.end && isSameDay(day, selection.end));
          const isPreviewStart = Boolean(
            previewStartIsGhost && previewStart && isSameDay(day, previewStart),
          );
          const isPreviewEnd = Boolean(
            previewEndIsGhost && previewEnd && isSameDay(day, previewEnd),
          );
          const isInRange = Boolean(
            rangeStart &&
              rangeEnd &&
              !isConfirmedStart &&
              !isConfirmedEnd &&
              !isPreviewStart &&
              !isPreviewEnd &&
              isWithinInterval(day, { start: rangeStart, end: rangeEnd }),
          );

          const statusLabel = isBookedDay
            ? `, ${t('disponibilites.legend.booked')}`
            : isConfirmedStart || isConfirmedEnd
              ? `, ${t('disponibilites.legend.selected')}`
              : '';

          return (
            <Day
              key={day.toISOString()}
              type="button"
              disabled={!isClickable}
              aria-label={`${format(day, 'EEEE d MMMM yyyy', { locale })}${statusLabel}`}
              aria-current={isToday(day) ? 'date' : undefined}
              $inMonth={inMonth}
              $isPast={isPast}
              $isBooked={isBookedDay}
              $isToday={isToday(day)}
              $isFilled={isConfirmedStart || isConfirmedEnd}
              $isPreviewEdge={isPreviewStart || isPreviewEnd}
              $isInRange={isInRange}
              $isSelectable={isSelectable}
              onClick={() => isClickable && onDayClick(day)}
              onMouseEnter={() => isSelectable && onDayHover(day)}
            >
              {format(day, 'd')}
            </Day>
          );
        })}
      </DaysGrid>
    </MonthCol>
  );
}

const Main = tw.div`
  flex
  flex-col
  items-center
  w-full
  max-w-300
  mx-auto
  px-5 md:px-10
  py-14
  md:py-20
`;

const HeaderBlock = tw.div`
  flex
  flex-col
  items-center
  text-center
  mb-12
`;

const CompassBadge = tw.div`
  flex
  items-center
  justify-center
  w-11 h-11
  rounded-full
  border
  border-goldDeep
  text-goldDeep
  mb-4
`;

const Eyebrow = tw.h2`
  font-sanchez
  text-goldDeep
  text-xs
  font-medium
  tracking-[0.22em]
  uppercase
`;

const Rule = tw.div`
  w-14
  h-px
  bg-goldDeep
  my-5
`;

const Hook = tw.p`
  font-sanchez
  text-primary/65
  text-sm
  max-w-md
`;

const Unavailable = tw.p`
  font-sanchez
  text-primary/65
  text-sm
  text-center
  max-w-md
`;

const StatusBar = tw.div`
  flex
  flex-col
  md:flex-row
  items-center
  md:items-end
  justify-center
  md:justify-between
  gap-3
  w-full
  mb-6
`;

const HintGroup = tw.div`
  flex
  items-center
  gap-3
`;

const SelectionHint = tw.p`
  font-sanchez
  text-primary
  text-xs
  font-medium
  tracking-[0.05em]
  uppercase
`;

const CancelLink = tw.button`
  font-sanchez
  text-primary/40
  text-[11px]
  uppercase
  tracking-[0.05em]
  underline
  underline-offset-4
  hover:text-goldDeep
  transition-colors
`;

const Nav = tw.div`
  flex
  flex-row
  gap-3
`;

const NavButton = tw.button`
  flex
  items-center
  justify-center
  w-9 h-9
  rounded-full
  border
  border-primary/15
  text-primary
  transition-all
  duration-300
  hover:border-goldDeep
  hover:text-goldDeep
  disabled:opacity-30
  disabled:pointer-events-none
`;

const Months = tw.div`
  grid
  md:grid-cols-2
  gap-12 md:gap-16
  w-full
`;

const SecondMonth = tw.div`
  hidden
  md:block
`;

const MonthCol = tw.div`
  flex
  flex-col
`;

const MonthLabel = tw.p`
  font-title
  font-semibold
  text-primary
  text-lg
  capitalize
  mb-4
  text-center
`;

const WeekRow = tw.div`
  grid
  grid-cols-7
  mb-2
`;

const WeekDay = tw.p`
  font-sanchez
  text-primary/40
  text-[10px]
  font-medium
  tracking-[0.1em]
  uppercase
  text-center
  capitalize
`;

const DaysGrid = tw.div`
  grid
  grid-cols-7
  gap-2
`;

interface DayProps {
  $inMonth: boolean;
  $isPast: boolean;
  $isBooked: boolean;
  $isToday: boolean;
  $isFilled: boolean;
  $isPreviewEdge: boolean;
  $isInRange: boolean;
  $isSelectable: boolean;
}

const Day = tw.button<DayProps>`
  h-11
  md:h-14
  flex
  items-center
  justify-center
  rounded-lg
  border
  font-sanchez
  text-sm
  transition-colors
  duration-150
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-goldDeep
  focus-visible:ring-offset-2
  ${(props) => (props.$inMonth ? 'opacity-100' : 'opacity-0 pointer-events-none')}
  ${(props) =>
    props.$isBooked
      ? 'bg-primary/10 border-primary/15 text-primary/50 line-through decoration-primary/60 cursor-not-allowed'
      : props.$isFilled
        ? 'bg-goldDeep border-goldDeep text-white'
        : props.$isPreviewEdge
          ? 'border-goldDeep ring-2 ring-goldDeep text-primary'
          : props.$isInRange
            ? 'bg-goldDeep/15 border-goldDeep/15 text-primary'
            : props.$isPast
              ? 'border-primary/5 text-primary/30 cursor-not-allowed'
              : props.$isSelectable
                ? 'border-primary/20 text-primary cursor-pointer hover:border-goldDeep hover:bg-goldDeep/10'
                : 'border-primary/5 text-primary/30 cursor-default'}
  ${(props) =>
    props.$isToday && !props.$isBooked && !props.$isFilled && !props.$isPreviewEdge
      ? 'ring-1 ring-goldDeep'
      : ''}
`;

const Legend = tw.div`
  flex
  flex-row
  flex-wrap
  justify-center
  gap-6
  mt-10
`;

const LegendItem = tw.div`
  flex
  items-center
  gap-2
`;

const Swatch = tw.div<{ $variant: 'booked' | 'selected' | 'free' }>`
  w-3 h-3
  rounded-full
  border
  border-primary/20
  ${(props) =>
    props.$variant === 'booked'
      ? 'bg-primary/20 border-primary/35'
      : props.$variant === 'selected'
        ? 'bg-goldDeep border-goldDeep'
        : 'bg-transparent'}
`;

const LegendLabel = tw.p`
  font-sanchez
  text-primary/65
  text-[11px]
  tracking-[0.05em]
  uppercase
`;

const Warning = tw.p`
  font-sanchez
  text-error-600
  text-xs
  text-center
  bg-error-25
  border
  border-error-100
  rounded-full
  px-4
  py-2
  mb-6
  max-w-md
`;

const ModalCloseButton = tw.button`
  absolute
  top-3 right-3
  flex
  items-center
  justify-center
  w-9 h-9
  rounded-full
  border
  border-primary/15
  text-primary
  transition-colors
  duration-300
  hover:border-goldDeep
  hover:text-goldDeep
  z-10
`;

const FormPanel = tw.form`
  flex
  flex-col
  gap-6
  w-full
`;

const RequestBadge = tw.span`
  self-start
  font-sanchez
  text-goldDeep
  text-[10px]
  font-medium
  tracking-[0.18em]
  uppercase
  border
  border-goldDeep
  rounded-full
  px-3
  py-1
  -mb-2
`;

const RequestNote = tw.p`
  font-sanchez
  text-primary/50
  text-xs
  leading-relaxed
  -mt-2
`;

const Summary = tw.div`
  flex
  flex-col
  sm:flex-row
  sm:items-end
  sm:justify-between
  gap-3
  pr-10
`;

const SummaryDates = tw.p`
  font-title
  font-semibold
  text-primary
  text-lg
  capitalize
`;

const SummaryNights = tw.p`
  font-sanchez
  text-primary/50
  text-xs
  uppercase
  tracking-[0.08em]
  mt-1
`;

const ChangeDatesButton = tw.button`
  font-sanchez
  text-goldDeep
  text-[11px]
  uppercase
  tracking-[0.08em]
  underline
  underline-offset-4
  self-start
  sm:self-auto
`;

const FieldsRow = tw.div`
  grid
  sm:grid-cols-2
  gap-6
`;

const Field = tw.div`
  flex
  flex-col
  gap-2
`;

const Label = tw.label`
  font-sanchez
  text-primary/65
  text-[11px]
  tracking-[0.08em]
  uppercase
`;

const Input = tw.input<{ $hasError?: boolean }>`
  bg-transparent
  border-b
  py-2
  font-sanchez
  text-primary
  text-sm
  focus:outline-none
  transition-colors
  ${(props) => (props.$hasError ? 'border-error-500' : 'border-primary/20 focus:border-goldDeep')}
`;

const ErrorText = tw.p`
  font-sanchez
  text-error-500
  text-[11px]
`;

const HoneypotField = tw.input`
  absolute
  w-px
  h-px
  overflow-hidden
  opacity-0
  pointer-events-none
`;

const Textarea = tw.textarea`
  bg-transparent
  border-b
  border-primary/20
  py-2
  font-sanchez
  text-primary
  text-sm
  resize-none
  focus:outline-none
  focus:border-goldDeep
  transition-colors
`;

const SubmitButton = tw.button`
  flex
  items-center
  justify-center
  gap-2
  mt-2
  px-8
  py-3.5
  bg-primary
  text-cream
  text-xs
  font-medium
  tracking-[0.16em]
  uppercase
  transition-colors
  duration-300
  hover:bg-goldDeep
  disabled:opacity-50
  disabled:pointer-events-none
`;

const SuccessPanel = tw.div`
  flex
  flex-col
  items-center
  text-center
  gap-4
  w-full
`;

const SuccessIconWrap = tw.div`
  flex
  items-center
  justify-center
  w-11 h-11
  rounded-full
  bg-goldDeep
  text-white
`;

const SuccessText = tw.p`
  font-sanchez
  text-primary/75
  text-sm
  max-w-sm
`;
