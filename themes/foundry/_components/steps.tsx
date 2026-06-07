import { Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface EmailStepsProps {
  tokens: ThemeTokens;
  steps: string[];
}

/** Numbered instructions — recovery codes, setup flows. */
export function EmailSteps({ tokens, steps }: EmailStepsProps) {
  const t = tokens;

  return (
    <Section style={{ margin: '0 0 28px', textAlign: 'left' }}>
      {steps.map((step, i) => (
        <Section key={step} style={{ margin: i < steps.length - 1 ? '0 0 16px' : 0 }}>
          <Text
            style={{
              color: t.colors.foreground,
              fontFamily: t.fontFamily.body,
              fontSize: t.fontSize.base,
              lineHeight: '26px',
              margin: 0,
            }}
          >
            <span
              style={{
                color: t.colors.primary,
                display: 'inline-block',
                fontWeight: 700,
                marginRight: '8px',
                minWidth: '20px',
              }}
            >
              {i + 1}.
            </span>
            {step}
          </Text>
        </Section>
      ))}
    </Section>
  );
}
