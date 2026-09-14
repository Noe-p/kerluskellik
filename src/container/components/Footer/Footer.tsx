import { H2, Link, P14, P16 } from '@/components/Texts';
import { scrollTo } from '@/services/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';
import tw from 'tailwind-styled-components';
import { NAVBAR_LINKS } from '../Navbar';

interface FooterProps {
  className?: string;
}

export function Footer(props: FooterProps): React.JSX.Element {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Main id={NAVBAR_LINKS.CONTACT} className={className}>
      <Wordmark>{t('home.name')}</Wordmark>
      <Rule />
      <InfosContainer>
        <Title>{t('contact.title')}</Title>
        <P16 className='mb-2 text-white'>{t('contact.name')}</P16>
        <P14 className='mb-6 text-white/70 text-center max-w-xs'>{t('contact.hook')}</P14>
        <CtaButton type='button' onClick={() => scrollTo(NAVBAR_LINKS.DISPONIBILITES)}>
          {t('contact.cta')}
        </CtaButton>
      </InfosContainer>
      <CopyRight>
        {t('generics.designed')}
        <LinkStyled href='https://noe-philippe.fr' target='_blank'>
          {'Noé PHILIPPE'}
        </LinkStyled>
      </CopyRight>
      <CopyRight>{t('generics.copyright')}</CopyRight>
    </Main>
  );
}

const Main = tw.div`
  flex
  items-center
  bg-primary
  w-full
  flex-col
  pt-16
`;

const Wordmark = tw.p`
  font-title
  font-bold
  text-white
  text-2xl
`;

const Rule = tw.div`
  w-14
  h-px
  bg-secondary
  my-6
`;

const Title = tw(H2)`
  text-center
  text-white
  mb-10
`;

const CopyRight = tw(P14)`
  text-center
  w-3/4
  mb-4
  text-white
`;

const InfosContainer = tw.div`
  flex
  flex-col
  items-center
  justify-center
  mb-2
  mt-8
`;

const LinkStyled = tw(Link)`
  text-white
  hover:text-secondary
`;

const CtaButton = tw.button`
  flex
  items-center
  gap-3
  px-7 py-3.5
  mb-10
  border
  border-secondary
  text-secondary
  text-xs
  font-medium
  tracking-[0.16em]
  uppercase
  cursor-pointer
  transition-colors
  duration-300
  hover:bg-secondary
  hover:text-primary
`;
