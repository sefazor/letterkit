import { Body, Container, Head, Html, Preview, Section } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import type { ReactNode } from 'react';
import { foundryCanvas } from '../theme.config';
import { type EmailBrandProps, withEmailBrandDefaults } from './email-brand';
import { EmailFooter } from './footer';
import { EmailHeader } from './header';

export interface EmailCardLayoutProps {
  tokens: ThemeTokens;
  preview: string;
  brand: EmailBrandProps;
  children: ReactNode;
}

/**
 * Premium card layout — black canvas, white card, left-aligned content.
 * Pass shell props via `brand`; email body props stay on the template component.
 */
export function EmailCardLayout({ tokens, preview, brand, children }: EmailCardLayoutProps) {
  const t = tokens;
  const b = withEmailBrandDefaults(brand);

  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: foundryCanvas,
          fontFamily: t.fontFamily.body,
          margin: 0,
          padding: '48px 16px',
        }}
      >
        <Container style={{ maxWidth: '520px', margin: '0 auto' }}>
          <Section
            style={{
              backgroundColor: t.colors.background,
              borderRadius: t.radius.lg,
              padding: '48px 40px 40px',
              textAlign: 'left',
            }}
          >
            <EmailHeader tokens={t} appName={b.appName} logoUrl={b.logoUrl} logoAlt={b.logoAlt} />
            <Section style={{ padding: '8px 0 0' }}>{children}</Section>
            <EmailFooter
              tokens={t}
              appName={b.appName}
              websiteUrl={b.websiteUrl}
              unsubscribeUrl={b.unsubscribeUrl}
              termsUrl={b.termsUrl}
              privacyUrl={b.privacyUrl}
              legalName={b.legalName}
              copyrightYear={b.copyrightYear}
            />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
