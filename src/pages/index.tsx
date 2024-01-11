import { SeoHead } from '@/container/components';
import { HomePage } from '@/container/pages';
import { PageBaseProps } from '@/types';
import { Analytics } from '@vercel/analytics/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function IndexPage(): React.JSX.Element {
  return (
    <>
      <SeoHead />
      <HomePage />
      <Analytics />
    </>
  );
}

export async function getStaticProps({
  locale,
}: {
  locale: string;
}): Promise<PageBaseProps> {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
