import { Link } from '@react-email/components';
import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailHighlightList } from '../../_components/highlight-list';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';
import { resolveBeaconTokens } from '../../_components/token-context';

export interface DigestWeeklyProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  userName: string;
  weekRange: string;
  highlights: string[];
  digestUrl: string;
  stats?: Array<{ label: string; value: string }>;
}

/**
 * Weekly digest template for the Beacon theme.
 */
export function DigestWeekly({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  userName,
  weekRange,
  highlights,
  digestUrl,
  stats,
}: DigestWeeklyProps) {
  const appName = brand.appName;
  const palette = resolveBeaconTokens(tokens);

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${appName} weekly digest — ${weekRange}`}
    >
      <EmailEyebrow>{weekRange}</EmailEyebrow>
      <EmailHeading subtitle={`Hi ${userName}`}>Weekly digest</EmailHeading>
      <EmailBodyText>
        A structured recap of your week in {appName} — metrics first, then the items worth opening.
      </EmailBodyText>
      {stats && stats.length > 0 ? (
        <EmailInfoCard rows={stats.map((stat) => ({ label: stat.label, value: stat.value }))} />
      ) : null}
      <EmailHighlightList title="Notable activity" items={highlights} />
      <EmailCtaSection
        href={digestUrl}
        label="Open full digest"
        caption="Read threads, tasks, and updates from the past seven days."
      />
      <EmailBodyText muted compact>
        <Link href={digestUrl} style={{ color: palette.muted, textDecoration: 'none' }}>
          Manage digest preferences
        </Link>
      </EmailBodyText>
    </EmailLayout>
  );
}

export default DigestWeekly;
