import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';
import { EmailTotals } from '../../_components/totals';

export interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

export interface OrderConfirmationProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  customerName: string;
  orderNumber: string;
  orderDate: string;
  items: OrderItem[];
  total: string;
  shippingAddress: string;
  trackingUrl: string;
}

/**
 * Order confirmation template for the Beacon theme.
 */
export function OrderConfirmation({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  customerName,
  orderNumber,
  orderDate,
  items,
  total,
  shippingAddress,
  trackingUrl,
}: OrderConfirmationProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`Order ${orderNumber} confirmed — ${total}`}
    >
      <EmailEyebrow>Order confirmed</EmailEyebrow>
      <EmailHeading subtitle={`We're preparing your items`}>
        Thanks for your order
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, we&apos;ve received your order and started processing it. You&apos;ll get
        another email when it ships.
      </EmailBodyText>
      <EmailInfoCard
       
        rows={[
          { label: 'Order', value: orderNumber },
          { label: 'Placed', value: orderDate },
          { label: 'Ship to', value: shippingAddress },
        ]}
      />
      <EmailLineItems
       
        title="Your items"
        items={items.map((item) => ({
          name: item.name,
          detail: `Qty ${item.quantity}`,
          amount: item.price,
        }))}
      />
      <EmailTotals rows={[{ label: 'Order total', value: total, emphasis: true }]} />
      <EmailCtaSection
       
        href={trackingUrl}
        label="View order status"
        caption="Track packing and delivery from your account."
      />
    </EmailLayout>
  );
}

export default OrderConfirmation;
