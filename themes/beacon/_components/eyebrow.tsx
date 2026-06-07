import { Text } from '@react-email/components';
import { getActiveBeaconPalette } from './token-context';

export interface EmailEyebrowProps {
  children: string;
}

/** Left-aligned section label above headings. */
export function EmailEyebrow({ children }: EmailEyebrowProps) {
  const palette = getActiveBeaconPalette();

  return (
    <Text
      style={{
        color: palette.forest,
        fontFamily: palette.fontMono,
        fontSize: 11,
        fontWeight: 500,
        margin: '0 0 6px',
        textAlign: 'left',
      }}
    >
      {children}
    </Text>
  );
}
