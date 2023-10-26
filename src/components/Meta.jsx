import Head from "next/head";

const Meta = ({
  title = "MyPlants",
  description = "MyPlantsは、多肉植物の育成記録を共有し、関連するイベントへの参加を管理するためのサービスです。多肉植物とそれに関連するイベントに関する情報を整理・保存することができます。",
  ogImage = `https://${process.env.NEXT_PUBLIC_S3_BUCCKET}/ogp/ogp-img.png`,
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
      <meta name="description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={lang} />

      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:image" content={ogImage} />

      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
};

export default Meta;
