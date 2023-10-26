import Head from "next/head";

const Meta = ({
  title = "MyPlants",
  description = "MyPlantsは、多肉植物の育成記録を共有し、関連するイベントへの参加を管理するためのサービスです。多肉植物とそれに関連するイベントに関する情報を整理・保存することができます。",
  ogImage = `${process.env.NEXT_PUBLIC_DOMEIN}/api/og`,
  ogUrl = `${process.env.NEXT_PUBLIC_DOMEIN}`,
  siteName = "MyPlants",
  twitterCard = "summary",
  canonicalUrl = `${process.env.NEXT_PUBLIC_DOMEIN}`,
  lang = "ja_JP",
  isHomePage = true,
}) => {
  const pageTitle = isHomePage ? siteName : `${title} - ${siteName}`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} key="description" />
      <meta property="og:type" content="article" key="og:type" />
      <meta property="og:title" content={pageTitle} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:url" content={ogUrl} key="og:url" />
      <meta property="og:image" content={ogImage} key="og:image" />
      <meta property="og:site_name" content={siteName} key="og:site_name" />
      <meta property="og:locale" content={lang} key="og:locale" />

      <meta property="twitter:card" content={twitterCard} key="twitter:card" />
      <meta property="twitter:image" content={ogImage} key="twitter:image" />

      <link rel="canonical" href={canonicalUrl} key="canonicalURL" />
    </Head>
  );
};

export default Meta;
