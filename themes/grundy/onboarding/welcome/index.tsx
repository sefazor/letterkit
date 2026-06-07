import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';

export interface WelcomeProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  gettingStartedUrl: string;
  steps?: string[];
}

/**
 * Welcome onboarding template for the Grundy theme.
 */
export function Welcome({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  gettingStartedUrl,
  steps = [
    'Complete your profile',
    'Connect your first integration',
    'Invite your team',
  ],
}: WelcomeProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`Welcome to ${appName} — let's get started`}
      headerTagline="Welcome aboard"
    >
      <EmailEyebrow>Onboarding</EmailEyebrow>
      <EmailHeading subtitle={`Your ${appName} workspace is ready`}>
        Welcome, {userName}
      </EmailHeading>
      <EmailBodyText>
        You&apos;re in. {appName} is built for focused work — quiet tools, clear communication, and
        emails that stay out of your way.
      </EmailBodyText>
      <EmailLineItems
       
        title="Your first steps"
        items={steps.map((step, i) => ({
          name: step,
          detail: `Step ${i + 1}`,
          amount: '→',
        }))}
      />
      <EmailCtaSection
       
        href={gettingStartedUrl}
        label="Open your workspace"
        caption="Most people finish setup in under 5 minutes."
      />
      <EmailCallout title="A note on emails">
        We keep transactional emails minimal. Manage frequency anytime in your notification settings.
      </EmailCallout>
    </EmailLayout>
  );
}

export default Welcome;
