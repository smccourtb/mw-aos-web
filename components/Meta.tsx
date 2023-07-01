import { NextSeo } from 'next-seo';

import GoogleAnalytics from '@/components/google-analitics/GoogleAnalytics';

type MetaProps = {
  title: string;
  description?: string;
  keywords?: string;
};

const Meta = (props: MetaProps) => {
  return (
    <>
      <meta
        charSet="UTF-8"
        key="charset"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <link
        href="/favicon/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/favicon/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/favicon/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/favicon/site.webmanifest" rel="manifest" />
      <link
        color="#000000"
        href="/favicon/safari-pinned-tab.svg"
        rel="mask-icon"
      />
      <link href="/favicon/favicon.ico" rel="shortcut icon" />
      <NextSeo
        useAppDir={true}
        title={props.title}
        description={props.description}
        additionalMetaTags={[
          {
            property: 'keywords',
            content: props.keywords || '',
          },
        ]}
      />
      <GoogleAnalytics />
    </>
  );
};

export default Meta;
