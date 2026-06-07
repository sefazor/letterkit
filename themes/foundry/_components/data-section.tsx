import { Section } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import { EmailDataRow } from './data-row';
import { EmailHeading } from './heading';

export interface DataSectionRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface EmailDataSectionProps {
  tokens: ThemeTokens;
  title: string;
  rows: DataSectionRow[];
}

/**
 * Titled block of label–value rows.
 */
export function EmailDataSection({ tokens, title, rows }: EmailDataSectionProps) {
  return (
    <Section style={{ margin: `${tokens.spacing.md} 0` }}>
      <EmailHeading tokens={tokens}>{title}</EmailHeading>
      {rows.map((row) => (
        <EmailDataRow
          key={row.label}
          tokens={tokens}
          label={row.label}
          value={row.value}
          highlight={row.highlight}
        />
      ))}
    </Section>
  );
}
