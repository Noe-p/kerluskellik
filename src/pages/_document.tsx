import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ReactElement } from "react";

interface MyDocumentProps extends DocumentInitialProps {
  locale?: string;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale };
  }

  render(): ReactElement {
    return (
      <Html lang={this.props.locale}>
        <Head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="icon" href="/favicon.png" type="image/png" />
          <link rel="apple-touch-icon" href="/favicon.png" />
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
