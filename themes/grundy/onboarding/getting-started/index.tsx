import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';

export interface GettingStartedProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  workspaceName: string;
  workspaceUrl: string;
  planName?: string;
  steps?: string[];
}

/**
 * Getting started onboarding template for the Grundy theme.
 */
export function GettingStarted({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  workspaceName,
  workspaceUrl,
  planName = 'Trial',
  steps = [
    'Complete your profile',
    'Create your first project',
    'Invite a teammate',
  ],
}: GettingStartedProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Get started with ${appName}`}
      headerTagline="Onboarding"
    >
      <EmailEyebrow>Getting started</EmailEyebrow>
      <EmailHeading subtitle={`Your ${workspaceName} workspace is ready`}>
        Welcome to {appName}, {userName}
      </EmailHeading>
      <EmailBodyText>
        You&apos;re all set. Here&apos;s everything you need to hit the ground running in your new
        workspace.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Workspace', value: workspaceName },
          { label: 'Plan', value: planName },
          { label: 'Status', value: 'Active' },
        ]}
      />
      <EmailLineItems
        title="Your first steps"
        items={steps.map((step, i) => ({
          name: step,
          detail: `Step ${i + 1}`,
          amount: '→',
        }))}
      />
      <EmailCtaSection
        href={workspaceUrl}
        label="Open workspace"
        caption="Most people finish setup in under 5 minutes."
      />
    </EmailLayout>
  );
}

export default GettingStarted;
