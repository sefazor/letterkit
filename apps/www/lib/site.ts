import type { Metadata } from 'next';

export const SITE_NAME = 'letterkit';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://letterkit.dev';
export const SITE_DESCRIPTION =
  'Copy-paste transactional email themes for React Email. Complete collections with shared layout, brand config, and design tokens.';
export const SITE_TAGLINE = 'Copy-paste email themes for React Email';

export const SITE_KEYWORDS = [
  'letterkit',
  'react email',
  'react-email',
  'email templates',
  'transactional email',
  'email themes',
  'shadcn',
  'resend',
  'postmark',
  'sendgrid',
  'typescript',
  'nextjs',
  'tailwindcss',
  'saas email',
  'billing email',
  'auth email',
  'onboarding email',
];

type SiteMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function siteUrl(path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, '')}${normalized === '/' ? '' : normalized}`;
}

export function createSiteMetadata(options: SiteMetadataOptions = {}): Metadata {
  const pageTitle = options.title;
  const description = options.description ?? SITE_DESCRIPTION;
  const canonical = siteUrl(options.path ?? '');
  const keywords = options.keywords ?? SITE_KEYWORDS;
  const ogImage = siteUrl('/opengraph-image');
  const socialTitle = pageTitle ? `${pageTitle} · ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: pageTitle
      ? pageTitle
      : {
          default: `${SITE_NAME} — ${SITE_TAGLINE}`,
          template: `%s · ${SITE_NAME}`,
        },
    description,
    keywords,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'technology',
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonical,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [ogImage],
    },
    robots: options.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}
