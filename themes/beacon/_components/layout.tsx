import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Preview,
  Section,
} from '@react-email/components';
import type { ReactNode } from 'react';
import type { PartialBeaconTokens } from '../tokens.config';
import type { EmailBrandProps } from './email-brand';
import { withEmailBrandDefaults } from './email-brand';
import { EmailFooter } from './footer';
import { EmailForestHeader, type EmailForestHeaderProps } from './header';
import { resolveBeaconTokens, setActiveBeaconTokens } from './token-context';

export interface EmailLayoutProps {
  brand: EmailBrandProps;
  preview: string;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  forestHeader?: Pick<EmailForestHeaderProps, 'stampLabel' | 'stampValue'>;
  children: ReactNode;
}

/**
 * Beacon card shell — forest brand block, content, minimal in-card footer.
 */
export function EmailLayout({
  brand,
  preview,
  tokens,
  recipientEmail,
  forestHeader,
  children,
}: EmailLayoutProps) {
  const palette = resolveBeaconTokens(tokens);
  setActiveBeaconTokens(palette);
  const resolvedBrand = withEmailBrandDefaults(brand);

  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
        <Font
          fontFamily="Geist"
          fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
          webFont={{
            url: 'https://fonts.gstatic.com/s/geist/v3/gyByhwUxId8gMEwYGFU8Nq8SXOzZWuP01vkmrMjlWdL_-jM.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Geist"
          fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
          webFont={{
            url: 'https://fonts.gstatic.com/s/geist/v3/gyByhwUxId8gMEwYGFU8Nq8SXOzZWuP01vkmrMjlWdL_-jM.woff2',
            format: 'woff2',
          }}
          fontWeight={500}
          fontStyle="normal"
        />
        <Font
          fontFamily="JetBrains Mono"
          fallbackFontFamily={['monospace']}
          webFont={{
            url: 'https://fonts.gstatic.com/s/jetbrainsmono/v20/tDbY2o-flEEny0FZhsfKu5WU4xD7OgnTzj0AY7HxQg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: palette.page,
          margin: 0,
          padding: '24px 16px',
          fontFamily: palette.fontFamily,
          color: palette.ink,
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <Container
          style={{
            maxWidth: 540,
            margin: '0 auto',
            backgroundColor: palette.card,
            borderRadius: 12,
            overflow: 'hidden',
            border: `1px solid ${palette.border}`,
          }}
        >
          <EmailForestHeader
            brand={resolvedBrand}
            stampLabel={forestHeader?.stampLabel}
            stampValue={forestHeader?.stampValue}
          />
          <Section style={{ padding: '32px 36px 28px', textAlign: 'left' }}>{children}</Section>
          <EmailFooter brand={resolvedBrand} recipientEmail={recipientEmail} />
        </Container>
      </Body>
    </Html>
  );
}
