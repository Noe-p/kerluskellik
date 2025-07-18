import tw from 'tailwind-styled-components';
import { NAVBAR_LINKS } from '../Navbar';
import { Col, ColCenter, Grid4, H2, P18, Row } from '@/components';
import { useTranslation } from 'next-i18next';
import { CheckIcon } from '@heroicons/react/24/solid';

export function Equipements(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Main id={NAVBAR_LINKS.EQUIPEMENTS}>
      <H2>{t('equipements.title')}</H2>
      <TextContainer>
        <ColItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item1')}</Label>
          </ListItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item2')}</Label>
          </ListItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item3')}</Label>
          </ListItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item4')}</Label>
          </ListItem>
        </ColItem>
        <ColItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item5')}</Label>
          </ListItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item6')}</Label>
          </ListItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item7')}</Label>
          </ListItem>

          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item8')}</Label>
          </ListItem>
        </ColItem>
        <ColItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item9')}</Label>
          </ListItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item10')}</Label>
          </ListItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item11')}</Label>
          </ListItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item12')}</Label>
          </ListItem>
        </ColItem>
        <ColItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item13')}</Label>
          </ListItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item14')}</Label>
          </ListItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item15')}</Label>
          </ListItem>
          <ListItem>
            <CheckIcon className='w-5 h-5 text-primary' />
            <Label>{t('equipements.list.item16')}</Label>
          </ListItem>
        </ColItem>
      </TextContainer>
    </Main>
  );
}

const Main = tw(ColCenter)`
  w-full
  px-5 md:px-10
  py-20
  justify-center
`;

const TextContainer = tw(Grid4)`
  h-full
  w-full 
  md:border
  border-primary
  md:p-10
  rounded-lg
  h-fit
  mt-10
`;

const ColItem = tw(Col)`
  justify-between
  h-full
  gap-2
`;

const ListItem = tw(Row)`
  items-center
  justify-start
  w-full
`;

const Label = tw(P18)`
  ml-2
`;
