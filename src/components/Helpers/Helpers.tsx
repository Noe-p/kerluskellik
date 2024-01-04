import tw from 'tailwind-styled-components';

export const Grid1 = tw.div`
  grid grid-cols-1 gap-y-5 md:gap-5
`;

export const Grid2 = tw.div`
  grid md:grid-cols-2 grid-cols-1 gap-y-5  md:gap-5
`;

export const Grid3 = tw.div`
  grid md:grid-cols-3 grid-cols-1 gap-y-5 md:gap-5
`;

export const GridCol1 = tw.div`
  col-span-1
`;

export const GridCol2 = tw.div`
  col-span-2
`;

export const GridCol3 = tw.div`
  col-span-3
`;

export const Flex = tw.div`
  flex
`;

export const FlexCol = tw(Flex)`
  flex-col
`;

export const FlexColCenter = tw(FlexCol)`
  items-center
  w-full
`;

export const FlexColJustifyCenter = tw(FlexCol)`
  justify-center
  h-full
`;

export const FlexRow = tw(Flex)`
  flex-row
`;

export const FlexRowCenter = tw(FlexRow)`
  items-center
`;
