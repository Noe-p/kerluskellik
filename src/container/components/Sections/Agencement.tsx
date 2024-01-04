import tw from 'tailwind-styled-components';
import { NAVBAR_LINKS } from '../Navbar';
import { ColCenter, Grid2, H2, H3, P16 } from '@/components';
import { Trans, useTranslation } from 'next-i18next';

export function Agencement(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Main id={NAVBAR_LINKS.AGENCEMENT}>
      <Title>{t('agencement.title')}</Title>
      <TextContainer>
        <Left>
          <ColCenter>
            <ItemTitle>{t('agencement.items.item1.title')}</ItemTitle>
            <ItemDescription>
              {t('agencement.items.item1.content')}
            </ItemDescription>
          </ColCenter>
          <ColCenter className='mt-10 '>
            <ItemTitle>{t('agencement.items.item2.title')}</ItemTitle>
            <ItemList>
              <Item>{t('agencement.items.item2.list.item1')}</Item>
              <Item>{t('agencement.items.item2.list.item2')}</Item>
              <Item>{t('agencement.items.item2.list.item3')}</Item>
              <Item>{t('agencement.items.item2.list.item4')}</Item>
            </ItemList>
          </ColCenter>
        </Left>
        <Right>
          <ColCenter className='h-full'>
            <ItemTitle>{t('agencement.items.item3.title')}</ItemTitle>
            <ItemList>
              <Item>{t('agencement.items.item3.list.item1')}</Item>
              <Item>{t('agencement.items.item3.list.item2')}</Item>
            </ItemList>
          </ColCenter>
          <ColCenter className='h-full mt-10'>
            <ItemTitle>{t('agencement.items.item4.title')}</ItemTitle>
            <ItemList>
              <Item>
                <Trans
                  i18nKey='agencement.items.item4.list.item1'
                  components={{
                    b: <b />,
                  }}
                />
              </Item>
              <Item>
                <Trans
                  i18nKey='agencement.items.item4.list.item2'
                  components={{
                    b: <b />,
                  }}
                />
              </Item>
            </ItemList>
          </ColCenter>
        </Right>
      </TextContainer>
    </Main>
  );
}

const Main = tw(ColCenter)`
  bg-primary
  w-full
  px-5 md:px-10
  py-20
  justify-center
`;

const Title = tw(H2)`
  text-white
`;

const TextContainer = tw(Grid2)`
  h-full
  w-full md:w-3/4
  border
  border-white
  p-10
  rounded-lg
  h-fit
  mt-10
`;

const Left = tw.div`
  flex
  flex-col
  items-center
  justify-between
  h-full
  w-full
`;

const Right = tw.div`
  flex
  flex-col
  items-center
  justify-between
  h-full
  w-full
`;

const ItemTitle = tw(H3)`
  text-white
  mb-5
`;

const ItemDescription = tw(P16)`
  text-white
`;

const ItemList = tw.ul`
  text-white
  list-disc
  ml-10
  w-full md:w-auto
`;

const Item = tw.li`
  text-white
`;
