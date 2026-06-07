import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';
import { EmailLinkFallback } from '../../_components/link-fallback';

export interface TeamInvitationProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  inviterName: string;
  workspaceName: string;
  inviteUrl: string;
  role: string;
  expiresIn?: string;
}

/**
 * Team invitation template for the Beacon theme.
 */
export function TeamInvitation({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  inviterName,
  workspaceName,
  inviteUrl,
  role,
  expiresIn = '7 days',
}: TeamInvitationProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`${inviterName} invited you to ${workspaceName}`}
    >
      <EmailEyebrow>Invitation</EmailEyebrow>
      <EmailHeading subtitle={`Join ${workspaceName} on ${appName}`}>
        You&apos;re invited
      </EmailHeading>
      <EmailBodyText>
        {inviterName} has invited you to collaborate in their workspace. Accept below to access shared
        projects, comments, and files.
      </EmailBodyText>
      <EmailInfoCard
       
        rows={[
          { label: 'Workspace', value: workspaceName },
          { label: 'Your role', value: role },
          { label: 'Invited by', value: inviterName },
          { label: 'Expires', value: expiresIn },
        ]}
      />
      <EmailCtaSection
       
        href={inviteUrl}
        label="Accept invitation"
        caption="You'll be asked to sign in or create an account."
      />
      <EmailCallout title="Don't know this person?">
        You can safely ignore this invitation. The link will expire in {expiresIn}.
      </EmailCallout>
      <EmailLinkFallback url={inviteUrl} />
    </EmailLayout>
  );
}

export default TeamInvitation;
