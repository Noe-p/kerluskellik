import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";

export function SeoHead(): React.JSX.Element {
  const { asPath, locale, locales } = useRouter();
  const { t } = useTranslation("common");

  const canonicalUrl = asPath.split("?")[0];

  const title = t("seo.title");
  const description = t("seo.description");
  const keywords = t("seo.keywords");

  // Ensure domain is properly set with fallback
  const domain = process.env.NEXT_PUBLIC_APP_URL || "https://kerluskellik.fr";
  const url = `${domain}${canonicalUrl === "/" ? "" : canonicalUrl}`;
  const image = `${domain}/og.png`;

  // Structured data JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: "Kerluskellik",
    description: description,
    image: image,
    url: url,
    telephone: "02 98 82 33 67",
    email: "pierreclairephilippe@gmail.com",
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
    sameAs: ["https://www.airbnb.fr", "https://www.booking.com"],
  };

  const accommodationData = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    "@id": url,
    name: "Kerluskellik - Maison de Vacances",
    description: description,
    image: image,
    url: url,
    amenities: [
      {
        "@type": "Thing",
        name: "WiFi",
      },
      {
        "@type": "Thing",
        name: "Fireplace",
      },
      {
        "@type": "Thing",
        name: "Washer/Dryer",
      },
      {
        "@type": "Thing",
        name: "Dishwasher",
      },
      {
        "@type": "Thing",
        name: "Kitchen",
      },
      {
        "@type": "Thing",
        name: "Beach Access",
      },
    ],
    numberOfBedrooms: 4,
    occupancy: 9,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pors Alliou",
      addressLocality: "Île-de-Batz",
      postalCode: "29253",
      addressCountry: "FR",
    },
    petsAllowed: false,
    priceRange: "€€",
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
            href={`${domain}${loc === locale ? canonicalUrl : `/${loc}${canonicalUrl === "/" ? "" : canonicalUrl}`}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${domain}${canonicalUrl === "/" ? "" : canonicalUrl}`}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(accommodationData),
          }}
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
