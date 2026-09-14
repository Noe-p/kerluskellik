import { LayoutPage } from '@/components';
import { Testimonials } from '@/container/pages';
import { PageBaseProps } from '@/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function IndexPage(): React.JSX.Element {
  const { t } = useTranslation('common');

  return (
    <LayoutPage
      seoTitle={t('seo.testimonialsTitle')}
      seoDescription={t('seo.testimonialsDescription')}
      seoKeywords={t('seo.testimonialsKeywords')}
    >
      <Testimonials />
    </LayoutPage>
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
