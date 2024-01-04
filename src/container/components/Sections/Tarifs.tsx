import tw from 'tailwind-styled-components';
import { NAVBAR_LINKS } from '../Navbar';

export function Tarifs(): JSX.Element {
  return <Main id={NAVBAR_LINKS.TARIFS}></Main>;
}

const Main = tw.div`
  grid
  grid-cols-1
  sm:grid-cols-4
`;
