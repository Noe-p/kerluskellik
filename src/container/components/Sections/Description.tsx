import tw from 'tailwind-styled-components';
import { NAVBAR_LINKS } from '../Navbar';
import { Image, Grid2, H2, P16 } from '@/components';
import { Trans, useTranslation } from 'next-i18next';

export function Description(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Main id={NAVBAR_LINKS.DESCRIPTION}>
      <TextContainer>
        <H2>{t('description.title')}</H2>
        <P16 className='mt-5'>
          <Trans i18nKey='description.content' />
        </P16>
      </TextContainer>
      <Image src='/images/maison.webP' alt='description' />
    </Main>
  );
}

const Main = tw(Grid2)`
  md:gap-15
  md:py-20
  justify-center
  items-center
  px-5 md:px-10

`;

const TextContainer = tw.div`
  flex
  flex-col
  items-center
  justify-center
  h-full
  w-full
  border
  border-primary
  p-10
  rounded-lg
  h-fit
`;
