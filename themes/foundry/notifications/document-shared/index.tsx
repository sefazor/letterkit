import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { foundryBrand } from '../../brand.config';

export interface DocumentSharedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  documentName?: string;
  sharedBy?: string;
  actionUrl?: string;
}

export function DocumentShared({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  documentName,
  sharedBy,
  actionUrl,
}: DocumentSharedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={
        documentName
          ? `You now have access to "${documentName}".`
          : 'A document was shared with you.'
      }
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>A document was shared with you</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {sharedBy ? (
          <LifecycleStrong>{sharedBy}</LifecycleStrong>
        ) : (
          'A teammate'
        )}{' '}
        shared a document and granted you access.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Document', value: documentName ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Open document" />
    </LifecycleLayout>
  );
}

export default DocumentShared;
