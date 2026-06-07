import { Body, Container, Head, Html, Preview, Section } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import type { ReactNode } from 'react';
import { EmailFooter } from './footer';
import { EmailHeader } from './header';

export interface EmailLayoutProps {
  tokens: ThemeTokens;
  preview: string;
  appName: string;
  logoUrl?: string;
  logoAlt?: string;
  websiteUrl?: string;
  unsubscribeUrl?: string;
  termsUrl?: string;
  privacyUrl?: string;
  legalName?: string;
  children: ReactNode;
}

export function EmailLayout({
  tokens,
  preview,
  appName,
  logoUrl,
  logoAlt,
  websiteUrl,
  unsubscribeUrl,
  termsUrl,
  privacyUrl,
  legalName,
  children,
}: EmailLayoutProps) {
  const t = tokens;

  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: t.colors.background,
          fontFamily: t.fontFamily.body,
          margin: 0,
          padding: '40px 20px',
        }}
      >
        <Container style={{ maxWidth: '560px', margin: '0 auto' }}>
          <EmailHeader tokens={t} appName={appName} logoUrl={logoUrl} logoAlt={logoAlt} />
          <Section style={{ padding: '8px 0 0' }}>{children}</Section>
          <EmailFooter
            tokens={t}
            appName={appName}
            websiteUrl={websiteUrl}
            unsubscribeUrl={unsubscribeUrl}
            termsUrl={termsUrl}
            privacyUrl={privacyUrl}
            legalName={legalName}
          />
        </Container>
      </Body>
    </Html>
  );
}
