import { Grid2, H2, Image, P16 } from "@/components";
import { Trans, useTranslation } from "next-i18next";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

export function Description(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Main id={NAVBAR_LINKS.DESCRIPTION}>
      <TextContainer>
        <Eyebrow>{t("description.title")}</Eyebrow>
        <Rule />
        <Heading>{t("description.heading")}</Heading>
        <Content className="mt-5">
          <Trans
            i18nKey="description.content"
            components={{ br: <br key="br-1" /> }}
          />
        </Content>
      </TextContainer>
      <Frame>
        <Image
          fill
          objectFit="cover"
          className="rounded-none"
          loading="lazy"
          src="/images/rdc/rdc-6.webP"
          alt="Une maison de capitaine"
        />
      </Frame>
    </Main>
  );
}

const Main = tw(Grid2)`
  md:gap-16
  py-14 md:py-20
  justify-center
  items-center
  px-5 md:px-10
`;

const TextContainer = tw.div`
  flex
  flex-col
  h-full
  w-full
  h-fit
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
  leading-tight
`;

const Content = tw(P16)`
  font-light
  leading-relaxed
`;

const Frame = tw.div`
  relative
  w-full
  h-80
  md:h-120
  border
  border-goldDeep
  p-3
  md:p-4
`;
