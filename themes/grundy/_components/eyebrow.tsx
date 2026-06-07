import { Text } from '@react-email/components';
import { getActiveGrundyTokens } from './token-context';

export interface EmailEyebrowProps {
  children: string;
}

/**
 * Small-caps terracotta label above headings.
 */
export function EmailEyebrow({ children }: EmailEyebrowProps) {
  const tokens = getActiveGrundyTokens();

  return (
    <Text
      style={{
        color: tokens.colors.primary,
        fontFamily: tokens.fontFamily.body,
        fontSize: tokens.fontSize.xs,
        fontWeight: 600,
        margin: `0 0 ${tokens.spacing.sm}`,
      }}
    >
      {children}
    </Text>
  );
}
