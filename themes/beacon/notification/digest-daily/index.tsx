import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface DigestDailyProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  userName: string;
  date: string;
  mentions: number;
  tasksCompleted: number;
  pendingApprovals: number;
  digestUrl: string;
}

/**
 * Daily digest notification template for the Beacon theme.
 */
export function DigestDaily({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  userName,
  date,
  mentions,
  tasksCompleted,
  pendingApprovals,
  digestUrl,
}: DigestDailyProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${appName} daily digest — ${date}`}
    >
      <EmailEyebrow>{date}</EmailEyebrow>
      <EmailHeading subtitle={`Hi ${userName}`}>Daily digest</EmailHeading>
      <EmailBodyText>
        Your activity summary for {date}. Numbers below reflect what changed in {appName} today.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Mentions', value: String(mentions) },
          { label: 'Tasks completed', value: String(tasksCompleted) },
          { label: 'Pending approvals', value: String(pendingApprovals) },
        ]}
      />
      <EmailCtaSection
        href={digestUrl}
        label="Open activity feed"
        caption="Catch up on threads and assignments you missed."
      />
    </EmailLayout>
  );
}

export default DigestDaily;
