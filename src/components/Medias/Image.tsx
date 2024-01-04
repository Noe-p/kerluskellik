import { useImageOnLoad } from '@/hooks/useImageOnLoad';
import React from 'react';
import tw from 'tailwind-styled-components';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function Image(props: ImageProps): React.JSX.Element {
  const { handleImageOnLoad, css } = useImageOnLoad();

  return (
    <ImageStyled
      onLoad={handleImageOnLoad}
      style={{ ...css.fullSize }}
      {...props}
    />
  );
}

const ImageStyled = tw.img`
  w-full
  h-full
  object-cover
  object-center
  rounded-lg
`;
