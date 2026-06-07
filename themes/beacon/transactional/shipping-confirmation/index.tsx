import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';
import { EmailLinkFallback } from '../../_components/link-fallback';

export interface ShippingConfirmationProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  customerName: string;
  orderNumber: string;
  carrier: string;
  trackingNumber: string;
  trackingUrl: string;
  estimatedDelivery: string;
}

/**
 * Shipping confirmation template for the Beacon theme.
 */
export function ShippingConfirmation({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  customerName,
  orderNumber,
  carrier,
  trackingNumber,
  trackingUrl,
  estimatedDelivery,
}: ShippingConfirmationProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`Your ${appName} order is on the way`}
    >
      <EmailEyebrow>Shipped</EmailEyebrow>
      <EmailHeading subtitle={`Order ${orderNumber} · ${carrier}`}>
        Your package is on its way
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, great news — your order has left our warehouse and is headed your way.
      </EmailBodyText>
      <EmailInfoCard
       
        title="Tracking details"
        rows={[
          { label: 'Carrier', value: carrier },
          { label: 'Tracking #', value: trackingNumber },
          { label: 'Est. delivery', value: estimatedDelivery },
        ]}
      />
      <EmailCtaSection
       
        href={trackingUrl}
        label="Track shipment"
        caption="Updates appear as the carrier scans your package."
      />
      <EmailCallout title="Delivery tip">
        Make sure someone is available to receive the package, or update delivery preferences with
        the carrier directly.
      </EmailCallout>
      <EmailLinkFallback url={trackingUrl} label="Tracking link" />
    </EmailLayout>
  );
}

export default ShippingConfirmation;
