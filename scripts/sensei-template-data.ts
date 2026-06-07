import { getSenseiContractEntries } from '../packages/theme/src/contracts/sensei.ts';

export interface TemplateRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface TemplateLineItem {
  name: string;
  detail?: string;
  amount: string;
}

export interface TemplateDef {
  category: string;
  name: string;
  title: string;
  preview: string;
  greeting: string;
  body: string;
  highlight?: { label: string; value: string; large?: boolean };
  highlight2?: { label: string; value: string; large?: boolean };
  quote?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  ctaCaption?: string;
  dataTitle?: string;
  dataRows?: TemplateRow[];
  lineItemsTitle?: string;
  lineItems?: TemplateLineItem[];
  totals?: Array<{ label: string; value: string; emphasis?: boolean }>;
  notice?: string;
  linkFallback?: boolean;
}

const DEFAULT_CTA_URL = 'https://app.acme.com/action';
const MOCK_IPS = ['88.224.142.12', '78.189.45.201', '95.70.166.33', '31.223.54.118'];
const MOCK_CITIES = ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'];
const MOCK_USERS = ['Ece', 'Kerem', 'Merve', 'Deniz', 'Emre', 'Selin'];
const MOCK_WORKSPACES = ['Acme Growth', 'Acme Finance', 'Acme Product', 'Acme Ops'];
const MOCK_PLANS = ['Starter', 'Pro', 'Scale', 'Enterprise'];

function pick<T>(arr: T[], idx: number): T {
  return arr[idx % arr.length];
}

function usd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function invoiceNo(idx: number): string {
  return `INV-2026-${String(1048 + idx).padStart(5, '0')}`;
}

function authTemplate(name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  const ip = pick(MOCK_IPS, idx);
  const city = pick(MOCK_CITIES, idx);
  const code = String(100000 + ((idx * 7919) % 899999));
  const base = {
    greeting: 'Merhaba,',
    ctaUrl: DEFAULT_CTA_URL,
    linkFallback: true,
    dataTitle: 'Security details',
    dataRows: [
      { label: 'IP address', value: ip },
      { label: 'Location', value: `${city}, TR` },
      { label: 'Time', value: `06 Jun 2026, ${String(9 + (idx % 10)).padStart(2, '0')}:1${idx % 6} TRT` },
    ],
    notice: 'If this was not you, secure your account immediately from Security settings.',
  };

  switch (name) {
    case 'email-verification':
      return {
        ...base,
        title: 'Verify your Acme email',
        preview: 'Acme needs one quick confirmation to activate your workspace.',
        body: 'Please verify your email to unlock automation and team invites in Acme.',
        ctaLabel: 'Verify email',
        ctaCaption: 'This verification link expires in 24 hours.',
        highlight: { label: 'Expires in', value: '24 hours' },
      };
    case 'magic-link-login':
      return {
        ...base,
        title: 'Your Acme magic sign-in link',
        preview: 'Use this secure one-time link to access Acme.',
        body: 'A sign-in was requested for your Acme account. Use the magic link below; it works only once.',
        ctaLabel: 'Sign in to Acme',
        ctaCaption: 'Magic link valid for 15 minutes.',
        highlight: { label: 'Link validity', value: '15 min', large: true },
      };
    case 'otp-2fa-code':
      return {
        ...base,
        title: 'Your Acme 2FA code',
        preview: 'Enter this security code to finish sign-in.',
        body: 'Use the code below to complete your Acme login. Never share this code with anyone.',
        ctaLabel: 'Open Acme login',
        highlight: { label: 'One-time code', value: code, large: true },
        highlight2: { label: 'Code expires', value: 'in 10 minutes' },
      };
    case 'password-reset-request':
      return {
        ...base,
        title: 'Reset your Acme password',
        preview: 'A password reset request was received for your account.',
        body: 'We received a request to reset your Acme password. If you requested this, continue securely below.',
        ctaLabel: 'Reset password',
        ctaCaption: 'For your safety, the reset link expires in 30 minutes.',
        highlight: { label: 'Reset link', value: '30 min expiry' },
      };
    case 'password-reset-success':
      return {
        ...base,
        title: 'Password reset complete',
        preview: 'Your Acme password has been reset successfully.',
        body: 'Your Acme password was reset. You can now sign in with your new credentials.',
        ctaLabel: 'Review active sessions',
        highlight: { label: 'Security status', value: 'Updated now' },
      };
    case 'password-changed':
      return {
        ...base,
        title: 'Your Acme password was changed',
        preview: 'This is a confirmation of a recent credential update.',
        body: 'Your password was changed from a signed-in session. If this was not you, reset immediately.',
        ctaLabel: 'Secure account',
        highlight: { label: 'Change source', value: 'Signed-in session' },
      };
    case 'new-device-login':
      return {
        ...base,
        title: 'New device signed in to Acme',
        preview: 'We noticed a login from a new browser or device.',
        body: 'A new device accessed your Acme account. Please review the details below.',
        ctaLabel: 'Review login activity',
        dataRows: [
          { label: 'Device', value: 'MacBook Pro / Chrome 126' },
          { label: 'IP address', value: ip },
          { label: 'Location', value: `${city}, TR` },
        ],
        highlight: { label: 'Risk level', value: 'Low' },
      };
    case 'suspicious-activity-alert':
      return {
        ...base,
        title: 'Suspicious sign-in blocked',
        preview: 'Acme blocked an unusual attempt on your account.',
        body: 'We blocked a sign-in attempt that did not match your normal pattern. Please review and confirm account safety.',
        ctaLabel: 'Run security check',
        highlight: { label: 'Attempt status', value: 'Blocked', large: true },
        highlight2: { label: 'Detected from', value: `${city}, TR` },
      };
    case '2fa-enabled':
      return {
        ...base,
        title: 'Two-factor authentication enabled',
        preview: 'Great choice. Your Acme account is now better protected.',
        body: '2FA has been enabled on your account. Future sign-ins will require a second verification step.',
        ctaLabel: 'Manage 2FA',
        highlight: { label: 'Protection level', value: 'High' },
      };
    case '2fa-disabled':
      return {
        ...base,
        title: 'Two-factor authentication disabled',
        preview: '2FA is currently off for your Acme account.',
        body: 'Two-factor authentication was disabled. We strongly recommend turning it on again.',
        ctaLabel: 'Re-enable 2FA',
        highlight: { label: 'Protection level', value: 'Reduced' },
      };
    case 'recovery-codes-generated':
      return {
        ...base,
        title: 'New recovery codes generated',
        preview: 'Your previous Acme recovery codes are no longer valid.',
        body: 'A fresh set of recovery codes was generated for your account. Store them safely offline.',
        ctaLabel: 'View recovery guidance',
        highlight: { label: 'Codes generated', value: '10' },
      };
    case 'account-locked':
      return {
        ...base,
        title: 'Your account is temporarily locked',
        preview: 'Too many failed login attempts triggered a security lock.',
        body: 'For your protection, Acme locked sign-in after repeated failed attempts.',
        ctaLabel: 'Unlock account',
        ctaCaption: 'Lock will auto-clear in 30 minutes.',
        highlight: { label: 'Auto unlock', value: '30 minutes' },
      };
    case 'email-change-request':
      return {
        ...base,
        title: 'Confirm your email change',
        preview: 'An email address change was requested in Acme.',
        body: 'You requested to update the email on your Acme account. Confirm to proceed.',
        ctaLabel: 'Confirm new email',
        highlight: { label: 'Pending change', value: '1 request' },
      };
    case 'email-changed-confirmation':
      return {
        ...base,
        title: 'Email address updated',
        preview: 'Your Acme login email has been changed successfully.',
        body: 'The primary email on your Acme account is now updated.',
        ctaLabel: 'Review account profile',
        highlight: { label: 'Update status', value: 'Completed' },
      };
    case 'passkey-added':
      return {
        ...base,
        title: 'New passkey added',
        preview: 'A passkey was added for faster and safer sign-ins.',
        body: 'A new passkey is now linked to your Acme account.',
        ctaLabel: 'Manage passkeys',
        dataRows: [
          { label: 'Passkey name', value: 'MacBook Touch ID' },
          { label: 'Added from', value: `${city}, TR` },
          { label: 'IP address', value: ip },
        ],
      };
    case 'passkey-removed':
      return {
        ...base,
        title: 'Passkey removed from your account',
        preview: 'A previously registered passkey has been removed.',
        body: 'One passkey was removed from your Acme account. Verify this action if unexpected.',
        ctaLabel: 'Review passkeys',
        highlight: { label: 'Remaining passkeys', value: String(1 + (idx % 3)) },
      };
    case 'sso-configured':
      return {
        ...base,
        title: 'SSO is configured for your workspace',
        preview: 'Single sign-on setup is now active in Acme.',
        body: 'Your workspace authentication now supports SSO via SAML.',
        ctaLabel: 'Open SSO settings',
        dataRows: [
          { label: 'Provider', value: 'Okta' },
          { label: 'Domain', value: 'acme.co' },
          { label: 'Enforcement', value: 'Admins only' },
        ],
      };
    case 'session-expired':
      return {
        ...base,
        title: 'Your Acme session has expired',
        preview: 'For security reasons, please sign in again.',
        body: 'Your session timed out after inactivity. Sign in again to continue safely.',
        ctaLabel: 'Sign in again',
        highlight: { label: 'Reason', value: 'Inactivity timeout' },
      };
    default:
      throw new Error(`Unknown auth-security template: ${name}`);
  }
}

