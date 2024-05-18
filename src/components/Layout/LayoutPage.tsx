import { SeoHead } from '@/container/components';
import { pageview } from '@/services/analytics';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface LayoutPageProps {
  children?: ReactNode;
}

export function LayoutPage(props: LayoutPageProps): JSX.Element {
  const { children } = props;

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <SeoHead />
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
