import { ColCenter, H2, Image, P18 } from "@/components";
import { Trans, useTranslation } from "next-i18next";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

export function Carte(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Main id={NAVBAR_LINKS.CARTE}>
      <H2 className="text-white">{t("carte.title")}</H2>
      <MapContainer>
        <MapStyled src="/images/carte.webP" alt="map" objectFit="contain" />
      </MapContainer>
      <P18 className="mt-5 text-center text-white">
        <Trans i18nKey="carte.address" components={{ br: <br key="br-1" /> }} />
      </P18>
      <BateauImage
        className="bateau sm:block"
        src="/images/bateau.webP"
        alt="bateau"
      />
    </Main>
  );
}

const Main = tw(ColCenter)`
  px-5 md:px-10
  py-20
  justify-center
  items-center
  bg-primary
`;

const MapContainer = tw.div`
  w-full
  h-auto
  max-w-2xl
  relative
`;

const MapStyled = tw(Image)`
  object-contain
  scale-105

`;

const BateauImage = tw.img`
  hidden
  sm:block
  relative
  mt-10
`;
