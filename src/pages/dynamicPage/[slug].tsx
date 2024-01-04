import { SeoHead } from '@/container/components';
import { DetailPage } from '@/container/pages';
import { GetStaticPath, PageBaseProps } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FullPageLoader } from '../../components';

type DynamicPageExempleProps = {
  idPage: string;
};

export default function DynamicPageExemple(
  props: DynamicPageExempleProps
): React.JSX.Element {
  const { idPage } = props;
  return (
    <>
      <SeoHead />
      {idPage ? <DetailPage idPage={idPage} /> : <FullPageLoader />}
    </>
  );
}

export async function getStaticProps({
  locale,
  params,
}: {
  locale: string;
  params: { slug: string };
}): Promise<PageBaseProps> {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      idPage: params.slug,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPath> {
  return {
    paths: [],
    fallback: true,
  };
}