function accountLifecycleTemplate(name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  const user = pick(MOCK_USERS, idx);
  switch (name) {
    case 'welcome-post-signup':
      return {
        title: 'Welcome to Acme',
        preview: 'Your account is ready; now let us get you productive quickly.',
        greeting: `Merhaba ${user},`,
        body: 'Thanks for signing up. Your workspace is created and you can start inviting teammates today.',
        ctaLabel: 'Start workspace setup',
        ctaUrl: DEFAULT_CTA_URL,
        highlight: { label: 'Workspace status', value: 'Active' },
      };
    case 'welcome-email-confirmed':
      return {
        title: 'Email confirmed successfully',
        preview: 'Great, your Acme account is fully verified.',
        greeting: `Merhaba ${user},`,
        body: 'Your email is confirmed. You now have full access to security settings and billing controls.',
        ctaLabel: 'Go to dashboard',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'profile-completion-reminder':
      return {
        title: 'Complete your Acme profile',
        preview: 'Finish two small steps to personalize your workspace.',
        greeting: `Merhaba ${user},`,
        body: 'Add your role and company details so we can tailor onboarding recommendations.',
        ctaLabel: 'Complete profile',
        ctaUrl: DEFAULT_CTA_URL,
        lineItemsTitle: 'Missing profile fields',
        lineItems: [
          { name: 'Role', detail: 'Choose your primary responsibility', amount: 'Pending' },
          { name: 'Team size', detail: 'Used for default permissions', amount: 'Pending' },
        ],
      };
    case 'account-deletion-requested':
      return {
        title: 'Account deletion requested',
        preview: 'We received your request to delete this Acme account.',
        greeting: `Merhaba ${user},`,
        body: 'Your deletion request is logged. We keep the account recoverable for a short grace window.',
        ctaLabel: 'Cancel deletion',
        ctaUrl: DEFAULT_CTA_URL,
        highlight: { label: 'Grace period', value: '14 days' },
      };
    case 'account-deletion-scheduled':
      return {
        title: 'Deletion is scheduled',
        preview: 'Your Acme account is scheduled for permanent removal.',
        greeting: `Merhaba ${user},`,
        body: 'All workspace data will be permanently deleted on the scheduled date unless you cancel.',
        highlight: { label: 'Deletion date', value: '20 Jun 2026' },
        notice: 'This action is irreversible after the scheduled date.',
      };
    case 'account-deletion-cancelled':
      return {
        title: 'Deletion cancelled',
        preview: 'Your Acme account remains active.',
        greeting: `Merhaba ${user},`,
        body: 'Good news: the scheduled deletion was cancelled and your data is intact.',
        ctaLabel: 'Return to Acme',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'account-permanently-deleted':
      return {
        title: 'Account permanently deleted',
        preview: 'Your Acme account and data were removed.',
        greeting: `Merhaba ${user},`,
        body: 'As requested, your account and associated workspace content were permanently erased.',
        notice: 'Backups with personal data were deleted in accordance with policy.',
      };
    case 'data-export-ready':
      return {
        title: 'Your data export is ready',
        preview: 'Download your Acme export archive securely.',
        greeting: `Merhaba ${user},`,
        body: 'Your requested data export is generated and available for download.',
        ctaLabel: 'Download export',
        ctaUrl: DEFAULT_CTA_URL,
        highlight: { label: 'Download window', value: '72 hours' },
      };
    case 'data-export-failed':
      return {
        title: 'Data export failed',
        preview: 'We could not complete your export request this time.',
        greeting: `Merhaba ${user},`,
        body: 'Your export job failed due to an internal timeout. Please retry from account settings.',
        ctaLabel: 'Retry export',
        ctaUrl: DEFAULT_CTA_URL,
        notice: 'No data was lost. Existing workspace content is unaffected.',
      };
    case 'account-suspended':
      return {
        title: 'Your account is suspended',
        preview: 'Acme access is temporarily restricted.',
        greeting: `Merhaba ${user},`,
        body: 'Your account was suspended due to policy or billing status. Contact support to resolve quickly.',
        ctaLabel: 'Contact support',
        ctaUrl: 'https://app.acme.com/support',
      };
    case 'account-reactivated':
      return {
        title: 'Your account is active again',
        preview: 'Reactivation complete; welcome back to Acme.',
        greeting: `Merhaba ${user},`,
        body: 'Your account is now reactivated and all features are available again.',
        ctaLabel: 'Open workspace',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'goodbye-churn':
      return {
        title: 'Thanks for trying Acme',
        preview: 'We appreciate your time and would love your feedback.',
        greeting: `Merhaba ${user},`,
        body: 'Your subscription is ended. If you share why you left, we will use it to improve with care.',
        ctaLabel: 'Share feedback',
        ctaUrl: 'https://app.acme.com/feedback',
      };
    default:
      throw new Error(`Unknown account-lifecycle template: ${name}`);
  }
}

function onboardingTemplate(name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  const user = pick(MOCK_USERS, idx);
  switch (name) {
    case 'setup-checklist-progress':
      return {
        title: 'Your setup checklist progress',
        preview: 'Acme onboarding is moving well; 3 of 5 tasks are complete.',
        greeting: `Merhaba ${user},`,
        body: 'You are very close to a fully configured workspace. Complete the next items to unlock all defaults.',
        ctaLabel: 'Continue setup',
        ctaUrl: DEFAULT_CTA_URL,
        highlight: { label: 'Progress', value: '60%', large: true },
        lineItemsTitle: 'Checklist',
        lineItems: [
          { name: 'Invite first teammate', detail: 'Collaboration unlocks shared views', amount: 'Done' },
          { name: 'Connect billing profile', detail: 'Required for paid automations', amount: 'Done' },
          { name: 'Set notification rules', detail: 'Prevent noisy alerts', amount: 'In progress' },
          { name: 'Create first workflow', detail: 'Automate repetitive tasks', amount: 'Pending' },
        ],
      };
    case 'first-action-celebration':
      return {
        title: 'Nice first step in Acme',
        preview: 'You completed your first key action successfully.',
        greeting: `Merhaba ${user},`,
        body: 'Great start. Your first workflow run completed, and your team now sees live activity.',
        ctaLabel: 'Create second workflow',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'feature-spotlight':
      return {
        title: 'Feature spotlight: Smart Rules',
        preview: 'Acme can auto-route tasks based on priority and tags.',
        greeting: `Merhaba ${user},`,
        body: 'Try Smart Rules to route incoming work to the right owner without manual triage.',
        ctaLabel: 'Explore Smart Rules',
        ctaUrl: DEFAULT_CTA_URL,
        highlight: { label: 'Time saved', value: 'up to 4h/week' },
      };
    case 'inactive-day-3':
      return {
        title: 'Need a hand getting started?',
        preview: 'Your Acme workspace has been quiet for 3 days.',
        greeting: `Merhaba ${user},`,
        body: 'If setup felt busy, we can help. A quick starter wizard will configure your first use case in minutes.',
        ctaLabel: 'Open starter wizard',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'inactive-day-7':
      return {
        title: 'Your Acme trial is waiting',
        preview: 'It has been a week; we prepared a shortcut setup for you.',
        greeting: `Merhaba ${user},`,
        body: 'Pick one recommended template and Acme will pre-fill workflows, alerts, and dashboards.',
        ctaLabel: 'Use recommended template',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'inactive-day-14':
      return {
        title: 'Let us help you relaunch',
        preview: 'Two weeks in, here is a focused restart plan.',
        greeting: `Merhaba ${user},`,
        body: 'Book a 15-minute setup call and we will configure Acme around your current process.',
        ctaLabel: 'Book onboarding call',
        ctaUrl: 'https://app.acme.com/onboarding-call',
      };
    case 'onboarding-complete':
      return {
        title: 'Onboarding complete',
        preview: 'Your Acme workspace is fully configured and ready to scale.',
        greeting: `Merhaba ${user},`,
        body: 'Excellent work. You completed setup milestones and your team can now run production workflows.',
        ctaLabel: 'Open live dashboard',
        ctaUrl: DEFAULT_CTA_URL,
        highlight: { label: 'Completion', value: '100%', large: true },
      };
    case 'we-miss-you':
      return {
        title: 'We miss you at Acme',
        preview: 'Your workspace can be reactivated in one click.',
        greeting: `Merhaba ${user},`,
        body: 'Your previous settings are still in place. Jump back in and continue where you left off.',
        ctaLabel: 'Return to workspace',
        ctaUrl: DEFAULT_CTA_URL,
      };
    default:
      throw new Error(`Unknown onboarding template: ${name}`);
  }
}

function billingTemplate(name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  const plan = pick(MOCK_PLANS, idx + 1);
  const amount = 39 + ((idx % 6) * 10);
  const inv = invoiceNo(idx);

  if (name.startsWith('trial-')) {
    const trialRows: TemplateRow[] = [
      { label: 'Plan after trial', value: `${plan} (${usd(amount)}/mo)` },
      { label: 'Workspace', value: pick(MOCK_WORKSPACES, idx) },
    ];
    if (name === 'trial-started') {
      return {
        title: 'Your Acme trial has started',
        preview: 'You now have full Pro-level access for 14 days.',
        greeting: 'Merhaba,',
        body: 'Your trial is active. Explore automation, analytics, and team permissions with no limits.',
        ctaLabel: 'Explore Pro features',
        ctaUrl: DEFAULT_CTA_URL,
        highlight: { label: 'Trial length', value: '14 days', large: true },
        dataTitle: 'Trial details',
        dataRows: trialRows,
      };
    }
    if (name === 'trial-ending-7-days') {
      return {
        title: '7 days left in your trial',
        preview: 'Plan your next step to keep Acme running smoothly.',
        greeting: 'Merhaba,',
        body: 'Your trial ends in one week. Add a payment method now to avoid interruption.',
        ctaLabel: 'Add payment method',
        ctaUrl: 'https://app.acme.com/billing/payment-method',
        highlight: { label: 'Days remaining', value: '7' },
        dataTitle: 'Before trial ends',
        dataRows: trialRows,
      };
    }
    if (name === 'trial-ending-3-days') {
      return {
        title: '3 days left in trial',
        preview: 'Acme reminder: your paid plan starts soon.',
        greeting: 'Merhaba,',
        body: 'Only three days remain. Keep your automations active by confirming billing today.',
        ctaLabel: 'Choose a paid plan',
        ctaUrl: 'https://app.acme.com/billing/plans',
        highlight: { label: 'Days remaining', value: '3' },
      };
    }
    if (name === 'trial-ending-tomorrow') {
      return {
        title: 'Trial ends tomorrow',
        preview: 'Final reminder before your Acme trial expires.',
        greeting: 'Merhaba,',
        body: 'Your trial ends tomorrow at 23:59 TRT. Add billing now for uninterrupted access.',
        ctaLabel: 'Confirm billing',
        ctaUrl: 'https://app.acme.com/billing',
        highlight: { label: 'Ends in', value: '24 hours', large: true },
      };
    }
    if (name === 'trial-ended') {
      return {
        title: 'Trial ended',
        preview: 'Your Acme trial has finished. Upgrade to continue.',
        greeting: 'Merhaba,',
        body: 'Your trial period is over and some premium features are now paused.',
        ctaLabel: 'Upgrade now',
        ctaUrl: 'https://app.acme.com/billing/plans',
        notice: 'Data remains safe for 30 days on read-only access.',
      };
    }
    if (name === 'trial-extended') {
      return {
        title: 'Trial extended by 7 days',
        preview: 'You have extra time to evaluate Acme.',
        greeting: 'Merhaba,',
        body: 'We extended your trial so your team can complete setup and evaluate results calmly.',
        ctaLabel: 'Continue trial',
        ctaUrl: DEFAULT_CTA_URL,
        highlight: { label: 'Extension', value: '+7 days' },
      };
    }
    return {
      title: 'Welcome to Acme paid plan',
      preview: 'Your trial is now converted to a paid subscription.',
      greeting: 'Merhaba,',
      body: 'Great news: your account converted successfully and premium features stay fully active.',
      ctaLabel: 'Open billing overview',
      ctaUrl: 'https://app.acme.com/billing',
      highlight: { label: 'New plan', value: `${plan} (${usd(amount)}/mo)` },
    };
  }

  if (name.startsWith('subscription-')) {
    const sharedRows: TemplateRow[] = [
      { label: 'Plan', value: plan, highlight: true },
      { label: 'Workspace', value: pick(MOCK_WORKSPACES, idx) },
      { label: 'Next invoice', value: `01 Jul 2026 • ${usd(amount)}` },
    ];

    switch (name) {
      case 'subscription-started':
        return {
          title: 'Subscription started',
          preview: 'Your Acme subscription is active and billing is set.',
          greeting: 'Merhaba,',
          body: 'Your subscription is now active. Thank you for choosing Acme for your team.',
          ctaLabel: 'See plan details',
          ctaUrl: 'https://app.acme.com/billing',
          dataTitle: 'Subscription details',
          dataRows: sharedRows,
        };
      case 'subscription-renewed':
        return {
          title: 'Subscription renewed',
          preview: 'Your monthly Acme renewal completed successfully.',
          greeting: 'Merhaba,',
          body: 'Your subscription renewed and all features continue without interruption.',
          ctaLabel: 'View invoice',
          ctaUrl: 'https://app.acme.com/billing/invoices',
          dataTitle: 'Renewal summary',
          dataRows: sharedRows,
        };
      case 'subscription-upgraded':
        return {
          title: 'Plan upgraded',
          preview: 'Your team moved to a higher Acme plan.',
          greeting: 'Merhaba,',
          body: 'Your plan upgrade is complete and additional seats plus advanced analytics are now enabled.',
          ctaLabel: 'Review new limits',
          ctaUrl: 'https://app.acme.com/billing/plans',
          highlight: { label: 'New tier', value: 'Scale', large: true },
        };
      case 'subscription-downgraded':
        return {
          title: 'Plan downgraded',
          preview: 'Your Acme plan change is scheduled and confirmed.',
          greeting: 'Merhaba,',
          body: 'Your downgrade is accepted and will apply on the next billing cycle.',
          ctaLabel: 'Check impact',
          ctaUrl: 'https://app.acme.com/billing/plans',
          notice: 'Feature limits may change when the new cycle begins.',
        };
      case 'subscription-paused':
        return {
          title: 'Subscription paused',
          preview: 'Your Acme billing is paused temporarily.',
          greeting: 'Merhaba,',
          body: 'The subscription is paused and renewals are on hold until you resume.',
          ctaLabel: 'Resume subscription',
          ctaUrl: 'https://app.acme.com/billing',
          highlight: { label: 'Pause window', value: 'until 01 Aug 2026' },
        };
      case 'subscription-resumed':
        return {
          title: 'Subscription resumed',
          preview: 'Your Acme plan is active again.',
          greeting: 'Merhaba,',
          body: 'Welcome back. Billing resumed and premium capabilities are restored.',
          ctaLabel: 'Open billing',
          ctaUrl: 'https://app.acme.com/billing',
        };
      case 'subscription-cancelled':
        return {
          title: 'Subscription cancelled',
          preview: 'Your Acme subscription will not renew.',
          greeting: 'Merhaba,',
          body: 'Cancellation is confirmed. You can continue using paid features until the current period ends.',
          ctaLabel: 'Reactivate plan',
          ctaUrl: 'https://app.acme.com/billing/reactivate',
          highlight: { label: 'Access until', value: '30 Jun 2026' },
        };
      case 'subscription-cancelled-involuntary':
        return {
          title: 'Subscription cancelled due to payment issues',
          preview: 'Acme could not collect payment after retries.',
          greeting: 'Merhaba,',
          body: 'Your plan was cancelled after unsuccessful payment attempts. Update billing to restore service.',
          ctaLabel: 'Fix payment method',
          ctaUrl: 'https://app.acme.com/billing/payment-method',
          notice: 'You have 7 days to recover full data access.',
        };
      default:
        throw new Error(`Unknown subscription template: ${name}`);
    }
  }

  switch (name) {
    case 'upcoming-renewal-notice':
      return {
        title: 'Upcoming renewal notice',
        preview: 'Your Acme plan renews in 5 days.',
        greeting: 'Merhaba,',
        body: 'Your subscription will renew soon. No action is needed if your billing details are current.',
        ctaLabel: 'Review billing details',
        ctaUrl: 'https://app.acme.com/billing',
        highlight: { label: 'Renewal amount', value: `${usd(amount)}` },
      };
    case 'receipt-invoice-paid':
      return {
        title: 'Payment receipt',
        preview: `Acme received your payment for invoice ${inv}.`,
        greeting: 'Merhaba,',
        body: 'Thank you. Your invoice has been paid successfully.',
        ctaLabel: 'Download invoice PDF',
        ctaUrl: 'https://app.acme.com/billing/invoices',
        dataTitle: 'Receipt details',
        dataRows: [
          { label: 'Invoice', value: inv, highlight: true },
          { label: 'Plan', value: 'Pro Monthly' },
          { label: 'Paid on', value: '06 Jun 2026' },
        ],
        totals: [
          { label: 'Subtotal', value: usd(amount) },
          { label: 'VAT (20%)', value: usd(amount * 0.2) },
          { label: 'Total paid', value: usd(amount * 1.2), emphasis: true },
        ],
      };
    case 'payment-failed-attempt-1':
      return {
        title: 'Payment attempt failed',
        preview: 'First retry failed for your Acme invoice.',
        greeting: 'Merhaba,',
        body: 'We could not process your latest payment. Please check card details and available balance.',
        ctaLabel: 'Update payment method',
        ctaUrl: 'https://app.acme.com/billing/payment-method',
        highlight: { label: 'Retry schedule', value: 'next retry in 24h' },
      };
    case 'payment-failed-attempt-2':
      return {
        title: 'Second payment attempt failed',
        preview: 'Acme could not collect your outstanding invoice yet.',
        greeting: 'Merhaba,',
        body: 'Second retry failed. Update your card now to avoid service interruption.',
        ctaLabel: 'Resolve payment issue',
        ctaUrl: 'https://app.acme.com/billing/payment-method',
        highlight: { label: 'Final retry', value: 'in 48h' },
      };
    case 'payment-failed-final':
      return {
        title: 'Final payment attempt failed',
        preview: 'Your Acme account is at risk of suspension.',
        greeting: 'Merhaba,',
        body: 'Final collection attempt failed. Immediate action is required to keep service active.',
        ctaLabel: 'Pay invoice now',
        ctaUrl: 'https://app.acme.com/billing',
        notice: 'Service will be restricted if payment is not resolved today.',
      };
    case 'payment-method-expiring':
      return {
        title: 'Payment method expiring soon',
        preview: 'The card ending in 4242 expires this month.',
        greeting: 'Merhaba,',
        body: 'Please update your card to prevent failed renewals.',
        ctaLabel: 'Update card',
        ctaUrl: 'https://app.acme.com/billing/payment-method',
        dataTitle: 'Card details',
        dataRows: [
          { label: 'Card', value: 'Visa •••• 4242' },
          { label: 'Expiry', value: '06/26', highlight: true },
        ],
      };
    case 'payment-method-updated':
      return {
        title: 'Payment method updated',
        preview: 'Your new billing card is now active.',
        greeting: 'Merhaba,',
        body: 'Billing method was updated successfully and future charges will use this card.',
        ctaLabel: 'Review billing settings',
        ctaUrl: 'https://app.acme.com/billing',
      };
    case 'payment-method-removed':
      return {
        title: 'Payment method removed',
        preview: 'A billing method was removed from your Acme account.',
        greeting: 'Merhaba,',
        body: 'The card on file was removed. Add another method to keep renewals uninterrupted.',
        ctaLabel: 'Add payment method',
        ctaUrl: 'https://app.acme.com/billing/payment-method',
      };
    case 'refund-issued':
      return {
        title: 'Refund issued',
        preview: `A refund for ${usd(29)} has been processed.`,
        greeting: 'Merhaba,',
        body: 'Your refund was approved and sent back to the original payment method.',
        ctaLabel: 'View refund details',
        ctaUrl: 'https://app.acme.com/billing/invoices',
        totals: [
          { label: 'Original charge', value: usd(58.8) },
          { label: 'Refunded amount', value: usd(29), emphasis: true },
        ],
      };
    case 'chargeback-notice':
      return {
        title: 'Chargeback received',
        preview: 'A payment dispute was opened for an Acme charge.',
        greeting: 'Merhaba,',
        body: 'We received a chargeback notice from your card issuer. Our billing team is reviewing the case.',
        ctaLabel: 'Contact billing support',
        ctaUrl: 'https://app.acme.com/support/billing',
        notice: 'Please reply within 5 days with any supporting details.',
      };
    case 'plan-limit-warning-80':
      return {
        title: 'You reached 80% of your plan limit',
        preview: 'Usage is approaching your Acme plan threshold.',
        greeting: 'Merhaba,',
        body: 'Your current month usage is close to your included limit.',
        ctaLabel: 'View usage report',
        ctaUrl: 'https://app.acme.com/billing/usage',
        highlight: { label: 'Current usage', value: '80%' },
      };
    case 'plan-limit-reached-100':
      return {
        title: 'Plan limit reached',
        preview: 'Your included monthly quota is fully consumed.',
        greeting: 'Merhaba,',
        body: 'You reached 100% of plan capacity. Upgrade to continue high-volume operations.',
        ctaLabel: 'Upgrade plan',
        ctaUrl: 'https://app.acme.com/billing/plans',
        highlight: { label: 'Usage', value: '100%', large: true },
      };
    case 'overage-charges':
      return {
        title: 'Overage charges applied',
        preview: 'Additional usage was billed at your overage rate.',
        greeting: 'Merhaba,',
        body: 'Your account exceeded included capacity. Overage fees were added to your invoice.',
        ctaLabel: 'Review overage details',
        ctaUrl: 'https://app.acme.com/billing/usage',
        totals: [
          { label: 'Included usage', value: '$0.00' },
          { label: 'Overage usage', value: usd(17.5) },
          { label: 'Total overage', value: usd(17.5), emphasis: true },
        ],
      };
    default:
      throw new Error(`Unknown billing template: ${name}`);
  }
}

function usageApiTemplate(name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  const keyPrefix = `ak_live_${String.fromCharCode(97 + (idx % 26))}${String.fromCharCode(97 + ((idx + 7) % 26))}`;
  const webhookUrl = `https://hooks.acme.io/orders/${1000 + idx}`;
  switch (name) {
    case 'usage-cap-warning':
      return {
        title: 'API usage warning',
        preview: 'You consumed 85% of your monthly API quota.',
        greeting: 'Merhaba,',
        body: 'Your API usage is near the monthly cap. Consider upgrading to avoid throttling.',
        ctaLabel: 'Review API usage',
        ctaUrl: 'https://app.acme.com/developers/usage',
        highlight: { label: 'Usage', value: '85%' },
        dataTitle: 'Quota details',
        dataRows: [
          { label: 'Used', value: '850,000 requests' },
          { label: 'Limit', value: '1,000,000 requests' },
        ],
      };
    case 'usage-cap-hit':
      return {
        title: 'API usage cap reached',
        preview: 'Your Acme API quota is fully consumed for this cycle.',
        greeting: 'Merhaba,',
        body: 'You reached the monthly limit. New requests may be rate-limited until reset.',
        ctaLabel: 'Upgrade API plan',
        ctaUrl: 'https://app.acme.com/billing/plans',
        highlight: { label: 'Quota', value: '100%', large: true },
      };
    case 'quota-reset':
      return {
        title: 'Quota reset complete',
        preview: 'Your API allowance has been refreshed for the new cycle.',
        greeting: 'Merhaba,',
        body: 'Monthly counters are reset and full request capacity is available again.',
        ctaLabel: 'View new quota',
        ctaUrl: 'https://app.acme.com/developers/usage',
      };
    case 'api-key-created':
      return {
        title: 'New API key created',
        preview: 'A new API credential was generated in your workspace.',
        greeting: 'Merhaba,',
        body: 'Store this key securely and restrict it with scopes and IP allowlists.',
        ctaLabel: 'Manage API keys',
        ctaUrl: 'https://app.acme.com/developers/keys',
        dataTitle: 'Key details',
        dataRows: [
          { label: 'Key prefix', value: keyPrefix },
          { label: 'Scopes', value: 'events:read, tasks:write' },
        ],
      };
    case 'api-key-rotated':
      return {
        title: 'API key rotated',
        preview: 'Your previous key was replaced with a new credential.',
        greeting: 'Merhaba,',
        body: 'Rotation completed successfully. Update your backend secrets to the new key.',
        ctaLabel: 'View rotation log',
        ctaUrl: 'https://app.acme.com/developers/keys',
        highlight: { label: 'Old key status', value: 'Expires in 24h' },
      };
    case 'api-key-revoked':
      return {
        title: 'API key revoked',
        preview: 'An API key has been revoked and cannot be used anymore.',
        greeting: 'Merhaba,',
        body: 'Revocation completed. Requests signed with this key now return authorization errors.',
        ctaLabel: 'Create replacement key',
        ctaUrl: 'https://app.acme.com/developers/keys/new',
      };
    case 'rate-limit-hit':
      return {
        title: 'Rate limit reached',
        preview: 'Burst traffic exceeded your allowed requests per minute.',
        greeting: 'Merhaba,',
        body: 'Your integration hit request limits. Add retry with backoff to avoid temporary blocks.',
        ctaLabel: 'See rate limit policy',
        ctaUrl: 'https://app.acme.com/docs/rate-limits',
        highlight: { label: 'Limit', value: '120 req/min' },
      };
    case 'webhook-delivery-failure':
      return {
        title: 'Webhook delivery failed',
        preview: 'Acme could not deliver events to your endpoint.',
        greeting: 'Merhaba,',
        body: 'Multiple webhook retries failed with HTTP 500 responses.',
        ctaLabel: 'Inspect webhook logs',
        ctaUrl: 'https://app.acme.com/developers/webhooks',
        dataTitle: 'Endpoint details',
        dataRows: [
          { label: 'Endpoint', value: webhookUrl },
          { label: 'Last status', value: '500 Internal Server Error', highlight: true },
        ],
      };
    case 'webhook-restored':
      return {
        title: 'Webhook delivery restored',
        preview: 'Event deliveries are healthy again.',
        greeting: 'Merhaba,',
        body: 'Your endpoint is responding correctly and Acme resumed normal webhook delivery.',
        ctaLabel: 'View delivery timeline',
        ctaUrl: 'https://app.acme.com/developers/webhooks',
      };
    default:
      throw new Error(`Unknown usage-api template: ${name}`);
  }
}

function notificationsTemplate(name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  const actor = pick(MOCK_USERS, idx);
  switch (name) {
    case 'mention-tag':
      return {
        title: 'You were mentioned',
        preview: `${actor} mentioned you in #launch-readiness.`,
        greeting: 'Merhaba,',
        body: 'You were tagged in a thread that may need your input.',
        quote: `@you can we finalize the KPI threshold before 17:00?`,
        ctaLabel: 'Open thread',
        ctaUrl: 'https://app.acme.com/action',
      };
    case 'comment-reply':
      return {
        title: 'New reply to your comment',
        preview: 'A teammate replied in the automation review thread.',
        greeting: 'Merhaba,',
        body: 'There is a fresh reply on a comment you are following.',
        quote: `Thanks, updated the webhook payload schema as suggested.`,
        ctaLabel: 'View reply',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'direct-message':
      return {
        title: 'You received a direct message',
        preview: `${actor} sent you a private message in Acme.`,
        greeting: 'Merhaba,',
        body: 'You have a new direct message waiting.',
        quote: `Can we review the Q3 rollout plan after lunch?`,
        ctaLabel: 'Open inbox',
        ctaUrl: 'https://app.acme.com/inbox',
      };
    case 'task-assigned':
      return {
        title: 'Task assigned to you',
        preview: 'You were assigned: Prepare onboarding automation.',
        greeting: 'Merhaba,',
        body: 'A new task is now under your ownership.',
        ctaLabel: 'Open task',
        ctaUrl: DEFAULT_CTA_URL,
        dataTitle: 'Task details',
        dataRows: [
          { label: 'Task', value: 'Prepare onboarding automation', highlight: true },
          { label: 'Due date', value: '10 Jun 2026' },
          { label: 'Priority', value: 'High' },
        ],
      };
    case 'task-due-soon':
      return {
        title: 'Task due soon',
        preview: 'One of your tasks is due in 24 hours.',
        greeting: 'Merhaba,',
        body: 'Friendly reminder to complete the assigned task before the deadline.',
        ctaLabel: 'Review due tasks',
        ctaUrl: DEFAULT_CTA_URL,
        highlight: { label: 'Due in', value: '24 hours' },
      };
    case 'task-overdue':
      return {
        title: 'Task is overdue',
        preview: 'A task assigned to you is past due.',
        greeting: 'Merhaba,',
        body: 'Please update status or complete the task to keep project timelines healthy.',
        ctaLabel: 'Resolve overdue task',
        ctaUrl: DEFAULT_CTA_URL,
        highlight: { label: 'Overdue by', value: `${1 + (idx % 3)} days` },
      };
    case 'approval-requested':
      return {
        title: 'Approval requested',
        preview: `${actor} requested approval on "Billing policy update".`,
        greeting: 'Merhaba,',
        body: 'A document is waiting for your decision.',
        ctaLabel: 'Review request',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'approval-granted-rejected':
      return {
        title: 'Approval status updated',
        preview: 'A pending approval changed status.',
        greeting: 'Merhaba,',
        body: 'The requested approval has been resolved and logged in activity history.',
        ctaLabel: 'View decision log',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'document-shared':
      return {
        title: 'A document was shared with you',
        preview: 'You now have access to "Q3 Customer Health Dashboard".',
        greeting: 'Merhaba,',
        body: 'A teammate shared a document and granted you edit rights.',
        ctaLabel: 'Open document',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'file-uploaded-processed':
      return {
        title: 'File processed successfully',
        preview: 'Uploaded CSV import is complete.',
        greeting: 'Merhaba,',
        body: 'Your upload was parsed and records are now available in Acme.',
        ctaLabel: 'View imported records',
        ctaUrl: DEFAULT_CTA_URL,
        dataTitle: 'Import summary',
        dataRows: [
          { label: 'Rows processed', value: '2,480' },
          { label: 'Errors', value: '3', highlight: true },
        ],
      };
    case 'project-status-change':
      return {
        title: 'Project status changed',
        preview: 'Project "Spring Launch" moved to In Review.',
        greeting: 'Merhaba,',
        body: 'A tracked project changed status and may require follow-up from your team.',
        ctaLabel: 'View project',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'daily-digest':
      return {
        title: 'Your daily digest',
        preview: 'Today in Acme: mentions, task updates, and approvals.',
        greeting: 'Merhaba,',
        body: 'Here is a compact summary of today’s important workspace activity.',
        ctaLabel: 'Open activity feed',
        ctaUrl: DEFAULT_CTA_URL,
        lineItemsTitle: 'Digest highlights',
        lineItems: [
          { name: 'Mentions', detail: 'Across 3 threads', amount: '6' },
          { name: 'Tasks completed', detail: 'By your team', amount: '14' },
          { name: 'Pending approvals', detail: 'Need attention', amount: '2' },
        ],
      };
    case 'weekly-digest':
      return {
        title: 'Your weekly digest',
        preview: 'A full week recap from your Acme workspace.',
        greeting: 'Merhaba,',
        body: 'Weekly snapshot is ready with productivity metrics and unresolved items.',
        ctaLabel: 'See full weekly report',
        ctaUrl: 'https://app.acme.com/reports/weekly',
        lineItemsTitle: 'This week',
        lineItems: [
          { name: 'Workflows run', detail: 'Automation activity', amount: '1,204' },
          { name: 'Resolved tasks', detail: 'Team output', amount: '89' },
          { name: 'Open blockers', detail: 'Needs owner', amount: '5' },
        ],
      };
    case 'custom-reminder':
      return {
        title: 'Custom reminder',
        preview: 'Reminder: finalize partner dashboard by 16:00.',
        greeting: 'Merhaba,',
        body: 'This is your scheduled reminder from Acme.',
        ctaLabel: 'Open reminder context',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'realtime-alert':
      return {
        title: 'Real-time alert triggered',
        preview: 'Pipeline error rate crossed the critical threshold.',
        greeting: 'Merhaba,',
        body: 'A configured real-time alert was triggered and sent to subscribers.',
        ctaLabel: 'Inspect alert details',
        ctaUrl: 'https://app.acme.com/alerts',
        highlight: { label: 'Current error rate', value: '4.8%', large: true },
      };
    default:
      throw new Error(`Unknown notifications template: ${name}`);
  }
}

function teamTemplate(name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  const workspace = pick(MOCK_WORKSPACES, idx);
  const inviter = pick(MOCK_USERS, idx + 2);
  switch (name) {
    case 'team-invitation':
      return {
        title: `You are invited to ${workspace}`,
        preview: `${inviter} invited you to collaborate in Acme.`,
        greeting: 'Merhaba,',
        body: `${inviter} invited you to join the "${workspace}" workspace as Editor.`,
        ctaLabel: 'Accept invitation',
        ctaUrl: DEFAULT_CTA_URL,
        dataTitle: 'Invitation details',
        dataRows: [
          { label: 'Workspace', value: workspace, highlight: true },
          { label: 'Role', value: 'Editor' },
          { label: 'Invited by', value: inviter },
        ],
      };
    case 'invitation-accepted-admin':
      return {
        title: 'Invitation accepted',
        preview: 'A teammate accepted your Acme invitation.',
        greeting: 'Merhaba,',
        body: 'Your invitation was accepted and the member now has workspace access.',
        ctaLabel: 'Review team members',
        ctaUrl: 'https://app.acme.com/team',
      };
    case 'invitation-declined':
      return {
        title: 'Invitation declined',
        preview: 'An invitee declined your workspace invitation.',
        greeting: 'Merhaba,',
        body: 'The invitation was declined. You can resend later with a different role if needed.',
        ctaLabel: 'Manage invitations',
        ctaUrl: 'https://app.acme.com/team/invitations',
      };
    case 'invitation-reminder':
      return {
        title: 'Invitation reminder sent',
        preview: 'A reminder was sent for a pending team invite.',
        greeting: 'Merhaba,',
        body: 'We sent a friendly reminder so your teammate can join the workspace.',
        ctaLabel: 'View pending invites',
        ctaUrl: 'https://app.acme.com/team/invitations',
      };
    case 'invitation-expired':
      return {
        title: 'Team invitation expired',
        preview: 'A pending invitation reached its expiry date.',
        greeting: 'Merhaba,',
        body: 'The invitation expired after 7 days. Create a new invite to continue.',
        ctaLabel: 'Send new invitation',
        ctaUrl: 'https://app.acme.com/team/invitations/new',
      };
    case 'member-joined':
      return {
        title: 'New member joined workspace',
        preview: `${pick(MOCK_USERS, idx + 1)} joined ${workspace}.`,
        greeting: 'Merhaba,',
        body: 'A new member joined your workspace and can now collaborate on shared projects.',
        ctaLabel: 'Open team directory',
        ctaUrl: 'https://app.acme.com/team',
      };
    case 'member-left':
      return {
        title: 'Member left workspace',
        preview: 'A team member left your Acme workspace.',
        greeting: 'Merhaba,',
        body: 'A member account was removed from active roster by their own action.',
        ctaLabel: 'Review access',
        ctaUrl: 'https://app.acme.com/team',
      };
    case 'member-removed':
      return {
        title: 'Member removed',
        preview: 'A member was removed by workspace admin.',
        greeting: 'Merhaba,',
        body: 'Admin action removed a user from workspace resources and channels.',
        ctaLabel: 'Audit member actions',
        ctaUrl: 'https://app.acme.com/audit-log',
      };
    case 'role-changed':
      return {
        title: 'Role updated',
        preview: 'A team member role changed in Acme.',
        greeting: 'Merhaba,',
        body: 'Permissions were updated and the member now has adjusted workspace access.',
        ctaLabel: 'View role matrix',
        ctaUrl: 'https://app.acme.com/team/roles',
        dataTitle: 'Role change',
        dataRows: [
          { label: 'Previous role', value: 'Editor' },
          { label: 'New role', value: 'Admin', highlight: true },
        ],
      };
    case 'workspace-ownership-transferred':
      return {
        title: 'Workspace ownership transferred',
        preview: 'Ownership moved to a new primary admin.',
        greeting: 'Merhaba,',
        body: 'Ownership transfer is complete and billing authority moved to the new owner.',
        ctaLabel: 'Review owner settings',
        ctaUrl: 'https://app.acme.com/settings/workspace',
      };
    case 'workspace-deleted':
      return {
        title: 'Workspace deleted',
        preview: `${workspace} was deleted from Acme.`,
        greeting: 'Merhaba,',
        body: 'The workspace was deleted and all members lost access immediately.',
        notice: 'Deletion is permanent after retention grace period.',
      };
    case 'guest-access-granted':
      return {
        title: 'Guest access granted',
        preview: 'A guest user now has limited access to your workspace.',
        greeting: 'Merhaba,',
        body: 'Guest access was enabled with read-only permissions for selected projects.',
        ctaLabel: 'Review guest permissions',
        ctaUrl: 'https://app.acme.com/team/guests',
      };
    default:
      throw new Error(`Unknown team template: ${name}`);
  }
}

function integrationsTemplate(name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  const integration = ['Slack', 'HubSpot', 'GitHub', 'Salesforce'][idx % 4];
  switch (name) {
    case 'integration-connected':
      return {
        title: `${integration} connected`,
        preview: `${integration} is now connected to your Acme workspace.`,
        greeting: 'Merhaba,',
        body: 'Connection succeeded and data syncing is active.',
        ctaLabel: 'Manage integrations',
        ctaUrl: 'https://app.acme.com/integrations',
      };
    case 'integration-disconnected':
      return {
        title: `${integration} disconnected`,
        preview: `${integration} was disconnected from Acme.`,
        greeting: 'Merhaba,',
        body: 'The integration was disconnected and related automations may pause.',
        ctaLabel: 'Reconnect integration',
        ctaUrl: 'https://app.acme.com/integrations',
      };
    case 'integration-failed':
      return {
        title: `${integration} connection failed`,
        preview: 'Acme could not establish integration authorization.',
        greeting: 'Merhaba,',
        body: 'Initial connection failed due to invalid token scope.',
        ctaLabel: 'Retry connection',
        ctaUrl: 'https://app.acme.com/integrations',
        notice: 'Check OAuth scopes and admin permissions before retry.',
      };
    case 'oauth-app-authorized':
      return {
        title: 'OAuth app authorized',
        preview: 'A third-party app received access to your Acme data.',
        greeting: 'Merhaba,',
        body: 'Authorization completed. You can revoke access anytime from security settings.',
        ctaLabel: 'Review app permissions',
        ctaUrl: 'https://app.acme.com/settings/oauth-apps',
      };
    case 'oauth-app-revoked':
      return {
        title: 'OAuth app access revoked',
        preview: 'Third-party app access was removed.',
        greeting: 'Merhaba,',
        body: 'The app can no longer access your Acme workspace data.',
        ctaLabel: 'Manage connected apps',
        ctaUrl: 'https://app.acme.com/settings/oauth-apps',
      };
    case 'sync-completed':
      return {
        title: 'Integration sync completed',
        preview: 'Latest sync finished with no blocking errors.',
        greeting: 'Merhaba,',
        body: 'Data sync completed and records are now up to date.',
        ctaLabel: 'View sync log',
        ctaUrl: 'https://app.acme.com/integrations/logs',
        dataTitle: 'Sync results',
        dataRows: [
          { label: 'Records imported', value: '1,942' },
          { label: 'Warnings', value: '4' },
        ],
      };
    case 'sync-failed':
      return {
        title: 'Integration sync failed',
        preview: 'Acme could not complete the scheduled sync run.',
        greeting: 'Merhaba,',
        body: 'Sync failed due to authentication expiry. Reconnect to resume imports.',
        ctaLabel: 'Fix integration',
        ctaUrl: 'https://app.acme.com/integrations',
      };
    default:
      throw new Error(`Unknown integrations template: ${name}`);
  }
}

function productPlatformTemplate(name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  switch (name) {
    case 'changelog-digest':
      return {
        title: 'Acme changelog digest',
        preview: 'New features and fixes shipped this week.',
        greeting: 'Merhaba,',
        body: 'Here is your curated release digest from the Acme product team.',
        ctaLabel: 'Read full changelog',
        ctaUrl: 'https://app.acme.com/changelog',
        lineItemsTitle: 'Latest updates',
        lineItems: [
          { name: 'Workflow templates', detail: '12 new templates added', amount: 'New' },
          { name: 'Audit export', detail: 'CSV export now supports filters', amount: 'Improved' },
          { name: 'Mobile notifications', detail: 'Push reliability increased', amount: 'Fixed' },
        ],
      };
    case 'feature-announcement':
      return {
        title: 'New feature: Scenario Simulator',
        preview: 'Model workflow outcomes before going live.',
        greeting: 'Merhaba,',
        body: 'Scenario Simulator lets your team test automation outcomes safely in draft mode.',
        ctaLabel: 'Try new feature',
        ctaUrl: DEFAULT_CTA_URL,
      };
    case 'beta-access-invitation':
      return {
        title: 'You are invited to Acme beta',
        preview: 'Early access: AI workflow suggestions.',
        greeting: 'Merhaba,',
        body: 'Your workspace is selected for beta access. Share feedback directly with the product team.',
        ctaLabel: 'Enable beta feature',
        ctaUrl: DEFAULT_CTA_URL,
        notice: 'Beta features may change before general release.',
      };
    case 'maintenance-scheduled':
      return {
        title: 'Scheduled maintenance notice',
        preview: 'Acme maintenance window is planned for Sunday.',
        greeting: 'Merhaba,',
        body: 'We scheduled platform maintenance to improve reliability and query performance.',
        ctaLabel: 'View maintenance details',
        ctaUrl: 'https://status.acme.com',
        highlight: { label: 'Window', value: '09 Jun 2026, 02:00-03:00 TRT' },
      };
    case 'maintenance-starting':
      return {
        title: 'Maintenance starting now',
        preview: 'Acme is entering planned maintenance mode.',
        greeting: 'Merhaba,',
        body: 'Maintenance has started. Some write operations may be delayed temporarily.',
        ctaLabel: 'Track status',
        ctaUrl: 'https://status.acme.com',
      };
    case 'maintenance-completed':
      return {
        title: 'Maintenance completed',
        preview: 'All Acme services are fully operational again.',
        greeting: 'Merhaba,',
        body: 'Scheduled maintenance completed successfully and normal performance is restored.',
        ctaLabel: 'See incident timeline',
        ctaUrl: 'https://status.acme.com',
      };
    case 'incident-notification':
      return {
        title: 'Incident detected',
        preview: 'We identified elevated latency on API requests.',
        greeting: 'Merhaba,',
        body: 'Our team is actively investigating an incident impacting part of the platform.',
        ctaLabel: 'Follow live updates',
        ctaUrl: 'https://status.acme.com',
        highlight: { label: 'Current impact', value: 'Partial API degradation' },
      };
    case 'incident-resolved':
      return {
        title: 'Incident resolved',
        preview: 'Service health is back to normal.',
        greeting: 'Merhaba,',
        body: 'The previously reported incident is resolved and systems are stable.',
        ctaLabel: 'Read resolution notes',
        ctaUrl: 'https://status.acme.com',
      };
    case 'post-incident-report':
      return {
        title: 'Post-incident report available',
        preview: 'Root cause analysis and action items are published.',
        greeting: 'Merhaba,',
        body: 'We published a detailed report including timeline, root cause, and prevention steps.',
        ctaLabel: 'Read full report',
        ctaUrl: 'https://status.acme.com/reports',
      };
    case 'security-advisory':
      return {
        title: 'Security advisory',
        preview: 'Acme released a security patch and guidance.',
        greeting: 'Merhaba,',
        body: 'A vulnerability was mitigated. Please review recommended tenant configuration updates.',
        ctaLabel: 'Review advisory',
        ctaUrl: 'https://app.acme.com/security/advisories',
      };
    case 'terms-privacy-update':
      return {
        title: 'Terms and privacy update',
        preview: 'Important policy updates effective next month.',
        greeting: 'Merhaba,',
        body: 'We updated our Terms and Privacy documents to clarify data retention and subprocessors.',
        ctaLabel: 'Read policy updates',
        ctaUrl: 'https://app.acme.com/legal',
      };
    case 'service-deprecation':
      return {
        title: 'Service deprecation notice',
        preview: 'Legacy webhook v1 will be retired.',
        greeting: 'Merhaba,',
        body: 'Webhook API v1 will be deprecated on 30 Sep 2026. Please migrate to v2 endpoints.',
        ctaLabel: 'See migration guide',
        ctaUrl: 'https://app.acme.com/docs/migrations/webhook-v2',
        notice: 'Migrate before deadline to prevent delivery interruptions.',
      };
    default:
      throw new Error(`Unknown product-platform template: ${name}`);
  }
}

function supportFeedbackTemplate(name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  const ticket = `ACM-${3400 + idx}`;
  switch (name) {
    case 'support-ticket-created':
      return {
        title: 'Support ticket created',
        preview: `Your request ${ticket} is received by Acme support.`,
        greeting: 'Merhaba,',
        body: 'We got your request and assigned it to our support queue.',
        ctaLabel: 'View ticket',
        ctaUrl: 'https://app.acme.com/support/tickets',
        dataTitle: 'Ticket details',
        dataRows: [
          { label: 'Ticket ID', value: ticket, highlight: true },
          { label: 'Priority', value: 'Normal' },
        ],
      };
    case 'support-ticket-replied':
      return {
        title: 'Support replied to your ticket',
        preview: `A new reply is available on ${ticket}.`,
        greeting: 'Merhaba,',
        body: 'Our support team posted an update and may need your confirmation.',
        ctaLabel: 'Read reply',
        ctaUrl: 'https://app.acme.com/support/tickets',
      };
    case 'support-ticket-resolved':
      return {
        title: 'Support ticket resolved',
        preview: `${ticket} is marked resolved.`,
        greeting: 'Merhaba,',
        body: 'We marked your ticket as resolved. Reopen anytime if the issue persists.',
        ctaLabel: 'Review resolution',
        ctaUrl: 'https://app.acme.com/support/tickets',
      };
    case 'nps-survey':
      return {
        title: 'How likely are you to recommend Acme?',
        preview: 'Quick NPS survey (10 seconds).',
        greeting: 'Merhaba,',
        body: 'Your feedback helps us prioritize product and support improvements.',
        ctaLabel: 'Answer NPS survey',
        ctaUrl: 'https://app.acme.com/surveys/nps',
      };
    case 'csat-survey':
      return {
        title: 'Rate your support experience',
        preview: 'Tell us how helpful the latest support interaction was.',
        greeting: 'Merhaba,',
        body: 'We read every CSAT response and use it to coach support quality.',
        ctaLabel: 'Submit CSAT',
        ctaUrl: 'https://app.acme.com/surveys/csat',
      };
    case 'feature-request-acknowledged':
      return {
        title: 'Feature request received',
        preview: 'Thanks for sharing your idea with Acme.',
        greeting: 'Merhaba,',
        body: 'Your feature request is logged and visible to the product team roadmap process.',
        ctaLabel: 'Track request status',
        ctaUrl: 'https://app.acme.com/feedback/requests',
      };
    case 'bug-report-acknowledged':
      return {
        title: 'Bug report acknowledged',
        preview: 'Our engineers are reviewing your reported issue.',
        greeting: 'Merhaba,',
        body: 'Thanks for reporting this bug. We added it to our triage queue with priority.',
        ctaLabel: 'View bug report',
        ctaUrl: 'https://app.acme.com/feedback/bugs',
      };
    case 'review-request':
      return {
        title: 'Would you leave a quick review?',
        preview: 'If Acme helps your team, your review means a lot.',
        greeting: 'Merhaba,',
        body: 'A short public review helps other teams discover Acme and helps us grow responsibly.',
        ctaLabel: 'Write a review',
        ctaUrl: 'https://app.acme.com/review',
      };
    default:
      throw new Error(`Unknown support-feedback template: ${name}`);
  }
}

function commerceTemplate(name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  switch (name) {
    case 'license-key-delivered':
      return {
        title: 'Your license key is ready',
        preview: 'Acme license key delivered securely.',
        greeting: 'Merhaba,',
        body: 'Your purchased license key is now available in your account portal.',
        ctaLabel: 'View license key',
        ctaUrl: 'https://app.acme.com/licenses',
        highlight: { label: 'License', value: `ACME-${9000 + idx}-PRO`, large: true },
      };
    case 'subscription-gift-sent':
      return {
        title: 'Gift subscription sent',
        preview: 'Your Acme gift subscription was emailed successfully.',
        greeting: 'Merhaba,',
        body: 'Your gift has been sent with redemption instructions to the recipient.',
        ctaLabel: 'View gift status',
        ctaUrl: 'https://app.acme.com/commerce/gifts',
      };
    case 'subscription-gift-received':
      return {
        title: 'You received an Acme gift subscription',
        preview: 'A gift plan is waiting for activation.',
        greeting: 'Merhaba,',
        body: 'Good news: you received a 3-month Acme Pro gift subscription.',
        ctaLabel: 'Redeem gift',
        ctaUrl: 'https://app.acme.com/commerce/redeem',
      };
    case 'referral-signed-up':
      return {
        title: 'Your referral signed up',
        preview: 'A referred user created an Acme account.',
        greeting: 'Merhaba,',
        body: 'Your referral link brought a new signup. You are one step closer to referral rewards.',
        ctaLabel: 'View referral dashboard',
        ctaUrl: 'https://app.acme.com/commerce/referrals',
      };
    case 'referral-converted':
      return {
        title: 'Referral converted to paid',
        preview: 'You earned referral credit from a paid conversion.',
        greeting: 'Merhaba,',
        body: 'One referred account upgraded to paid. Reward credits are now added to your wallet.',
        ctaLabel: 'See earned rewards',
        ctaUrl: 'https://app.acme.com/commerce/referrals',
        highlight: { label: 'Reward earned', value: '$50 credit' },
      };
    case 'affiliate-payout':
      return {
        title: 'Affiliate payout processed',
        preview: 'Your monthly affiliate payout is on the way.',
        greeting: 'Merhaba,',
        body: 'Affiliate payout is approved and queued to your payout method.',
        ctaLabel: 'View payout statement',
        ctaUrl: 'https://app.acme.com/commerce/affiliates',
        totals: [
          { label: 'Eligible commissions', value: usd(420) },
          { label: 'Payout fee', value: usd(5) },
          { label: 'Net payout', value: usd(415), emphasis: true },
        ],
      };
    case 'credits-added':
      return {
        title: 'Credits added to your account',
        preview: 'Acme credits are now available for future invoices.',
        greeting: 'Merhaba,',
        body: 'Credits were added and will automatically apply to upcoming billing cycles.',
        ctaLabel: 'Open credit balance',
        ctaUrl: 'https://app.acme.com/billing/credits',
        highlight: { label: 'New credit balance', value: '$120.00' },
      };
    case 'credits-expiring':
      return {
        title: 'Credits expiring soon',
        preview: 'Some of your Acme credits expire this month.',
        greeting: 'Merhaba,',
        body: 'Use your credits before expiry so you do not lose value.',
        ctaLabel: 'Review expiring credits',
        ctaUrl: 'https://app.acme.com/billing/credits',
        highlight: { label: 'Expiring amount', value: '$35.00' },
      };
    default:
      throw new Error(`Unknown commerce template: ${name}`);
  }
}

function createTemplateDef(category: string, name: string, idx: number): Omit<TemplateDef, 'category' | 'name'> {
  switch (category) {
    case 'auth-security':
      return authTemplate(name, idx);
    case 'account-lifecycle':
      return accountLifecycleTemplate(name, idx);
    case 'onboarding':
      return onboardingTemplate(name, idx);
    case 'billing':
      return billingTemplate(name, idx);
    case 'usage-api':
      return usageApiTemplate(name, idx);
    case 'notifications':
      return notificationsTemplate(name, idx);
    case 'team':
      return teamTemplate(name, idx);
    case 'integrations':
      return integrationsTemplate(name, idx);
    case 'product-platform':
      return productPlatformTemplate(name, idx);
    case 'support-feedback':
      return supportFeedbackTemplate(name, idx);
    case 'commerce':
      return commerceTemplate(name, idx);
    default:
      throw new Error(`Unknown category: ${category}`);
  }
}

export const SENSEI_TEMPLATES: TemplateDef[] = getSenseiContractEntries().map(({ category, name }, idx) => ({
  category,
  name,
  ...createTemplateDef(category, name, idx),
}));

if (SENSEI_TEMPLATES.length !== 137) {
  throw new Error(`Expected 137 templates, got ${SENSEI_TEMPLATES.length}`);
}
