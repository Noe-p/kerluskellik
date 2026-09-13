import { ColCenter, Grid3, H2, Image, MediasSwiper } from "@/components";
import { FILTERS, JARDIN, PHOTOS } from "@/data/photos";
import { Photo } from "@/types";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

interface PhotosProps {
  setIsNavClose: (isNavClose: boolean) => void;
}

export function Photos(props: PhotosProps): React.JSX.Element {
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
      <Eyebrow>{t("photos.title")}</Eyebrow>
      <Rule />
      <Heading>{t("photos.heading")}</Heading>
      <FilterContainer>
        {Object.values(FILTERS).map((filter) => (
          <FilterPill
            onClick={() => setFilterSelected(filter)}
            $selected={filterSelected === filter}
            key={filter}
          >
            {t(`enums.filters.${filter}`)}
          </FilterPill>
        ))}
      </FilterContainer>
      <MediaContainer>
        {medias.map((media, index) => (
          <PlateFrame key={media.src}>
            <Pic
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsMediaSwiperOpen(true);
                setIsNavClose(true);
                setCurrentImage(index);
              }}
            >
              <Image fill objectFit="cover" src={media.src} alt="media" />
            </Pic>
            <Caption>
              <Tag>{t(`enums.filters.${filterSelected}`)}</Tag>
              <PlateNumber>{`N° ${String(index + 1).padStart(2, "0")}`}</PlateNumber>
            </Caption>
          </PlateFrame>
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
  pb-20 md:pb-28
  pt-20 md:pt-28
  min-h-screen
`;

const Eyebrow = tw.p`
  font-sanchez
  text-goldDeep
  text-xs
  font-medium
  tracking-[0.22em]
  uppercase
`;

const Rule = tw.div`
  w-14
  h-px
  bg-goldDeep
  my-5
`;

const Heading = tw(H2)`
  text-primary
  text-3xl
  md:text-4xl
  mb-8
`;

const FilterContainer = tw.div`
  flex
  gap-2 md:gap-3
  flex-wrap
  justify-center
`;

const FilterPill = tw.button<{ $selected: boolean }>`
  font-sanchez
  text-[11px]
  tracking-[0.12em]
  uppercase
  cursor-pointer
  border
  border-primary/25
  px-4 py-2.5
  transition-all
  ${(props) =>
    props.$selected
      ? "bg-primary text-cream border-primary"
      : "text-primary"}
  hover:border-primary
`;

const MediaContainer = tw(Grid3)`
  mt-10
  w-full
  max-w-300
  gap-x-7
  gap-y-8
`;

const PlateFrame = tw.div`
  bg-[#FBF8F0]
  border
  border-secondary
  p-3.5
`;

const Pic = tw.div`
  relative
  w-full
  h-64
  cursor-pointer
  bg-primary/5
`;

const Caption = tw.div`
  flex
  items-baseline
  justify-between
  pt-3.5
  mt-3.5
  border-t
  border-primary/10
`;

const Tag = tw.span`
  font-sanchez
  text-goldDeep
  text-[10px]
  tracking-[0.14em]
  uppercase
`;

const PlateNumber = tw.span`
  font-title
  italic
  text-primary/40
  text-xs
`;
