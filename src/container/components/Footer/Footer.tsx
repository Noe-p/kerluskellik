import { H2, Link, P14, P16 } from '@/components/Texts';
import { Trans, useTranslation } from 'next-i18next';
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
      <InfosContainer>
        <Title>{t('contact.title')}</Title>
        <P16 className='mb-5 text-white'>{t('contact.name')}</P16>
        <P16 className='mb-5 text-white'>
          <Trans
            i18nKey='contact.address'
            components={{
              br: <br />,
            }}
          />
        </P16>
        <LinkStyled href='tel:0298823367' target='_blank'>
          {t('02 98 82 33 67')}
        </LinkStyled>
        <LinkStyled className='mb-5' href='tel:0642720837' target='_blank'>
          {t('06 42 72 08 37')}
        </LinkStyled>

        <LinkStyled
          className='mb-10'
          href='mailto:pierreclairephilippe@gmail.com'
          target='_blank'
        >
          {t('pierreclairephilippe@gmail.com')}
        </LinkStyled>
      </InfosContainer>
      <CopyRight>
        {t('generics.designed')}
        <LinkStyled href='https://noe-philippe.com' target='_blank'>
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
