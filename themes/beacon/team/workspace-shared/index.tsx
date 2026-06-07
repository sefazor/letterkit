import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface WorkspaceSharedProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  recipientName: string;
  sharedBy: string;
  workspaceName: string;
  permission: string;
  workspaceUrl: string;
}

/**
 * Workspace shared notification template for the Beacon theme.
 */
export function WorkspaceShared({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  recipientName,
  sharedBy,
  workspaceName,
  permission,
  workspaceUrl,
}: WorkspaceSharedProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${sharedBy} shared ${workspaceName} with you`}
    >
      <EmailEyebrow>Workspace access</EmailEyebrow>
      <EmailHeading subtitle={`${permission} access on ${appName}`}>
        {workspaceName} was shared with you
      </EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, {sharedBy} granted you access to their workspace. You can now view and
        collaborate on shared projects.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Workspace', value: workspaceName },
          { label: 'Shared by', value: sharedBy },
          { label: 'Permission', value: permission },
        ]}
      />
      <EmailCtaSection
        href={workspaceUrl}
        label="Open workspace"
        caption="Access projects, comments, and files right away."
      />
    </EmailLayout>
  );
}

export default WorkspaceShared;
