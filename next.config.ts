import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Images and videos uploaded in the WordPress CMS are served from its origin.
function wordpressUrl(): URL | null {
  const raw = process.env.WORDPRESS_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw);
  } catch {
    return null;
  }
}

const wordpress = wordpressUrl();
const cmsOrigin = wordpress === null ? "" : ` ${wordpress.origin}`;

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data:${cmsOrigin}`,
  `media-src 'self'${cmsOrigin}`,
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-src 'self' https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  typedRoutes: true,
  // The admissions route draws the logo into the PDF it sends to WordPress.
  outputFileTracingIncludes: {
    "/api/admissions": ["./public/logos/brand/nami-color.svg"],
  },
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns:
      wordpress === null
        ? []
        : [
            {
              protocol: wordpress.protocol === "http:" ? "http" : "https",
              hostname: wordpress.hostname,
              ...(wordpress.port ? { port: wordpress.port } : {}),
              pathname: `${wordpress.pathname.replace(/\/+$/, "")}/wp-content/uploads/**`,
            },
          ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/institutions/college",
        destination: "/institutions/a-levels",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
