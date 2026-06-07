import { Link, Section, Text } from '@react-email/components';
import type { EmailBrandProps } from '../../_components/email-brand';
import { beaconBrand } from '../../brand.config';
import { EmailButtonLink } from '../../_components/button';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';
import { EmailTotals } from '../../_components/totals';
import type { PartialBeaconTokens } from '../../tokens.config';

export type LineItem = {
  description: string;
  amount: number;
};

export type PaymentMethod = {
  brand: string;
  last4: string;
};

export interface InvoiceReceiptProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  userName: string;
  invoiceNumber: string;
  invoiceUrl: string;
  planTagline?: string;
  lineItems: LineItem[];
  subtotal: number;
  taxLabel?: string;
  taxAmount: number;
  total: number;
  currency?: string;
  locale?: string;
  paymentMethod: PaymentMethod;
  nextChargeAt: Date | string;
  billingUrl: string;
  supportUrl: string;
}

function formatMoney(amount: number, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

function formatDate(value: Date | string, locale = 'en-GB') {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function InvoiceReceipt({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  userName,
  invoiceNumber,
  invoiceUrl,
  planTagline = 'Your plan is active for another month.',
  lineItems,
  subtotal,
  taxLabel = 'Tax',
  taxAmount,
  total,
  currency = 'USD',
  locale = 'en-US',
  paymentMethod,
  nextChargeAt,
  billingUrl,
  supportUrl,
}: InvoiceReceiptProps) {
  const money = (amount: number) => formatMoney(amount, currency, locale);
  const nextChargeStr = formatDate(nextChargeAt, locale);

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Receipt ${invoiceNumber} · ${money(total)} for ${brand.appName}`}
      forestHeader={{ stampLabel: 'Receipt', stampValue: invoiceNumber }}
    >
      <EmailHeading centered subtitle={planTagline}>
        Thanks, {userName}.
      </EmailHeading>

      <EmailLineItems
        items={lineItems.map((item) => ({
          description: item.description,
          amount: money(item.amount),
        }))}
      />

      <EmailTotals
        rows={[
          { label: 'Subtotal', value: money(subtotal) },
          { label: taxLabel, value: money(taxAmount) },
        ]}
        totalValue={money(total)}
      />

      <EmailInfoCard
        rows={[
          {
            label: 'Charged to',
            value: `${paymentMethod.brand}  •••• ${paymentMethod.last4}`,
          },
          { label: 'Next charge', value: nextChargeStr },
        ]}
      />

      <Section style={{ textAlign: 'center', marginBottom: 24 }}>
        <EmailButtonLink href={invoiceUrl}>Download invoice</EmailButtonLink>
      </Section>

      <Text
        style={{
          textAlign: 'center',
          fontSize: 13,
          lineHeight: 1.6,
          color: '#78716C',
          margin: 0,
        }}
      >
        Questions about this charge?{' '}
        <Link href={supportUrl} style={{ color: '#0F3D2E', textDecoration: 'none', fontWeight: 500 }}>
          Contact us
        </Link>{' '}
        or{' '}
        <Link href={billingUrl} style={{ color: '#0F3D2E', textDecoration: 'none', fontWeight: 500 }}>
          manage billing
        </Link>
        .
      </Text>
    </EmailLayout>
  );
}

export default InvoiceReceipt;
