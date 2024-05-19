import React from 'react';
import tw from 'tailwind-styled-components';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function Image(props: ImageProps): React.JSX.Element {
  return <ImageStyled {...props} />;
}

const ImageStyled = tw.img`
  w-full
  h-full
  object-cover
  object-center
  rounded
`;
