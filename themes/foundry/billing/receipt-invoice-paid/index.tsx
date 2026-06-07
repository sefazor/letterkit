import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleTotals } from '../../_components/lifecycle/totals';
import { foundryBrand } from '../../brand.config';

export interface ReceiptInvoicePaidProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  invoiceNumber?: string;
  plan?: string;
  paidOn?: string;
  subtotal?: string;
  vat?: string;
  totalPaid?: string;
  actionUrl?: string;
}

export function ReceiptInvoicePaid({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  invoiceNumber,
  plan,
  paidOn,
  subtotal,
  vat,
  totalPaid,
  actionUrl,
}: ReceiptInvoicePaidProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={
        invoiceNumber
          ? `Payment received for invoice ${invoiceNumber}.`
          : 'Payment received for your invoice.'
      }
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Payment receipt</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — thank you. Your invoice has been paid successfully.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Invoice', value: invoiceNumber ?? '' },
          { label: 'Plan', value: plan ?? '' },
          { label: 'Paid on', value: paidOn ?? '' },
        ]}
      />
      <LifecycleTotals
        rows={[
          { label: 'Subtotal', value: subtotal ?? '' },
          { label: 'VAT (20%)', value: vat ?? '' },
          { label: 'Total paid', value: totalPaid ?? '', emphasis: true },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Download invoice PDF" />
    </LifecycleLayout>
  );
}

export default ReceiptInvoicePaid;
