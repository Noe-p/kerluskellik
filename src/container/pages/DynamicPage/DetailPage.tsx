import { Layout, P18 } from '@/components';
import tw from 'tailwind-styled-components';

interface DetailPageProps {
  idPage: string;
  className?: string;
}

export function DetailPage(props: DetailPageProps): React.JSX.Element {
  const { idPage, className } = props;

  return (
    <Layout className={className}>
      <Main>
        <P18>{`Ceci est la page d'id : ${idPage}`}</P18>
      </Main>
    </Layout>
  );
}

const Main = tw.div`
 
`;