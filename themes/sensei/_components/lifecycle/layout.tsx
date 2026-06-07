import { Body, Container, Head, Html, Preview } from '@react-email/components';
import type { EmailBrandProps } from '../email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import type { ReactNode } from 'react';
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
        <style>{`html, body { height: 100%; margin: 0; }`}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: resolved.page,
          color: resolved.ink,
          fontFamily: resolved.fontFamily,
          margin: 0,
          minHeight: '100%',
          padding: '32px 16px',
        }}
      >
        <Container
          style={{
            backgroundColor: resolved.card,
            border: `1px solid ${resolved.border}`,
            borderRadius: 8,
            margin: '0 auto',
            maxWidth: 560,
            padding: '48px 48px 32px',
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
