import { Image } from '@/components';
import { H2, P18 } from '@/components/Texts';
import { ROUTES } from '@/routing';
import { ToggleMenuButton } from '@noe-p/react-buttons-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

interface NavBarProps {
  className?: string;
  isClose?: boolean;
}

export function NavBar(props: NavBarProps): React.JSX.Element {
  const { className, isClose } = props;
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  function handleResize() {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else setIsMobile(false);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {}, []);

  return (
    <Main className={className} $isClose={isClose}>
      <Content>
        <Left>
          <LogoContainer onClick={() => router.push(ROUTES.home)}>
            <Logo>
              <Image width={40} height={40} src='/logo.svg' alt='logo' />
            </Logo>
            <TextNavigation
              $selected={`/${router.pathname.split('/')[1]}` === ROUTES.home}
            >
              {t('home.name')}
            </TextNavigation>
          </LogoContainer>
        </Left>
        {!isMobile ? (
          <Right>
            <RightLink onClick={() => router.push(ROUTES.dynamicPage)}>
              <TextNavigation
                $selected={
                  `/${router.pathname.split('/')[1]}` === ROUTES.dynamicPage
                }
              >
                {t('dynamicPage')}
              </TextNavigation>
            </RightLink>
            <RightLink onClick={() => router.push(ROUTES.about)}>
              <TextNavigation
                $selected={`/${router.pathname.split('/')[1]}` === ROUTES.about}
              >
                {t('about.name')}
              </TextNavigation>
            </RightLink>
          </Right>
        ) : (
          <Right>
            <ToggleMenuButton
              isMenuOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <Menu $isOpen={isMenuOpen}>
              <MenuLink
                $selected={`/${router.pathname.split('/')[1]}` === ROUTES.home}
                onClick={() => router.push(ROUTES.home)}
              >
                {t('home.name')}
              </MenuLink>
              <MenuLink
                $selected={
                  `/${router.pathname.split('/')[1]}` === ROUTES.dynamicPage
                }
                onClick={() => router.push(ROUTES.dynamicPage)}
              >
                {t('dynamicPage')}
              </MenuLink>
              <MenuLink
                $selected={`/${router.pathname.split('/')[1]}` === ROUTES.about}
                onClick={() => router.push(ROUTES.about)}
              >
                {t('about.name')}
              </MenuLink>
            </Menu>
          </Right>
        )}
      </Content>
    </Main>
  );
}

const Main = tw.div<{ $isClose?: boolean }>`
  w-full
  justify-center
  flex
  fixed
  shadow
  z-30
  ${(props) => (props.$isClose ? 'h-0' : 'h-18')}
  transition-all
  duration-300
  ${(props) => (props.$isClose ? 'opacity-0' : 'opacity-100')}
  bg-white
`;

const Content = tw.div`
  w-full
  md:w-5/12
  lg:w-9/12
  flex
  flex-row
  justify-between
  items-center

`;

const Logo = tw.div`
  w-10
  h-10
  mr-3
`;

const Left = tw.div`
  pl-5
  pt-5
  pb-3
`;

const Right = tw.div`
  flex
  flex-row
  justify-between
  pr-5
  pt-5
  pb-3
`;

const RightLink = tw.div`
  ml-5
  cursor-pointer
`;

const LogoContainer = tw.div`
  flex
  justify-center
  items-center
  cursor-pointer
`;

const TextNavigation = tw(P18)<{ $selected?: boolean }>`
  uppercase
  ${(props) => (props.$selected ? 'opacity-100' : 'opacity-50')}
  hover:text-black
  transition-all
  duration-300
  cursor-pointer

  ${(props) =>
    props.$selected
      ? 'border-b-2 border-black'
      : 'border-b-2 border-transparent'}
  hover:border-black
`;

const Menu = tw.div<{ $isOpen: boolean }>`
  ${(props) => (props.$isOpen ? 'h-screen' : 'h-0')}
  w-full
  absolute
  top-full
  left-0
  bg-white
  flex
  flex-col
  items-center
  justify-center
  transition-all
  duration-300
  overflow-hidden
  z-50
`;

const MenuLink = tw(H2)<{ $selected?: boolean }>`
  uppercase
  ${(props) => (props.$selected ? 'text-black' : 'text-gray-700')}
  m-4
  cursor-pointer
  text-center
`;
