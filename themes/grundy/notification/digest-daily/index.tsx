import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';

export interface DigestDailyProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  date: string;
  mentions: number;
  tasksCompleted: number;
  pendingApprovals: number;
  digestUrl: string;
}

/**
 * Daily digest notification template for the Grundy theme.
 */
export function DigestDaily({
  brand = grundyBrand,
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
      preview={`Your ${appName} daily digest — ${date}`}
      headerTagline="Daily digest"
    >
      <EmailEyebrow>Today in review</EmailEyebrow>
      <EmailHeading subtitle={date}>
        Hi {userName}, here&apos;s your day
      </EmailHeading>
      <EmailBodyText>
        A quiet summary of what happened in {appName} while you were focused on the work that matters.
      </EmailBodyText>
      <EmailLineItems
        title="Activity snapshot"
        items={[
          { name: 'Mentions', amount: String(mentions) },
          { name: 'Tasks completed', amount: String(tasksCompleted) },
          { name: 'Pending approvals', amount: String(pendingApprovals) },
        ]}
      />
      <EmailCtaSection
        href={digestUrl}
        label="Open activity feed"
        caption="See comments, tasks, and updates you may have missed."
      />
    </EmailLayout>
  );
}

export default DigestDaily;
