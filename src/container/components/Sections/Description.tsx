import { AnchorIcon, Grid2, H2, Image, ParallaxImage, P16, Reveal } from "@/components";
import { Trans, useTranslation } from "next-i18next";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

export function Description(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Main id={NAVBAR_LINKS.DESCRIPTION}>
      <Reveal>
        <TextContainer>
          <IconBadge>
            <AnchorIcon size={20} />
          </IconBadge>
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
      </Reveal>
      <Reveal delay={0.15}>
        <Frame>
          <ParallaxImage distance={26}>
            <Image
              fill
              objectFit="cover"
              className="rounded-none"
              loading="lazy"
              src="/images/rdc/rdc-6.webP"
              alt={t("description.imageAlt")}
            />
          </ParallaxImage>
        </Frame>
      </Reveal>
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

const IconBadge = tw.div`
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
