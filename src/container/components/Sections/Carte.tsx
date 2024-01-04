import tw from 'tailwind-styled-components';
import { NAVBAR_LINKS } from '../Navbar';
import { ColCenter, H2, Image, P18 } from '@/components';
import { Trans, useTranslation } from 'next-i18next';

export function Carte(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Main id={NAVBAR_LINKS.CARTE}>
      <H2 className='text-white'>{t('carte.title')}</H2>
      <MapStyled src='/images/carte.png' alt='map' />
      <P18 className='mt-5 text-center text-white'>
        <Trans i18nKey='carte.address' components={{ br: <br /> }} />
      </P18>
      <Image className='bateau' src='/images/bateau.png' alt='bateau' />
    </Main>
  );
}

const Main = tw(ColCenter)`
  w-full
  px-5 md:px-10
  py-20
  justify-center
  items-center
  bg-primary
`;

const MapStyled = tw(Image)`
  w-full
  h-full

`;
