import { Link } from '@react-email/components';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailBodyText } from '../../_components/body';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailDivider } from '../../_components/divider';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';
import { EmailTotals } from '../../_components/totals';
import { resolveGrundyTokens } from '../../_components/token-context';

export interface InvoiceLineItem {
  name: string;
  quantity: number;
  amount: string;
}

export interface InvoiceReceiptProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  customerName: string;
  invoiceNumber: string;
  invoiceDate: string;
  items: InvoiceLineItem[];
  subtotal: string;
  tax: string;
  total: string;
  paymentMethod: string;
  billingUrl: string;
}

/**
 * Invoice receipt template for the Grundy theme.
 */
export function InvoiceReceipt({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  customerName,
  invoiceNumber,
  invoiceDate,
  items,
  subtotal,
  tax,
  total,
  paymentMethod,
  billingUrl,
}: InvoiceReceiptProps) {
  const appName = brand.appName;
  const palette = resolveGrundyTokens(tokens);

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`Receipt ${invoiceNumber} — ${total}`}
      headerTagline="Billing"
      helpEmail="billing@acme.com"
    >
      <EmailEyebrow>Payment received</EmailEyebrow>
      <EmailHeading subtitle={`Invoice ${invoiceNumber} · ${invoiceDate}`}>
        Thank you for your payment
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, we&apos;ve received your payment. Below is a summary of your receipt for
        your records.
      </EmailBodyText>
      <EmailInfoCard
       
        rows={[
          { label: 'Invoice', value: invoiceNumber },
          { label: 'Date', value: invoiceDate },
          { label: 'Paid via', value: paymentMethod },
        ]}
      />
      <EmailLineItems
       
        title="Line items"
        items={items.map((item) => ({
          name: item.name,
          detail: `Qty ${item.quantity}`,
          amount: item.amount,
        }))}
      />
      <EmailTotals
       
        rows={[
          { label: 'Subtotal', value: subtotal },
          { label: 'Tax', value: tax },
          { label: 'Total paid', value: total, emphasis: true },
        ]}
      />
      <EmailDivider />
      <EmailCtaSection
       
        href={billingUrl}
        label="Download invoice"
        secondaryHref={billingUrl}
        secondaryLabel="Manage billing"
      />
      <EmailBodyText muted>
        Need help? Visit{' '}
        <Link href={billingUrl} style={{ color: palette.ink }}>
          billing settings
        </Link>{' '}
        or reply to this email.
      </EmailBodyText>
    </EmailLayout>
  );
}

export default InvoiceReceipt;
