import { Layout } from '@/components';
import { Header } from '@/container/components';
import { useScroll } from '@/hooks/useScroll';
import { useState } from 'react';
import { Description } from '../components/Sections/Description';
import { Agencement } from '../components/Sections/Agencement';
import { Equipements } from '../components/Sections/Equipements';
import { Photos } from '../components/Sections/Photos';
import { Carte } from '../components/Sections/Carte';
import { Tarifs } from '../components/Sections/Tarifs';
import { Testimonials } from '../components/Sections/Testimonials';
import { Separator } from '@/components/ui/separator';
export function HomePage(): React.JSX.Element {
  const [isNavClose, setIsNavClose] = useState(false);
  const { scrollY } = useScroll();

  return (
    <Layout isNavClose={isNavClose || scrollY < 100}>
      <Header />
      <Description />
      <Agencement />
      <Equipements />
      <Photos setIsNavClose={setIsNavClose} />
      <Carte />
      <Tarifs />
      <Separator className='w-1/2' />
      <Testimonials />
    </Layout>
  );
}
