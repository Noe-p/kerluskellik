import { Image, P16 } from "@/components";
import { Trans, useTranslation } from "next-i18next";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

export function Carte(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Main id={NAVBAR_LINKS.CARTE}>
      <Wrap>
        <TextCol>
          <Eyebrow>{t("carte.title")}</Eyebrow>
          <Rule />
          <Heading>{t("carte.heading")}</Heading>
          <Hook>{t("carte.hook")}</Hook>
        </TextCol>
        <MapCol>
          <MapCard>
            <Badge>
              <CompassIcon />
            </Badge>
            <MapImage
              fill={false}
              src="/images/carte.webP"
              alt="Carte de l'île de Batz"
            />
          </MapCard>
          <Caption>
            <Trans i18nKey="carte.address" components={{ br: <br key="br-1" /> }} />
          </Caption>
        </MapCol>
      </Wrap>
    </Main>
  );
}

function CompassIcon(): React.JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M14 3V7M14 21V25M3 14H7M21 14H25"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M14 8.5L16.2 14L14 19.5L11.8 14Z" fill="currentColor" />
    </svg>
  );
}

const Main = tw.div`
  px-5 md:px-10
  py-20
  md:py-28
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

const Hook = tw(P16)`
  text-cream/85
  font-light
  leading-relaxed
  mt-5
  max-w-100
  mx-auto
  md:mx-0
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
