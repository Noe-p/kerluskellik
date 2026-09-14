import { CompassIcon, Image, P16, Reveal, SailboatIcon } from "@/components";
import { Trans, useTranslation } from "next-i18next";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

export function Carte(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Main id={NAVBAR_LINKS.CARTE}>
      <Wrap>
        <Reveal>
          <TextCol>
            <Eyebrow>{t("carte.title")}</Eyebrow>
            <Rule />
            <Heading>{t("carte.heading")}</Heading>
            <HookRow>
              <SailboatIcon size={16} className="shrink-0 text-secondary/70 mt-1" />
              <Hook>{t("carte.hook")}</Hook>
            </HookRow>
          </TextCol>
        </Reveal>
        <Reveal delay={0.15}>
          <MapCol>
            <MapCard>
              <Badge>
                <CompassIcon size={22} />
              </Badge>
              <MapImage
                fill={false}
                src="/images/carte.webP"
                alt={t("carte.imageAlt")}
              />
            </MapCard>
            <Caption>
              <Trans i18nKey="carte.address" components={{ br: <br key="br-1" /> }} />
            </Caption>
          </MapCol>
        </Reveal>
      </Wrap>
    </Main>
  );
}

const Main = tw.div`
  px-5 md:px-10
  py-14
  md:py-20
  bg-primary
`;

const Wrap = tw.div`
  grid
  md:grid-cols-2
  gap-12
  md:gap-20
  max-w-300
  mx-auto
  items-center
`;

const TextCol = tw.div`
  flex
  flex-col
  text-center
  md:text-left
`;

const Eyebrow = tw.p`
  font-sanchez
  text-secondary
  text-xs
  font-medium
  tracking-[0.22em]
  uppercase
`;

const Rule = tw.div`
  w-14
  h-px
  bg-secondary
  my-5
  mx-auto
  md:mx-0
`;

const Heading = tw.h2`
  font-title
  font-semibold
  text-cream
  text-3xl
  leading-tight
`;

const HookRow = tw.div`
  flex
  items-start
  gap-2.5
  justify-center
  md:justify-start
  mt-5
  max-w-100
  mx-auto
  md:mx-0
`;

const Hook = tw(P16)`
  text-cream/85
  font-light
  leading-relaxed
`;

const MapCol = tw.div`
  flex
  flex-col
`;

const MapCard = tw.div`
  relative
  bg-navySoft
  border
  border-cream/20
  p-6 md:p-8
`;

const Badge = tw.div`
  absolute
  -top-5
  -left-5
  w-13
  h-13
  rounded-full
  bg-primary
  border
  border-secondary
  text-secondary
  flex
  items-center
  justify-center
`;

const MapImage = tw(Image)`
  w-full
  h-auto
  object-contain
`;

const Caption = tw(P16)`
  text-cream/75
  text-center
  mt-6
`;
