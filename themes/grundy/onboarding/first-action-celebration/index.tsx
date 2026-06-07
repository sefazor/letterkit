import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';

export interface FirstActionCelebrationProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  actionName: string;
  nextStepUrl: string;
  nextStepLabel?: string;
}

/**
 * First action celebration template for the Grundy theme.
 */
export function FirstActionCelebration({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  actionName,
  nextStepUrl,
  nextStepLabel = 'Keep going',
}: FirstActionCelebrationProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Nice work on your first ${actionName}`}
      headerTagline="Onboarding"
    >
      <EmailEyebrow>Milestone</EmailEyebrow>
      <EmailHeading subtitle="You're off to a great start">
        Nice first step, {userName}
      </EmailHeading>
      <EmailBodyText>
        You just completed your first {actionName} in {appName}. That&apos;s the hardest part — most
        people never get this far.
      </EmailBodyText>
      <EmailBodyText>
        Ready for the next one? Building a habit early makes everything else easier.
      </EmailBodyText>
      <EmailCtaSection
        href={nextStepUrl}
        label={nextStepLabel}
        caption="Small wins compound. Keep the momentum going."
      />
    </EmailLayout>
  );
}

export default FirstActionCelebration;
