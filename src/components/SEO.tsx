import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

const defaultSEO = {
  siteName: "Chat2Site",
  title: "Chat2Site - وكيلك الذكي لبناء المواقع",
  description: "ابنِ موقعك في دقائق بمحادثة بسيطة مع وكيل ذكي. بدون كود، بدون خبرة تقنية. فقط أخبر الوكيل بما تريد وسيبني موقعك تلقائياً.",
  keywords: "بناء مواقع, ذكاء اصطناعي, AI, موقع عربي, تصميم مواقع, website builder, no-code",
  image: "/og-image.png",
  url: "https://chat2site.app",
  twitterHandle: "@chat2site",
};

export const SEO = ({
  title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = "website",
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title 
    ? `${title} | ${defaultSEO.siteName}` 
    : defaultSEO.title;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={defaultSEO.siteName} />
      <meta property="og:locale" content="ar_SA" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={defaultSEO.twitterHandle} />
      
      {/* Additional SEO */}
      <meta name="author" content="Chat2Site" />
      <meta name="language" content="Arabic" />
      <meta httpEquiv="content-language" content="ar" />
    </Helmet>
  );
};

export default SEO;
