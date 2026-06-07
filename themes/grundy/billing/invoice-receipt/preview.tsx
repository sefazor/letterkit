export const previewProps = {
  recipientEmail: 'alex@company.com',
  customerName: 'Alex Morgan',
  invoiceNumber: 'INV-2026-0042',
  invoiceDate: 'June 5, 2026',
  items: [
    { name: 'Pro Plan', quantity: 1, amount: '$29.00' },
    { name: 'Extra seats', quantity: 2, amount: '$10.00' },
  ],
  subtotal: '$39.00',
  tax: '$3.12',
  total: '$42.12',
  paymentMethod: 'Visa ending in 4242',
  billingUrl: 'https://acme.com/billing/invoices/INV-2026-0042',
};
