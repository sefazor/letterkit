import { Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import { EmailButtonLink } from './button';

export interface EmailCtaSectionProps {
  tokens: ThemeTokens;
  href: string;
  label: string;
  caption?: string;
}

export function EmailCtaSection({ tokens, href, label, caption }: EmailCtaSectionProps) {
  const t = tokens;

  return (
    <Section style={{ margin: '0 0 32px', textAlign: 'left' }}>
      <EmailButtonLink tokens={t} href={href}>
        {label}
      </EmailButtonLink>
      {caption ? (
        <Text
          style={{
            color: '#9CA3AF',
            fontFamily: t.fontFamily.body,
            fontSize: t.fontSize.sm,
            lineHeight: '22px',
            margin: '14px 0 0',
            textAlign: 'left',
          }}
        >
          {caption}
        </Text>
      ) : null}
    </Section>
  );
}
