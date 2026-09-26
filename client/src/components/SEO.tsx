import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  schema?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'Tấn Đạt Smartphone — Mua Bán • Sửa Chữa • Ép Kính (TP. Huế)';
const DEFAULT_DESCRIPTION =
  'Tấn Đạt Smartphone: Mua bán điện thoại chính hãng, sửa chữa phần cứng, ép kính màn hình lấy liền, thay lưng cắt mắt, sàng IC cảm ứng tại Chợ Phong Xuân, Phong Điền, TP. Huế. Hotline: 093 567 7775.';
const DEFAULT_KEYWORDS =
  'tấn đạt smartphone, sửa điện thoại huế, ép kính huế, ép kính phong điền, thay màn hình iphone huế, mua bán iphone phong điền, thay mặt kính huế, chợ phong xuân';
const DEFAULT_IMAGE = '/logo.png';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noindex = false,
  schema,
}) => {
  // Construct title with branding
  const resolvedTitle = !title
    ? DEFAULT_TITLE
    : title.includes('Tấn Đạt')
    ? title
    : `${title} — Tấn Đạt Smartphone`;

  // Determine current or canonical URL
  const currentUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '');

  // Absolute image URL resolution for crawlers
  const resolvedImage = image.startsWith('http')
    ? image
    : typeof window !== 'undefined'
    ? `${window.location.origin}${image}`
    : image;

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Tấn Đạt Smartphone" />

      {/* Robots Indexing Directives */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Canonical URL */}
      {currentUrl && <link rel="canonical" href={currentUrl} />}

      {/* Open Graph / Facebook & Zalo */}
      <meta property="og:site_name" content="Tấn Đạt Smartphone" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedImage} />
      {currentUrl && <meta property="og:url" content={currentUrl} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />

      {/* Local Geo Tags for Search Engines & Google Maps */}
      <meta name="geo.region" content="VN-26" />
      <meta name="geo.placename" content="Phong Điền, Thừa Thiên Huế, Việt Nam" />
      <meta name="geo.position" content="16.5833;107.3833" />
      <meta name="ICBM" content="16.5833, 107.3833" />

      {/* Structured JSON-LD Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
