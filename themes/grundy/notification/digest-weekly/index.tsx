import { Link } from '@react-email/components';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailBodyText } from '../../_components/body';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailDivider } from '../../_components/divider';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';
import { resolveGrundyTokens } from '../../_components/token-context';

export interface DigestWeeklyProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  weekRange: string;
  highlights: string[];
  digestUrl: string;
  stats?: Array<{ label: string; value: string }>;
}

/**
 * Weekly digest template for the Grundy theme.
 */
export function DigestWeekly({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  weekRange,
  highlights,
  digestUrl,
  stats,
}: DigestWeeklyProps) {
  const appName = brand.appName;
  const palette = resolveGrundyTokens(tokens);

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`Your ${appName} week in review`}
      headerTagline="Weekly digest"
    >
      <EmailEyebrow>Week in review</EmailEyebrow>
      <EmailHeading subtitle={weekRange}>
        Hi {userName}, here&apos;s your week
      </EmailHeading>
      <EmailBodyText>
        A quiet summary of what happened in {appName} while you were focused on the work that matters.
      </EmailBodyText>
      {stats && stats.length > 0 ? (
        <EmailLineItems
         
          title="By the numbers"
          items={stats.map((s) => ({ name: s.label, amount: s.value }))}
        />
      ) : null}
      <EmailLineItems
       
        title="Highlights"
        items={highlights.map((h) => ({ name: h, amount: '•' }))}
      />
      <EmailDivider label="This week" />
      <EmailCtaSection
       
        href={digestUrl}
        label="Open full digest"
        caption="See comments, tasks, and updates you may have missed."
      />
      <EmailBodyText muted>
        <Link href={digestUrl} style={{ color: palette.muted }}>
          Manage digest preferences
        </Link>
      </EmailBodyText>
    </EmailLayout>
  );
}

export default DigestWeekly;
