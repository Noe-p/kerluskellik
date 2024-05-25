import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export function SeoHead(): React.JSX.Element {
  const { asPath } = useRouter();

  const canonicalUrl = asPath.split('?')[0];

  const title =
    "Location de vacances à Kerluskellik : Charmante maison avec vue sur mer sur l'île de Batz";
  const description =
    "Découvrez le charme authentique de Kerluskellik, une maison à louer sur l'île de Batz. Profitez d'une expérience unique avec cette propriété typique offrant une vue imprenable sur la mer. Réservez votre séjour dès maintenant et plongez dans l'atmosphère paisible de cette île bretonne, entre tradition et paysages enchanteurs.";
  const domain = `${process.env.NEXT_PUBLIC_APP_URL}`;
  const url = `${domain}/${canonicalUrl === '/' ? '' : canonicalUrl}`;
  const image = `${process.env.NEXT_PUBLIC_APP_URL}/og.png`;
  const keywords =
    'location, vacances, maison, vue, mer, île, Batz, Kerluskellik, Bretagne, Finistère, France, authenticité, charme, typique, tradition, paysage, enchanteur, séjour, expérience, unique, atmosphère, paisible, île, bretonne, tradition, paysages, enchanteurs';

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />

      <meta property='og:url' content={url} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta property='twitter:domain' content={domain} />
      <meta property='twitter:url' content={url} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <meta name='keywords' content={keywords} />
      <meta name='robots' content='index, follow' />

      <script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-8XE9T9LPKP'
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8XE9T9LPKP', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <link rel='canonical' href={url} />
    </Head>
  );
}
