import Document, { Head, Html, Main, NextScript } from "next/document";
import { ReactElement } from "react";
class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <link rel="icon" href="favicon.png" />

          <link
            rel="preload"
            as="font"
            href="/fonts/great-vibes/GreatVibes-Regular.otf"
            type="font/otf"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
