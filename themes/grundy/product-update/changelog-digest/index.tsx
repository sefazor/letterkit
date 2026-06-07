import { Link } from '@react-email/components';
import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailDivider } from '../../_components/divider';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';
import { resolveGrundyTokens } from '../../_components/token-context';

export type ChangelogItem = {
  category: string;
  title: string;
  description: string;
  linkLabel?: string;
  linkUrl?: string;
};

export interface ChangelogDigestProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  issueNumber: number;
  issueDate: string;
  headline: string;
  intro: string;
  items: ChangelogItem[];
  readOnWebUrl?: string;
  next?: {
    title: string;
    ctaLabel: string;
    ctaUrl: string;
  };
}

function formatIssueDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Changelog digest template for the Grundy theme.
 */
export function ChangelogDigest({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  issueNumber,
  issueDate,
  headline,
  intro,
  items,
  readOnWebUrl,
  next,
}: ChangelogDigestProps) {
  const appName = brand.appName;
  const palette = resolveGrundyTokens(tokens);
  const issueLabel = `Issue ${issueNumber} · ${formatIssueDate(issueDate)}`;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={headline}
      headerTagline="Changelog"
    >
      <EmailEyebrow>{issueLabel}</EmailEyebrow>
      <EmailHeading subtitle={intro}>
        {headline}
      </EmailHeading>
      <EmailBodyText>
        What shipped in {appName} this month — built for teams that ship weekly.
      </EmailBodyText>
      <EmailLineItems
        title="This issue"
        items={items.map((item) => ({
          name: item.title,
          detail: item.category,
          amount: '→',
        }))}
      />
      {items.map((item, index) => (
        <EmailBodyText key={`${item.title}-${index}`} muted>
          <strong>{item.category}</strong> — {item.description}
          {item.linkUrl && item.linkLabel ? (
            <>
              {' '}
              <Link href={item.linkUrl} style={{ color: palette.ink }}>
                {item.linkLabel}
              </Link>
            </>
          ) : null}
        </EmailBodyText>
      ))}
      {next ? (
        <>
          <EmailDivider label="Coming up" />
          <EmailBodyText>
            <strong>{next.title}</strong>
          </EmailBodyText>
          <EmailCtaSection href={next.ctaUrl} label={next.ctaLabel} />
        </>
      ) : null}
      {readOnWebUrl ? (
        <EmailBodyText muted>
          <Link href={readOnWebUrl} style={{ color: palette.muted }}>
            Read on the web
          </Link>
        </EmailBodyText>
      ) : null}
    </EmailLayout>
  );
}

export default ChangelogDigest;
