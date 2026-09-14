import { ColCenter, Grid3, H2, Image, Modal, MediasSwiper } from "@/components";
import { FILTERS, PHOTOS } from "@/data/photos";
import { Photo } from "@/types";
import { LayoutGrid, X } from "lucide-react";
import { useTranslation } from "next-i18next";
import { Fragment, useEffect, useMemo, useState } from "react";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

const PREVIEW_FILTERS = [
  FILTERS.JARDIN,
  FILTERS.RDC,
  FILTERS.ETAGE1,
  FILTERS.CHAMBRE1,
  FILTERS.CHAMBRE4,
];

interface PhotosProps {
  setIsNavClose: (isNavClose: boolean) => void;
}

interface PhotoItem {
  media: Photo;
  filter: FILTERS;
  numberInGroup: number;
  isGroupStart: boolean;
}

export function Photos(props: PhotosProps): React.JSX.Element {
  const { setIsNavClose } = props;
  const { t } = useTranslation();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isMediaSwiperOpen, setIsMediaSwiperOpen] = useState(false);

  const previewPhotos = useMemo(
    () =>
      PREVIEW_FILTERS.map((filter) =>
        PHOTOS.find((photo) => photo.filters.includes(filter)),
      ).filter((photo): photo is Photo => !!photo),
    [],
  );

  useEffect(() => {
    setIsNavClose(isGalleryOpen || isMediaSwiperOpen);
  }, [isGalleryOpen, isMediaSwiperOpen, setIsNavClose]);

  const openLightbox = (src: string) => {
    setCurrentImage(PHOTOS.findIndex((photo) => photo.src === src));
    setIsMediaSwiperOpen(true);
  };

  return (
    <Main id={NAVBAR_LINKS.PHOTOS}>
      <Eyebrow>{t("photos.title")}</Eyebrow>
      <Rule />
      <Heading>{t("photos.heading")}</Heading>

      <Mosaic>
        {previewPhotos.map((photo, index) => (
          <MosaicTile
            key={photo.src}
            $large={index === 0}
            $hideOnMobile={index > 0}
            onClick={() => setIsGalleryOpen(true)}
          >
            <Image
              fill
              objectFit="cover"
              src={photo.src}
              alt=""
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </MosaicTile>
        ))}
        <ShowAllButton onClick={() => setIsGalleryOpen(true)}>
          <LayoutGrid size={14} />
          {t("photos.showAll", { count: PHOTOS.length })}
        </ShowAllButton>
      </Mosaic>

      <PhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onPhotoClick={openLightbox}
      />

      <MediasSwiper
        isOpen={isMediaSwiperOpen}
        setIsOpen={() => setIsMediaSwiperOpen(false)}
        currentImage={currentImage}
        medias={PHOTOS.map((photo) => photo.src)}
      />
    </Main>
  );
}

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoClick: (src: string) => void;
}

function PhotoGalleryModal(props: PhotoGalleryModalProps): React.JSX.Element {
  const { isOpen, onClose, onPhotoClick } = props;
  const { t } = useTranslation();
  const [filterSelected, setFilterSelected] = useState<FILTERS>(FILTERS.ALL);

  const showGroups = filterSelected === FILTERS.ALL;

  const medias = useMemo(
    () =>
      showGroups
        ? PHOTOS
        : PHOTOS.filter((photo) => photo.filters.includes(filterSelected)),
    [filterSelected, showGroups],
  );

  const items = useMemo<PhotoItem[]>(() => {
    let previousFilter: FILTERS | null = null;
    let numberInGroup = 0;

    return medias.map((media) => {
      const filter = media.filters[0];
      numberInGroup = filter === previousFilter ? numberInGroup + 1 : 1;
      previousFilter = filter;

      return { media, filter, numberInGroup, isGroupStart: numberInGroup === 1 };
    });
  }, [medias]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentClassName="!p-0 !w-screen !h-screen"
    >
      <GalleryScreen>
        <GalleryHeader>
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
          <CloseButton onClick={onClose} aria-label={t("photos.close")}>
            <X size={20} />
          </CloseButton>
        </GalleryHeader>
        <GalleryBody>
          <MediaContainer>
            {items.map(({ media, filter, numberInGroup, isGroupStart }) => (
              <Fragment key={media.src}>
                {showGroups && isGroupStart && (
                  <GroupHeader>
                    <GroupLabel>{t(`enums.filters.${filter}`)}</GroupLabel>
                    <GroupRule />
                  </GroupHeader>
                )}
                <PlateFrame>
                  <Pic onClick={() => onPhotoClick(media.src)}>
                    <Image fill objectFit="cover" src={media.src} alt="media" />
                  </Pic>
                  <Caption>
                    <Tag>{t(`enums.filters.${filter}`)}</Tag>
                    <PlateNumber>{`N° ${String(numberInGroup).padStart(2, "0")}`}</PlateNumber>
                  </Caption>
                </PlateFrame>
              </Fragment>
            ))}
          </MediaContainer>
        </GalleryBody>
      </GalleryScreen>
    </Modal>
  );
}

const Main = tw(ColCenter)`
  w-full
  px-5 md:px-10
  justify-center
  py-14 md:py-20
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

const Mosaic = tw.div`
  relative
  grid
  grid-cols-1
  md:grid-cols-4
  md:grid-rows-2
  gap-1.5
  w-full
  max-w-300
  aspect-[4/3]
  md:aspect-[16/7]
  border
  border-secondary
  p-1.5
`;

const MosaicTile = tw.button<{ $large?: boolean; $hideOnMobile?: boolean }>`
  relative
  block
  w-full
  h-full
  cursor-pointer
  overflow-hidden
  bg-primary/5
  ${(props) => (props.$hideOnMobile ? "hidden md:block" : "")}
  ${(props) => (props.$large ? "md:col-span-2 md:row-span-2" : "")}
`;

const ShowAllButton = tw.button`
  absolute
  bottom-4
  right-4
  z-10
  flex
  items-center
  gap-2
  bg-cream
  text-primary
  border
  border-primary/20
  px-4 py-2.5
  font-sanchez
  text-[11px]
  font-medium
  tracking-[0.12em]
  uppercase
  cursor-pointer
  shadow-lg
  transition-colors
  hover:bg-primary
  hover:text-cream
  hover:border-primary
`;

const GalleryScreen = tw.div`
  flex
  flex-col
  w-screen
  h-screen
  bg-cream
`;

const GalleryHeader = tw.div`
  flex
  items-center
  gap-4
  border-b
  border-primary/10
  px-5 md:px-10
  py-4
`;

const CloseButton = tw.button`
  flex
  items-center
  justify-center
  shrink-0
  w-10 h-10
  rounded-full
  border
  border-primary/20
  text-primary
  cursor-pointer
  transition-colors
  hover:bg-primary
  hover:text-cream
`;

const GalleryBody = tw.div`
  flex-1
  overflow-y-auto
  px-5 md:px-10
  py-8
  flex
  justify-center
`;

const FilterContainer = tw.div`
  flex
  gap-2 md:gap-3
  flex-wrap
  flex-1
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
  w-full
  max-w-300
  gap-x-7
  gap-y-8
  h-fit
`;

const GroupHeader = tw.div`
  md:col-span-3
  flex
  items-center
  gap-4
  mt-4
  md:mt-6
  first:mt-0
`;

const GroupLabel = tw.p`
  font-sanchez
  text-goldDeep
  text-xs
  font-medium
  tracking-[0.22em]
  uppercase
  whitespace-nowrap
`;

const GroupRule = tw.div`
  h-px
  flex-1
  bg-primary/10
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
