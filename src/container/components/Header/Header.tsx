import { H1, P16, P18 } from "@/components/Texts";
import { scrollTo } from "@/services/utils";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "next-i18next";
import React from "react";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

interface HeaderProps {
  className?: string;
}

export function Header(props: HeaderProps): React.JSX.Element {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Main id={NAVBAR_LINKS.HOME} className={className}>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/videos/header.mp4" type="video/mp4" />
      </VideoBackground>
      <Scrim />
      <Content>
        <Plate>
          <CompassBadge>
            <CompassIcon />
          </CompassBadge>
          <Eyebrow>{t("home.eyebrow")}</Eyebrow>
          <Title>{t("home.name")}</Title>
          <Rule />
          <SubTitle>{t("home.subTitle")}</SubTitle>
          <Hook>{t("home.hook")}</Hook>
          <CtaButton onClick={() => scrollTo(NAVBAR_LINKS.CONTACT)}>
            {t("home.cta")}
            <ArrowIcon />
          </CtaButton>
        </Plate>
      </Content>
      <ScrollCue onClick={() => scrollTo(NAVBAR_LINKS.DESCRIPTION)}>
        <P16 className="text-cream text-[10px] tracking-[0.2em] uppercase">
          {t("generics.discover")}
        </P16>
        <SlideButton />
      </ScrollCue>
    </Main>
  );
}

function CompassIcon(): React.JSX.Element {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
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

function ArrowIcon(): React.JSX.Element {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path
        d="M1 5H13M13 5L9 1M13 5L9 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Main = tw.div`
  relative
  flex
  flex-col
  items-center
  justify-center
  h-screen
  w-screen
  overflow-hidden
  z-0
`;

const VideoBackground = tw.video`
  absolute
  inset-0
  w-full
  h-full
  z-0
  object-cover
  object-center
`;

const Scrim = tw.div`
  absolute
  inset-0
  w-full
  h-full
  z-10
  bg-[linear-gradient(180deg,rgba(9,15,26,0.62)_0%,rgba(9,15,26,0.62)_9%,rgba(9,15,26,0)_26%,rgba(9,15,26,0)_68%,rgba(9,15,26,0.55)_100%)]
`;

const Content = tw.div`
  relative
  z-20
  flex
  items-center
  justify-center
  w-full
  px-5
`;

const Plate = tw.div`
  flex
  flex-col
  items-center
  gap-3
  md:gap-4
  px-8 py-10
  md:px-18 md:py-14
  max-w-2xl
  bg-primary/25
  backdrop-blur-[2px]
  border
  border-secondary/40
  shadow-2xl
  animate-fade-in-up
`;

const CompassBadge = tw.div`
  flex
  items-center
  justify-center
  w-12 h-12
  md:w-14 md:h-14
  rounded-full
  border
  border-secondary
  text-secondary
  mb-1
`;

const Eyebrow = tw.p`
  font-sanchez
  text-secondary
  text-xs
  md:text-sm
  font-medium
  tracking-[0.24em]
  uppercase
`;

const Title = tw(H1)`
  text-cream
  text-5xl
  md:text-8xl
  text-center
  leading-none
  font-title
  font-bold
  normal-case
  [text-shadow:0_4px_20px_rgba(6,10,18,0.55)]
`;

const Rule = tw.div`
  w-14
  h-px
  bg-secondary
`;

const SubTitle = tw(P18)`
  text-cream
  text-lg
  md:text-2xl
  italic
  text-center
  font-title
  font-medium
  [text-shadow:0_2px_14px_rgba(6,10,18,0.55)]
`;

const Hook = tw.p`
  font-sanchez
  text-cream
  text-sm
  md:text-base
  font-light
  text-center
  max-w-md
  [text-shadow:0_2px_14px_rgba(6,10,18,0.6)]
`;

const CtaButton = tw.button`
  mt-2
  flex
  items-center
  gap-3
  px-7 py-4
  border
  border-secondary
  bg-primary/20
  text-secondary
  text-xs
  font-medium
  tracking-[0.16em]
  uppercase
  cursor-pointer
  transition-colors
  hover:bg-secondary
  hover:text-primary
`;

const ScrollCue = tw.button`
  absolute
  bottom-10
  left-1/2
  -translate-x-1/2
  z-20
  flex
  flex-col
  items-center
  gap-3
  cursor-pointer
  [text-shadow:0_2px_10px_rgba(6,10,18,0.7)]
`;

const SlideButton = tw(ChevronDoubleDownIcon)`
  text-cream
  animate-bounce
  w-7
  h-7
  will-change-transform
  [filter:drop-shadow(0_2px_6px_rgba(6,10,18,0.7))]
`;
