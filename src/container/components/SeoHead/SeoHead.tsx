import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export function SeoHead(props: SeoHeadProps): React.JSX.Element {
  const { asPath, locale, locales, defaultLocale } = useRouter();
  const { t } = useTranslation("common");

  // `asPath` never carries the locale prefix (Next.js strips it), so it must
  // be re-added by hand for any non-default locale to get correct URLs.
  const pathWithoutLocale = asPath.split("?")[0];
  const pathForLocale = (loc?: string): string => {
    const prefix = loc && loc !== defaultLocale ? `/${loc}` : "";
    return `${prefix}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
  };

  const title = props.title ?? t("seo.title");
  const description = props.description ?? t("seo.description");
  const keywords = props.keywords ?? t("seo.keywords");

  // Ensure domain is properly set with fallback
  const domain = process.env.NEXT_PUBLIC_APP_URL || "https://kerluskellik.fr";
  const url = `${domain}${pathForLocale(locale)}`;
  const image = `${domain}/og.jpg`;

  const amenityFeature = Array.from({ length: 16 }, (_, index) => index + 1).map(
    (index) => ({
      "@type": "LocationFeatureSpecification",
      name: t(`equipements.list.item${index}`),
      value: true,
    }),
  );

  // Structured data JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${domain}/#business`,
    name: "Kerluskellik",
    description: t("seo.description"),
    image: image,
    url: `${domain}${pathForLocale(locale)}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pors Alliou",
      addressLocality: "Île-de-Batz",
      postalCode: "29253",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "48.7428",
      longitude: "-4.0153",
    },
    priceRange: "€€",
    numberOfRooms: 4,
    petsAllowed: false,
    checkinTime: "17:00",
    checkoutTime: "11:00",
    amenityFeature,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={domain} />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content={locale} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="canonical" href={url} />

        {/* Hreflang for multilingual SEO */}
        {locales?.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={`${domain}${pathForLocale(loc)}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${domain}${pathForLocale(defaultLocale)}`}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Script
        async
        defer
        src="https://umami.noe-philippe.fr/script.js"
        data-website-id="25c7a966-f454-45e0-9395-f8791f87d982"
        strategy="afterInteractive"
      />
    </>
  );
}
