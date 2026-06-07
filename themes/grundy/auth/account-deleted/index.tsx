import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface AccountDeletedProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  workspaceName: string;
  deletedAt: string;
}

/**
 * Account permanently deleted confirmation template for the Grundy theme.
 */
export function AccountDeleted({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  workspaceName,
  deletedAt,
}: AccountDeletedProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Your ${appName} account has been deleted`}
      headerTagline="Account"
    >
      <EmailEyebrow>Account closed</EmailEyebrow>
      <EmailHeading subtitle="Your data has been permanently removed">
        Account permanently deleted
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, your {appName} account and all associated data for {workspaceName} have been
        permanently deleted. This action cannot be undone.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Status', value: 'Closed' },
          { label: 'Workspace', value: workspaceName },
          { label: 'Deleted', value: deletedAt },
        ]}
      />
      <EmailBodyText muted>
        If you didn&apos;t request this deletion, contact our support team immediately.
      </EmailBodyText>
    </EmailLayout>
  );
}

export default AccountDeleted;
