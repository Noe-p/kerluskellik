/* eslint-disable indent */
import { Image, Modal } from "@/components";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import styled from "styled-components";
import SwiperCore, { Navigation } from "swiper";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { NavigationOptions } from "swiper/types/components/navigation";

interface MediasSwiperProps {
  className?: string;
  isOpen: boolean;
  setIsOpen: () => void;
  medias: string[];
  alts?: string[];
  currentImage?: number;
}

export function MediasSwiper(props: MediasSwiperProps): React.JSX.Element {
  const { className, isOpen, setIsOpen, medias, alts, currentImage = 0 } = props;
  const [hideArrows, setHideArrows] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(currentImage);

  SwiperCore.use([Navigation]);

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={setIsOpen}
      className={className}
      overlayClassName="!z-[110]"
    >
      <Main>
        <CloseIconContainer onClick={setIsOpen} $hide={hideArrows}>
          <CloseIcon />
        </CloseIconContainer>
        <ArrowLeftIconStyled
          ref={navigationPrevRef}
          className="prev"
          $hide={hideArrows}
        />
        <ArrowRightIconStyled
          ref={navigationNextRef}
          className="next"
          $hide={hideArrows}
        />
        <ReactSwiperStyled
          navigation={{
            prevEl: "prev",
            nextEl: "next",
          }}
          onBeforeInit={(swiper) => {
            if (swiper && swiper.params && swiper.params.navigation) {
              (swiper.params.navigation as NavigationOptions).prevEl =
                navigationPrevRef.current;
              (swiper.params.navigation as NavigationOptions).nextEl =
                navigationNextRef.current;
            }
          }}
          onSlideChange={(swiper) => {
            setCurrentMedia(swiper?.activeIndex || 0);
          }}
          slidesPerView={1}
          spaceBetween={50}
          initialSlide={currentImage}
        >
          {medias.map((media, index) => (
            <SwiperSlide key={media} onClick={() => setHideArrows(!hideArrows)}>
              <ImageContainer>
                <ImageStyled>
                  <Image
                    src={media}
                    alt={alts?.[index] ?? ""}
                    className="object-contain"
                  />
                </ImageStyled>
              </ImageContainer>
            </SwiperSlide>
          ))}
        </ReactSwiperStyled>
      </Main>
      <PaginationContainer $hide={hideArrows}>
        <PaginationCounter>{`${currentMedia + 1} / ${medias.length}`}</PaginationCounter>
      </PaginationContainer>
    </Modal>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
`;

const ReactSwiperStyled = styled(ReactSwiper)`
  width: 100%;
  height: 100%;
  position: relative;

  .swiper-slide {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ImageStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const CloseIconContainer = styled.div<{ $hide: boolean }>`
  position: absolute;
  top: 7%;
  right: 5%;
  cursor: pointer;
  z-index: 100;
  border-radius: 50%;
  background-color: white;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $hide }) => ($hide ? 0 : 0.7)};
  border: solid 1px black;

  :hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    top: 10%;
    right: 15%;
    opacity: ${({ $hide }) => ($hide ? 0 : 1)};
  }
`;

const CloseIcon = styled(XMarkIcon)`
  color: black;
  width: 80%;
  height: 80%;
`;

const ArrowLeftIconStyled = styled(ChevronLeftIcon)<{ $hide: boolean }>`
  position: absolute;
  top: 50%;
  left: 50px;
  cursor: pointer;
  z-index: 100;
  width: 60px;
  transform: translateY(-50%);
  background-color: white;
  padding: 10px;
  border-radius: 50%;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $hide }) => ($hide ? 0 : 0.7)};

  :hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ArrowRightIconStyled = styled(ChevronRightIcon)<{ $hide: boolean }>`
  position: absolute;
  top: 50%;
  right: 50px;
  cursor: pointer;
  z-index: 100;
  width: 60px;
  transform: translateY(-50%);
  background-color: white;
  padding: 10px;
  border-radius: 50%;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $hide }) => ($hide ? 0 : 0.7)};

  :hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const PaginationContainer = styled.div<{ $hide: boolean }>`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 40px;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $hide }) => ($hide ? 0 : 1)};

  @media (max-width: 768px) {
    bottom: 90px;
  }
`;

const PaginationCounter = styled.div`
  color: white;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  padding: 8px 18px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
`;
