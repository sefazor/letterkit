import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleList } from '../../_components/lifecycle/list';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface RecoveryCodesGeneratedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  guidanceUrl?: string;
  codeCount?: number;
}

export function RecoveryCodesGenerated({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  guidanceUrl,
  codeCount,
}: RecoveryCodesGeneratedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="New recovery codes — your old ones no longer work."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>New recovery codes</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {codeCount
          ? `${codeCount} new recovery codes are ready. Your previous codes no longer work.`
          : 'New recovery codes are ready. Your previous codes no longer work.'}
      </LifecycleLede>
      <LifecycleLede>
        Codes are shown once in your browser — we can&apos;t send them by email.
      </LifecycleLede>
      <LifecycleList
        ordered
        items={[
          'Copy the codes from your security settings',
          'Store them in a password manager or print them',
          'Keep them offline — not in a notes app or screenshot',
        ]}
      />
      <LifecycleCta href={guidanceUrl} label="Open recovery settings" />
      <LifecycleFootnote>
        Lost your authenticator? Recovery codes are your only backup.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default RecoveryCodesGenerated;
