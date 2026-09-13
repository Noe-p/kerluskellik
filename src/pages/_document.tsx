import Document, { Head, Html, Main, NextScript } from "next/document";
import { ReactElement } from "react";
class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <link rel="icon" href="favicon.png" />
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
