import { Body, Container, Font, Head, Html, Preview } from '@react-email/components';
import type { EmailBrandProps } from '../email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import type { ReactNode } from 'react';
import { FONT_SANS } from './fonts';
import { LifecycleFooter } from './footer';
import { LifecycleHeader } from './header';
import { resolveLifecycleTokens, setActiveLifecycleTokens } from './token-context';

export interface LifecycleLayoutProps {
  brand: EmailBrandProps;
  preview: string;
  recipientEmail?: string;
  tokens?: PartialLifecycleTokens;
  children: ReactNode;
}

export function LifecycleLayout({
  brand,
  preview,
  recipientEmail,
  tokens,
  children,
}: LifecycleLayoutProps) {
  const resolved = resolveLifecycleTokens(tokens);
  setActiveLifecycleTokens(resolved);

  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="dark light" />
        <meta name="supported-color-schemes" content="dark light" />
        <Font
          fontFamily="Inter Tight"
          fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
          webFont={{
            url: 'https://fonts.gstatic.com/s/intertight/v9/NaN_cYS5IjQv60Sg7eTKkc7Vlx7BANxOTw.woff2',
            format: 'woff2',
          }}
          fontWeight={500}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="JetBrains Mono"
          fallbackFontFamily={['ui-monospace', 'monospace']}
          webFont={{
            url: 'https://fonts.gstatic.com/s/jetbrainsmono/v20/tDbY2o-flEEny0FZhsfKu5WU4xD7OgnTzj0AY7HxQg.woff2',
            format: 'woff2',
          }}
          fontWeight={500}
          fontStyle="normal"
        />
        <style>{`html, body { height: 100%; margin: 0; }`}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: resolved.page,
          color: resolved.ink,
          fontFamily: FONT_SANS,
          margin: 0,
          minHeight: '100%',
          padding: '24px 16px',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <Container
          style={{
            backgroundColor: resolved.card,
            borderRadius: 4,
            margin: '0 auto',
            maxWidth: 580,
            padding: '48px 44px 36px',
          }}
        >
          <LifecycleHeader brand={brand} />
          {children}
          <LifecycleFooter brand={brand} recipientEmail={recipientEmail} />
        </Container>
      </Body>
    </Html>
  );
}
