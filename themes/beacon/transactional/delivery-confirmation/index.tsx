import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface DeliveryConfirmationProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  customerName: string;
  orderNumber: string;
  deliveredAt: string;
  deliveryLocation?: string;
  orderUrl: string;
}

/**
 * Delivery confirmation template for the Beacon theme.
 */
export function DeliveryConfirmation({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  customerName,
  orderNumber,
  deliveredAt,
  deliveryLocation,
  orderUrl,
}: DeliveryConfirmationProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Order ${orderNumber} delivered`}
    >
      <EmailEyebrow>Delivered</EmailEyebrow>
      <EmailHeading subtitle={`Order ${orderNumber}`}>
        Your package has arrived
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, your {appName} order was delivered on {deliveredAt}. We hope everything
        arrived in great shape.
      </EmailBodyText>
      <EmailInfoCard
        title="Delivery details"
        rows={[
          { label: 'Order', value: orderNumber },
          { label: 'Delivered', value: deliveredAt },
          ...(deliveryLocation ? [{ label: 'Location', value: deliveryLocation }] : []),
        ]}
      />
      <EmailCtaSection
        href={orderUrl}
        label="View order"
        caption="Need to return something? Start from your order page."
      />
    </EmailLayout>
  );
}

export default DeliveryConfirmation;
