import { H2, P18 } from '@/components/Texts';
import { scrollTo } from '@/services/utils';
import { ToggleMenuButton } from '@noe-p/react-buttons-components';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

interface NavBarProps {
  className?: string;
  isClose?: boolean;
}

export enum NAVBAR_LINKS {
  HOME = 'HOME',
  DESCRIPTION = 'DESCRIPTION',
  AGENCEMENT = 'AGENCEMENT',
  EQUIPEMENTS = 'EQUIPEMENTS',
  PHOTOS = 'PHOTOS',
  CARTE = 'CARTE',
  TARIFS = 'TARIFS',
  CONTACT = 'CONTACT',
}

export function NavBar(props: NavBarProps): React.JSX.Element {
  const { className, isClose } = props;
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(NAVBAR_LINKS.HOME);

  function handleResize() {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else setIsMobile(false);
  }

  function handleScroll() {
    const scrollPosition = window.scrollY + 72; // Ajoutez l'offset ici
    const sections = Object.values(NAVBAR_LINKS).map((link) => ({
      link,
      element: document.getElementById(link),
    }));

    sections.forEach(({ link, element }) => {
      if (element) {
        const elementPosition = element.offsetTop;
        const elementHeight = element.offsetHeight;

        if (
          scrollPosition >= elementPosition &&
          scrollPosition < elementPosition + elementHeight
        ) {
          setLinkSelected(link);
        }
      }
    });
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll); // Ajoutez cet écouteur d'événements de défilement

    // Nettoyez les écouteurs d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function setLinkSelected(link: NAVBAR_LINKS) {
    setSelectedLink(link);
  }

  return (
    <Main className={className} $isClose={isClose}>
      <Content>
        <Left>
          <LogoContainer onClick={() => scrollTo(NAVBAR_LINKS.HOME)}>
            <TextNavigation $selected={selectedLink === NAVBAR_LINKS.HOME}>
              {t(`enums.navbar.${NAVBAR_LINKS.HOME}`)}
            </TextNavigation>
          </LogoContainer>
        </Left>
        {!isMobile ? (
          <Right>
            {Object.values(NAVBAR_LINKS)
              .filter((link) => link !== NAVBAR_LINKS.HOME)
              .map((link) => (
                <RightLink key={link} onClick={() => scrollTo(link)}>
                  <TextNavigation $selected={selectedLink === link}>
                    {t(`enums.navbar.${link}`)}
                  </TextNavigation>
                </RightLink>
              ))}
          </Right>
        ) : (
          <Right>
            <ToggleMenuButton
              isMenuOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <Menu $isOpen={isMenuOpen}>
              {Object.values(NAVBAR_LINKS).map((link) => (
                <MenuLink
                  key={link}
                  $selected={selectedLink === link}
                  onClick={() => {
                    scrollTo(link);
                    setIsMenuOpen(false);
                  }}
                >
                  {t(`enums.navbar.${link}`)}
                </MenuLink>
              ))}
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

  flex
  flex-row
  justify-between
  items-center

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
  ${(props) => (props.$selected ? 'text-black' : 'text-gray-300')}
  m-4
  cursor-pointer
  text-center
`;
