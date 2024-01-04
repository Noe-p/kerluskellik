import { H1, P18 } from '@/components';
import { scrollTo } from '@/services/utils';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { NAVBAR_LINKS } from '../Navbar';

interface HeaderProps {
  className?: string;
}

export function Header(props: HeaderProps): React.JSX.Element {
  const { className } = props;
  const { t } = useTranslation();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  }, []);

  return (
    <Main id={NAVBAR_LINKS.HOME} className={className}>
      <Filter />
      <VideoBackground autoPlay loop muted playsInline>
        <source src='/videos/header.mp4' type='video/mp4' />
      </VideoBackground>
      <Title $isAnimated={isAnimated}>{t('home.name')}</Title>
      <SubTitle $isAnimated={isAnimated}>{t('home.subTitle')}</SubTitle>
      <SlideButton onClick={() => scrollTo(NAVBAR_LINKS.DESCRIPTION)} />
    </Main>
  );
}

const Main = tw.div`
  flex
  flex-col
  items-center
  justify-center
  h-screen
  w-screen
  z-0
`;
const Filter = tw.div`
  absolute
  top-0
  left-0
  bottom-0
  right-0
  w-full
  h-full
  bg-black
  opacity-20
  z-10
`;

const VideoBackground = tw.video`
  absolute
  top-0
  left-0
  right-0
  bottom-0
  w-full
  h-full
  z-0
  object-cover
  object-center
  
`;

const Title = tw(H1)<{ $isAnimated: boolean }>`
  text-white
  text-6xl
  lg:text-8xl
  text-center
  transform
  transition-all
  duration-1000
  delay-100
  ease-in-out
  ${(props) => (props.$isAnimated ? 'translate-y-0' : '-translate-y-50')}
  ${(props) => (props.$isAnimated ? 'opacity-100' : 'opacity-0')}
  line-height-1
  z-20
  font-title
  normal-case
`;

const SubTitle = tw(P18)<{ $isAnimated: boolean }>`
  text-white
  text-xl
  lg:text-5xl
  mt-5
  text-center
  transform
  transition-all
  duration-1000
  delay-100
  ease-in-out
  ${(props) => (props.$isAnimated ? 'translate-y-0' : '-translate-y-40')}
  ${(props) => (props.$isAnimated ? 'opacity-100' : 'opacity-0')}
  line-height-1
  z-20
  font-text
`;

const SlideButton = tw(ChevronDoubleDownIcon)`
  text-white
  animate-bounce
  z-20
  cursor-pointer
  transition-all
  duration-1500
  ease-in-out
  absolute
  bottom-10
  left-1/2
  transform
  -translate-x-1/2
  w-10
  h-10
`;
