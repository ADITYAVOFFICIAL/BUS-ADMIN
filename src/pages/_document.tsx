import Document, { Html, Head, Main, NextScript } from 'next/document';
import { metadata } from "@/app/components/layoutMetadata";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content={String(metadata.description) ?? ''} />
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