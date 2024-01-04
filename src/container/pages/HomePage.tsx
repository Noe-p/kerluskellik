import {
  H2,
  Layout,
  MediasSwiper,
  YoutubeVideo,
  Image,
  Grid2,
} from '@/components';
import { Header } from '@/container/components';
import { useScroll } from '@/hooks/useScroll';
import { useState } from 'react';
import tw from 'tailwind-styled-components';
export function HomePage(): React.JSX.Element {
  const [isMediaSwiperOpen, setIsMediaSwiperOpen] = useState(false);
  const [isNavClose, setIsNavClose] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { scrollY } = useScroll();

  const medias = [
    { id: 1, url: '/images/header.jpg' },
    {
      id: 2,
      url: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    },
  ];

  return (
    <Layout isNavClose={isNavClose || scrollY < 100}>
      <Header />
      <Main>
        <Title>{'Exemple Media Swiper'}</Title>
        <ImagesContainer>
          {medias.map((media, index) => (
            <ImageStyled
              key={media.id}
              onClick={() => {
                setIsMediaSwiperOpen(true);
                setIsNavClose(true);
                setCurrentImage(index);
              }}
              src={media.url}
              alt='media'
            />
          ))}
        </ImagesContainer>
        <YoutubeVideo
          className='mb-10'
          src='https://www.youtube.com/watch?v=vt7gs1J0q9s&ab_channel=Macleiton'
        />
      </Main>
      <MediasSwiper
        isOpen={isMediaSwiperOpen}
        setIsOpen={() => {
          setIsMediaSwiperOpen(false);
          setIsNavClose(false);
        }}
        currentImage={currentImage}
        medias={medias.map((media) => media.url)}
      />
    </Layout>
  );
}

const Main = tw.div`
  flex
  flex-col
  items-center
  justify-center
  w-full md:w-2/3
  mt-5 md:mt-20
`;

const Title = tw(H2)`
  text-center
`;

const ImagesContainer = tw(Grid2)`
  my-5
  w-full
`;

const ImageStyled = tw(Image)`
  cursor-pointer
  w-full
`;
