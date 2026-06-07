import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
} from '@react-email/components';
import type { ReactNode } from 'react';
import type { EmailBrandProps } from './email-brand';
import { withEmailBrandDefaults } from './email-brand';
import { EmailFooter } from './footer';
import { EmailHeader } from './header';
import type { PartialGrundyTokens } from '../tokens.config';
import { resolveGrundyTokens, setActiveGrundyTokens } from './token-context';

export interface EmailLayoutProps {
  brand: EmailBrandProps;
  preview: string;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  headerTagline?: string;
  helpEmail?: string;
  children: ReactNode;
}

/**
 * Root email layout with Grundy accent bar, card shell, header, and footer.
 */
export function EmailLayout({
  brand,
  preview,
  tokens,
  recipientEmail,
  headerTagline,
  helpEmail,
  children,
}: EmailLayoutProps) {
  const resolved = resolveGrundyTokens(tokens);
  setActiveGrundyTokens(resolved);
  const t = withEmailBrandDefaults(brand);

  return (
    <Tailwind>
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap"
            rel="stylesheet"
          />
          <style>{`
            @media (prefers-color-scheme: dark) {
              .email-bg { background-color: #141414 !important; }
              .email-shell { background-color: #1A1A1A !important; }
              .email-fg { color: #FAF8F3 !important; }
              .email-muted { color: #A8A29E !important; }
              .email-border { border-color: #3D3A36 !important; }
              .email-accent { background-color: #2A2826 !important; }
              .email-btn { background-color: #C44536 !important; color: #FAF8F3 !important; }
            }
          `}</style>
        </Head>
        <Preview>{preview}</Preview>
        <Body
          className="email-bg"
          style={{
            backgroundColor: resolved.page,
            fontFamily: resolved.fontFamily,
            margin: 0,
            padding: '24px 16px',
          }}
        >
          <Container style={{ maxWidth: '560px', margin: '0 auto' }}>
            <EmailHeader brand={t} tagline={headerTagline} />
            <Section
              className="email-shell email-border"
              style={{
                backgroundColor: resolved.card,
                border: `1px solid ${resolved.border}`,
                borderRadius: 0,
                boxShadow: '0 1px 2px rgba(26, 26, 26, 0.04)',
                overflow: 'hidden',
              }}
            >
              <Section
                style={{
                  backgroundColor: resolved.accent,
                  height: '3px',
                  lineHeight: '3px',
                }}
              >
                <span style={{ fontSize: '1px' }}>&nbsp;</span>
              </Section>
              <Section style={{ padding: '32px 32px 24px' }}>{children}</Section>
            </Section>
            <EmailFooter
              brand={t}
              recipientEmail={recipientEmail}
              helpEmail={helpEmail}
            />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
