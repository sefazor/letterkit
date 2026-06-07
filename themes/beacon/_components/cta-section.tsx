import { Section, Text } from '@react-email/components';
import { EmailButtonLink, EmailButtonOutline } from './button';
import { getActiveBeaconTokens } from './token-context';

export interface EmailCtaSectionProps {
  href: string;
  label: string;
  caption?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/**
 * Centered CTA block with optional caption and secondary action.
 */
export function EmailCtaSection({
  href,
  label,
  caption,
  secondaryHref,
  secondaryLabel,
}: EmailCtaSectionProps) {
  const tokens = getActiveBeaconTokens();

  return (
    <Section style={{ margin: '20px 0 16px', textAlign: 'center' }}>
      <EmailButtonLink href={href}>{label}</EmailButtonLink>
      {secondaryHref && secondaryLabel ? (
        <Section style={{ marginTop: tokens.spacing.sm }}>
          <EmailButtonOutline href={secondaryHref}>{secondaryLabel}</EmailButtonOutline>
        </Section>
      ) : null}
      {caption ? (
        <Text
          className="email-muted"
          style={{
            color: tokens.colors.mutedForeground,
            fontSize: tokens.fontSize.xs,
            lineHeight: '18px',
            fontFamily: tokens.fontFamily.body,
            margin: '8px 0 0',
          }}
        >
          {caption}
        </Text>
      ) : null}
    </Section>
  );
}
