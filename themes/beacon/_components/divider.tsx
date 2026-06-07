import { Hr, Section, Text } from '@react-email/components';
import { getActiveBeaconTokens } from './token-context';

export interface EmailDividerProps {
  label?: string;
}

/**
 * Horizontal divider with optional centered label.
 */
export function EmailDivider({ label }: EmailDividerProps) {
  const tokens = getActiveBeaconTokens();

  if (!label) {
    return (
      <Hr
        className="email-border"
        style={{
          borderColor: tokens.colors.border,
          borderTop: `1px solid ${tokens.colors.border}`,
          margin: '16px 0',
        }}
      />
    );
  }

  return (
    <Section style={{ margin: '16px 0' }}>
      <table cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ borderTop: `1px solid ${tokens.colors.border}`, width: '42%' }} />
            <td style={{ padding: `0 ${tokens.spacing.sm}`, textAlign: 'center', width: '16%' }}>
              <Text
                className="email-muted"
                style={{
                  color: tokens.colors.mutedForeground,
                  fontSize: tokens.fontSize.xs,
                  margin: 0,
                }}
              >
                {label}
              </Text>
            </td>
            <td style={{ borderTop: `1px solid ${tokens.colors.border}`, width: '42%' }} />
          </tr>
        </tbody>
      </table>
    </Section>
  );
}
