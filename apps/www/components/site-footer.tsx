import { LetterkitLogo } from '@/components/letterkit-logo';
import {
  LETTERKIT_LOGO_LIGHT_SRC,
  LETTERKIT_LOGO_SRC,
  letterkitLogoWidth,
} from '@/lib/brand-assets';
import Link from 'next/link';

const PRODUCT_LINKS = [
  { href: '/themes', label: 'Themes' },
  { href: '/docs', label: 'Docs' },
] as const;

const COMMUNITY_LINKS = [
  {
    href: 'https://github.com/sefazor/letterkit',
    label: 'GitHub',
    external: true,
  },
] as const;

const linkClass = 'text-[15px] transition-colors hover:text-[var(--header-foreground)]';
const linkStyle = { color: 'var(--header-muted)' } as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto px-6 pb-6 pt-16">
      <div
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl"
        style={{
          backgroundColor: 'var(--header-surface)',
          color: 'var(--header-foreground)',
        }}
      >
        <div className="grid gap-12 px-8 py-10 sm:grid-cols-[1.4fr_1fr_1fr] sm:px-10 sm:py-12">
          <div>
            <Link href="/" className="inline-flex items-center">
              <LetterkitLogo height={20} />
            </Link>
            <p
              className="mt-4 max-w-xs text-[15px] leading-relaxed"
              style={{ color: 'var(--header-muted)' }}
            >
              Copy-paste transactional email themes for React Email.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium">Product</p>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass} style={linkStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium">Community</p>
            <ul className="mt-4 space-y-2.5">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                    style={linkStyle}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t px-8 py-8 sm:px-10"
          style={{
            borderColor: 'color-mix(in srgb, var(--header-foreground) 10%, transparent)',
          }}
        >
          <div className="pointer-events-none select-none" aria-hidden>
            <img
              src={LETTERKIT_LOGO_LIGHT_SRC}
              alt=""
              width={letterkitLogoWidth(72)}
              height={72}
              className="h-[clamp(3rem,12vw,4.5rem)] w-auto opacity-[0.12] dark:hidden"
            />
            <img
              src={LETTERKIT_LOGO_SRC}
              alt=""
              width={letterkitLogoWidth(72)}
              height={72}
              className="hidden h-[clamp(3rem,12vw,4.5rem)] w-auto opacity-[0.1] dark:block"
            />
          </div>

          <div
            className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between"
            style={{ color: 'var(--header-muted)' }}
          >
            <span>© {year} letterkit</span>
            <span>Built for React Email</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
