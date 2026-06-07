/**
 * Fixed 52-template contract every letterkit theme must implement.
 */
export const TEMPLATE_CONTRACT = {
  auth: [
    'verify-email',
    'magic-link',
    'password-reset',
    'password-changed',
    'otp-code',
    'new-device-login',
    'account-deleted',
  ],
  billing: [
    'invoice-receipt',
    'subscription-started',
    'subscription-renewed',
    'payment-failed',
    'payment-method-updated',
    'trial-ending',
    'refund-issued',
    'usage-limit-warning',
  ],
  onboarding: [
    'welcome',
    'getting-started',
    'product-tour',
    'first-action-celebration',
    'inactive-day-3',
    'inactive-day-7',
  ],
  transactional: [
    'order-confirmation',
    'shipping-confirmation',
    'delivery-confirmation',
    'order-cancelled',
    'refund-processed',
    'abandoned-cart',
    'back-in-stock',
    'review-request',
  ],
  notification: [
    'mention-alert',
    'comment-reply',
    'new-message',
    'task-assigned',
    'deadline-reminder',
    'digest-daily',
    'digest-weekly',
    'system-alert',
  ],
  team: [
    'team-invitation',
    'invitation-accepted',
    'role-changed',
    'workspace-shared',
    'member-removed',
  ],
  lifecycle: [
    'account-created',
    'profile-completed',
    'export-ready',
    'data-deletion-confirmation',
    'goodbye',
  ],
  'product-update': [
    'product-update',
    'feature-announcement',
    'changelog-digest',
    'maintenance-notice',
    'security-alert',
  ],
} as const;

export type TemplateCategory = keyof typeof TEMPLATE_CONTRACT;

const contractTotal = Object.values(TEMPLATE_CONTRACT).reduce((sum, names) => sum + names.length, 0);

if (contractTotal !== 52) {
  throw new Error(`TEMPLATE_CONTRACT must define exactly 52 templates, got ${contractTotal}`);
}

/**
 * Flat list of all required category/name pairs.
 */
export function getContractEntries(): Array<{ category: string; name: string }> {
  return Object.entries(TEMPLATE_CONTRACT).flatMap(([category, names]) =>
    names.map((name) => ({ category, name })),
  );
}
