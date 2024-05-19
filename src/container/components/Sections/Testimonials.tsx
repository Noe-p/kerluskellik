import {
  ColCenter,
  H2,
  P12,
  P16,
  Row,
  RowBetween,
  RowCenter,
} from '@/components';
import { useTranslation } from 'next-i18next';
import tw from 'tailwind-styled-components';
import { NAVBAR_LINKS } from '../Navbar';
import { testimonals } from '@/data';
import { MEDIA_QUERIES } from '@/static/constants';
import { useMediaQuery } from 'usehooks-ts';
import {
  Carousel,
  CarouselPrevious,
  CarouselNext,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  useDotButton,
  PaginationDot,
} from '@/components/ui/carousel';
import { ArrowLeftIcon, ArrowRightIcon, Plus, Quote } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routing';

export function Testimonials(): JSX.Element {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(MEDIA_QUERIES.SM);
  const [api, setApi] = useState<CarouselApi>();
  const router = useRouter();

  const {
    selectedIndex: slelectedImageIndex,
    scrollSnaps: scrollSnapsImage,
    onDotButtonClick: onDotButtonClickImage,
  } = useDotButton(api);

  return (
    <Main id={NAVBAR_LINKS.TESTIMONIALS}>
      <H2 className='mb-5'>{t('testimonials.title')}</H2>
      <Carousel className='w-full' setApi={setApi}>
        {testimonals && testimonals.length > (isMobile ? 1 : 3) && (
          <Row className='justify-end w-full mt-5'>
            <RowBetween className='justify-end w-full gap-3 '>
              <CarouselPrevious
                icon={<ArrowLeftIcon className='w-6' />}
                className='static h-10 translate-y-0 rounded w-15'
              />
              <CarouselNext
                icon={<ArrowRightIcon className='w-6' />}
                className='static h-10 translate-y-0 rounded w-15'
              />
            </RowBetween>
          </Row>
        )}
        <CarouselContent className='gap-5 mt-3 -ml-0'>
          {testimonals.slice(0, 5).map((testimonial) => (
            <Card key={testimonial.id}>
              <Quote className='w-6 h-6 text-primary' />
              <P16
                className='mt-3'
                dangerouslySetInnerHTML={{ __html: testimonial.content }}
              />
              <Row className='justify-end mt-5'>
                <P12 className='italic'>{`${testimonial.name}${
                  testimonial?.date && ', '
                }${testimonial?.date}`}</P12>
              </Row>
            </Card>
          ))}
          <Card
            className='flex items-center justify-center cursor-pointer h-100'
            onClick={() => router.push(ROUTES.testimonials)}
          >
            <ColCenter className=''>
              <Plus className='w-10 h-10 text-primary' />
              <P16 className='mt-3'>{t('generics.more')}</P16>
            </ColCenter>
          </Card>
        </CarouselContent>
        <RowCenter className='justify-center w-full gap-2 mt-4'>
          {scrollSnapsImage.map((snap, index) => (
            <PaginationDot
              key={snap}
              onClick={() => onDotButtonClickImage(index)}
              $isActive={index === slelectedImageIndex}
              className='w-3'
            />
          ))}
        </RowCenter>
      </Carousel>
    </Main>
  );
}

const Main = tw(ColCenter)`
  w-full
  px-5 md:px-10
  py-20
  justify-center
`;

const Card = tw(CarouselItem)`
  p-4
  rounded
  border
  h-min
  max-h-100
  overflow-auto
  border-primary
  lg:basis-[28%]
  md:basis-[45%]
  basis-[100%]
`;
