export const previewProps = {
  recipientEmail: 'alex@company.com',
  userName: 'Alex',
  invoiceNumber: 'INV-2026-0042',
  invoiceUrl: 'https://acme.com/billing/invoices/INV-2026-0042',
  planTagline: 'Your plan is active for another month.',
  lineItems: [
    { description: 'Pro Plan', amount: 29 },
    { description: 'Extra seats × 2', amount: 10 },
  ],
  subtotal: 39,
  taxAmount: 3.12,
  total: 42.12,
  paymentMethod: { brand: 'VISA', last4: '4242' },
  nextChargeAt: '2026-07-05',
  billingUrl: 'https://acme.com/billing',
  supportUrl: 'https://acme.com/support',
};
