import tw from 'tailwind-styled-components';
import { NAVBAR_LINKS } from '../Navbar';
import {
  ColCenter,
  Grid3,
  MediasSwiper,
  P18,
  Row,
  Image,
  H2,
} from '@/components';
import { FILTERS, JARDIN, PHOTOS } from '@/data/photos';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { Photo } from '@/types';

interface PhotosProps {
  setIsNavClose: (isNavClose: boolean) => void;
}

export function Photos(props: PhotosProps): JSX.Element {
  const { setIsNavClose } = props;
  const { t } = useTranslation();
  const [filterSelected, setFilterSelected] = useState(FILTERS.JARDIN);
  const [medias, setMedias] = useState<Photo[]>(JARDIN);
  const [currentImage, setCurrentImage] = useState(0);
  const [isMediaSwiperOpen, setIsMediaSwiperOpen] = useState(false);

  useEffect(() => {
    setMedias(PHOTOS.filter((photo) => photo.filters.includes(filterSelected)));
  }, [filterSelected]);

  return (
    <Main id={NAVBAR_LINKS.PHOTOS}>
      <H2 className='mb-5'>{t('photos.title')}</H2>
      <FilterContainer>
        {Object.values(FILTERS).map((filter) => (
          <Filter
            onClick={() => setFilterSelected(filter)}
            $selected={filterSelected === filter}
            key={filter}
          >
            {t(`enums.filters.${filter}`)}
          </Filter>
        ))}
      </FilterContainer>
      <MediaContainer>
        {medias.map((media, index) => (
          <ImageStyled
            key={media.src}
            onClick={() => {
              setIsMediaSwiperOpen(true);
              setIsNavClose(true);
              setCurrentImage(index);
            }}
            src={media.src}
            alt='media'
          />
        ))}
      </MediaContainer>
      <MediasSwiper
        isOpen={isMediaSwiperOpen}
        setIsOpen={() => {
          setIsMediaSwiperOpen(false);
          setIsNavClose(false);
        }}
        currentImage={currentImage}
        medias={medias.map((media) => media.src)}
      />
    </Main>
  );
}

const Main = tw(ColCenter)`
  w-full
  px-5 md:px-10
  justify-center
  pb-20
  min-h-screen
`;

const FilterContainer = tw(Row)`
  gap-2 md:gap-5
  flex-wrap
`;

const Filter = tw(P18)<{ $selected: boolean }>`
  text-primary
  cursor-pointer
  border
  border-primary
  rounded
  px-3 py-1
  ${({ $selected }) => $selected && 'bg-primary text-white'}
  transition-all
  hover:bg-primary
  hover:text-white
  hover:shadow
  hover:scale-105
`;

const MediaContainer = tw(Grid3)`
  my-5
  w-full
`;

const ImageStyled = tw(Image)`
  cursor-pointer
  w-full
  object-contain
  md:hover:shadow
  md:hover:scale-105
  transition-all
  bg-gray-100
`;
