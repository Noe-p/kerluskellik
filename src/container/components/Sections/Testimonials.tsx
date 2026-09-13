import { H2, Link } from "@/components";
import { testimonals } from "@/data";
import { Testimonial } from "@/types/Testimonal";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

const ENTRIES_PER_PAGE = 2;
const ENTRIES_PER_SPREAD = ENTRIES_PER_PAGE * 2;

const ROMAN_NUMERALS: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function toRoman(num: number): string {
  if (num <= 0) return "";
  const [value, symbol] = ROMAN_NUMERALS.find(([v]) => num >= v) ?? [1, ""];
  return symbol + toRoman(num - value);
}

export function Testimonials(): React.JSX.Element {
  const { t } = useTranslation();
  const [spread, setSpread] = useState(0);
  const totalSpreads = Math.max(
    1,
    Math.ceil(testimonals.length / ENTRIES_PER_SPREAD),
  );
  const spreadStart = spread * ENTRIES_PER_SPREAD;
  const leftPage = testimonals.slice(
    spreadStart,
    spreadStart + ENTRIES_PER_PAGE,
  );
  const rightPage = testimonals.slice(
    spreadStart + ENTRIES_PER_PAGE,
    spreadStart + ENTRIES_PER_SPREAD,
  );

  return (
    <Main id={NAVBAR_LINKS.TESTIMONIALS}>
      <Eyebrow>{t("testimonials.title")}</Eyebrow>
      <Rule />
      <Heading>{t("testimonials.heading")}</Heading>
      <Logbook>
        <Page className="md:border-r md:border-primary/15 md:[box-shadow:inset_-10px_0_16px_-14px_rgba(15,27,46,0.35)]">
          {leftPage.map((testimonial) => (
            <Entry key={testimonial.id} testimonial={testimonial} />
          ))}
          <PageNumber className="md:left-8">
            {toRoman(spread * 2 + 1)}
          </PageNumber>
        </Page>
        <Page className="md:[box-shadow:inset_10px_0_16px_-14px_rgba(15,27,46,0.35)]">
          {rightPage.map((testimonial) => (
            <Entry key={testimonial.id} testimonial={testimonial} />
          ))}
          {rightPage.length > 0 && (
            <PageNumber className="md:right-8">
              {toRoman(spread * 2 + 2)}
            </PageNumber>
          )}
        </Page>
      </Logbook>
      {totalSpreads > 1 && (
        <Pager>
          <PagerButton
            type="button"
            disabled={spread === 0}
            onClick={() => setSpread((s) => Math.max(0, s - 1))}
            aria-label={t("testimonials.previous")}
          >
            <ArrowLeftIcon size={15} />
          </PagerButton>
          <PagerLabel>{`${spread + 1} / ${totalSpreads}`}</PagerLabel>
          <PagerButton
            type="button"
            disabled={spread === totalSpreads - 1}
            onClick={() => setSpread((s) => Math.min(totalSpreads - 1, s + 1))}
            aria-label={t("testimonials.next")}
          >
            <ArrowRightIcon size={15} />
          </PagerButton>
        </Pager>
      )}
    </Main>
  );
}

function Entry(props: { testimonial: Testimonial }): React.JSX.Element {
  const { testimonial } = props;
  return (
    <EntryRow>
      <EntryDate>{testimonial.date}</EntryDate>
      <div>
        <Quote dangerouslySetInnerHTML={{ __html: testimonial.content }} />
        <Name>{testimonial.name}</Name>
      </div>
    </EntryRow>
  );
}

const Main = tw.div`
  flex
  flex-col
  items-center
  w-full
  px-5 md:px-10
  py-20
  md:py-28
`;

const Eyebrow = tw.p`
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

const Heading = tw(H2)`
  text-primary
  text-3xl
  md:text-4xl
`;

const Logbook = tw.div`
  relative
  grid
  md:grid-cols-2
  w-full
  max-w-260
  mt-14
  bg-[#F7F1E4]
  border
  border-primary/15
  [box-shadow:0_30px_70px_-20px_rgba(15,27,46,0.25)]
`;

const Page = tw.div`
  relative
  flex
  flex-col
  p-8
  md:p-13
  pb-16
`;

const EntryRow = tw.div`
  grid
  grid-cols-[64px_1fr]
  md:grid-cols-[84px_1fr]
  gap-5
  py-5
  border-b
  border-primary/10
  first:pt-0
  last:border-b-0
`;

const EntryDate = tw.p`
  font-title
  italic
  text-goldDeep
  text-xs
  leading-relaxed
`;

const Quote = tw.p`
  font-sanchez
  text-primary
  text-sm
  leading-relaxed
`;

const Name = tw.p`
  font-sanchez
  text-primary/55
  text-[10px]
  tracking-[0.1em]
  uppercase
  mt-2
`;

const PageNumber = tw.span`
  absolute
  bottom-6
  left-8
  font-title
  italic
  text-primary/35
  text-xs
`;

const Pager = tw.div`
  flex
  items-center
  gap-5
  mt-8
`;

const PagerButton = tw.button`
  flex
  items-center
  justify-center
  w-10 h-10
  rounded-full
  border
  border-goldDeep/40
  text-goldDeep
  cursor-pointer
  transition-colors
  hover:bg-goldDeep
  hover:text-white
  disabled:opacity-30
  disabled:cursor-not-allowed
  disabled:hover:bg-transparent
  disabled:hover:text-goldDeep
`;

const PagerLabel = tw.span`
  font-sanchez
  text-primary/55
  text-xs
  tracking-[0.1em]
`;

const MoreLink = tw(Link)`
  mt-10
  text-goldDeep
  text-xs
  tracking-[0.14em]
  uppercase
  border-b
  border-goldDeep
  pb-0.5
  hover:text-primary
  hover:border-primary
`;
