import * as React from 'react';
import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import type { EmailBrandProps } from '../../_components/email-brand';
import {
  FOUNDRY_LOGO_HEIGHT,
  FOUNDRY_LOGO_WIDTH,
  resolveFoundryLogoAlt,
  resolveFoundryLogoUrl,
} from '../../_components/email-brand';
import { LifecycleFooter } from '../../_components/lifecycle/footer';
import { FONT_DISPLAY, FONT_MONO, FONT_SANS } from '../../_components/lifecycle/fonts';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { foundryBrand } from '../../brand.config';
import { resolveLifecycleTokens, setActiveLifecycleTokens } from '../../_components/lifecycle/token-context';

export type ChangelogItem = {
  category: string;
  title: string;
  description: React.ReactNode;
  linkLabel?: string;
  linkUrl?: string;
};

export interface ChangelogDigestProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  issueNumber: number;
  issueDate: Date | string;
  headline: string;
  intro: string;
  items: ChangelogItem[];
  next?: {
    eyebrow?: string;
    title: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  recipientEmail?: string;
  readOnWebUrl?: string;
}

function formatIssueDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function ChangelogDigest({
  brand = foundryBrand,
  tokens,
  issueNumber,
  issueDate,
  headline,
  intro,
  items,
  next,
  recipientEmail,
  readOnWebUrl,
}: ChangelogDigestProps) {
  const resolved = resolveLifecycleTokens(tokens);
  setActiveLifecycleTokens(resolved);
  const issueLabel = `Issue ${issueNumber} · ${formatIssueDate(issueDate)}`;
  const productName = brand.appName ?? 'letterkit';
  const hasLogo = Boolean(brand.logoUrl);

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
          fallbackFontFamily={['monospace']}
          webFont={{
            url: 'https://fonts.gstatic.com/s/jetbrainsmono/v20/tDbY2o-flEEny0FZhsfKu5WU4xD7OgnTzj0AY7HxQg.woff2',
            format: 'woff2',
          }}
          fontWeight={500}
          fontStyle="normal"
        />
      </Head>

      <Preview>
        {productName} {issueLabel}: {headline.replace(/\.$/, '')}
      </Preview>

      <Body
        style={{
          backgroundColor: resolved.page,
          margin: 0,
          padding: '24px 16px',
          fontFamily: FONT_SANS,
          color: resolved.ink,
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <Container
          style={{
            maxWidth: 580,
            margin: '0 auto',
            backgroundColor: resolved.card,
            padding: '48px 44px 36px',
            borderRadius: 4,
          }}
        >
          <Section style={{ marginBottom: 56 }}>
            <Row>
              <Column style={{ verticalAlign: 'middle' }}>
                {hasLogo ? (
                  <Img
                    src={resolveFoundryLogoUrl(brand.logoUrl)}
                    width={String(FOUNDRY_LOGO_WIDTH)}
                    height={String(FOUNDRY_LOGO_HEIGHT)}
                    alt={resolveFoundryLogoAlt(brand.logoAlt, productName)}
                    style={{ display: 'block', borderRadius: 1 }}
                  />
                ) : (
                  <Text
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 14,
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                      color: resolved.body,
                      lineHeight: `${FOUNDRY_LOGO_HEIGHT}px`,
                      margin: 0,
                    }}
                  >
                    {productName}
                  </Text>
                )}
              </Column>
              <Column align="right" style={{ verticalAlign: 'middle' }}>
                <Text
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    letterSpacing: '0.06em',
                    color: resolved.muted,
                    margin: 0,
                  }}
                >
                  {issueLabel}
                </Text>
              </Column>
            </Row>
          </Section>

          <Heading
            as="h1"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 56,
              fontWeight: 500,
              lineHeight: 0.96,
              letterSpacing: '-0.045em',
              color: resolved.ink,
              margin: '0 0 28px',
            }}
          >
            {headline}
          </Heading>

          <Text
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: resolved.body,
              margin: '0 0 40px',
              maxWidth: 440,
            }}
          >
            {intro}
          </Text>

          <Hr
            style={{
              borderTop: `1px solid ${resolved.border}`,
              borderBottom: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              margin: '0 0 36px',
            }}
          />

          {items.map((item, idx) => (
            <React.Fragment key={`item-${idx}`}>
              <Section style={{ marginBottom: 44 }}>
                <Row style={{ marginBottom: 14 }}>
                  <Column style={{ width: 32, verticalAlign: 'baseline' }}>
                    <Text
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 11,
                        letterSpacing: '0.08em',
                        color: resolved.muted,
                        margin: 0,
                        lineHeight: 1,
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </Text>
                  </Column>
                  <Column style={{ verticalAlign: 'baseline' }}>
                    <Text
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 11,
                        letterSpacing: '0.08em',
                        color: resolved.muted,
                        margin: 0,
                        lineHeight: 1,
                      }}
                    >
                      {item.category}
                    </Text>
                  </Column>
                </Row>

                <Heading
                  as="h2"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 26,
                    fontWeight: 500,
                    lineHeight: 1.15,
                    letterSpacing: '-0.025em',
                    color: resolved.ink,
                    margin: '0 0 12px',
                  }}
                >
                  {item.title}
                </Heading>

                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: resolved.body,
                    margin: 0,
                  }}
                >
                  {item.description}
                </Text>

                {item.linkLabel && item.linkUrl ? (
                  <Text style={{ margin: '16px 0 0' }}>
                    <Link
                      href={item.linkUrl}
                      style={{
                        fontSize: 13,
                        color: resolved.ink,
                        textDecoration: 'none',
                        borderBottom: `1px solid ${resolved.ink}`,
                        paddingBottom: 1,
                      }}
                    >
                      {item.linkLabel} →
                    </Link>
                  </Text>
                ) : null}
              </Section>

              {idx < items.length - 1 ? (
                <Hr
                  style={{
                    borderTop: `1px solid ${resolved.border}`,
                    borderBottom: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    margin: '0 0 36px',
                  }}
                />
              ) : null}
            </React.Fragment>
          ))}

          {next ? (
            <Section
              style={{
                borderTop: `1px solid ${resolved.border}`,
                paddingTop: 40,
                marginTop: 36,
                marginBottom: 40,
              }}
            >
              <Text
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  color: resolved.muted,
                  margin: '0 0 14px',
                }}
              >
                {next.eyebrow ?? 'Next'}
              </Text>
              <Heading
                as="h2"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 22,
                  fontWeight: 500,
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  color: resolved.ink,
                  margin: '0 0 20px',
                }}
              >
                {next.title}
              </Heading>
              <Button
                href={next.ctaUrl}
                style={{
                  backgroundColor: resolved.accent,
                  color: resolved.accentForeground,
                  padding: '11px 20px',
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 3,
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                {next.ctaLabel}
              </Button>
            </Section>
          ) : null}

          <LifecycleFooter
            brand={brand}
            recipientEmail={recipientEmail}
            readOnWebUrl={readOnWebUrl}
          />
        </Container>
      </Body>
    </Html>
  );
}

export default ChangelogDigest;
