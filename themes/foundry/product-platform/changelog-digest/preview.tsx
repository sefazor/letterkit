export const previewProps = {
  issueNumber: 14,
  issueDate: '2026-06-01',
  headline: 'Smart tasks, faster exports, and a calmer inbox.',
  intro:
    'This issue covers what shipped in May — workflow automation, audit tooling, and notification controls built for teams that ship weekly.',
  items: [
    {
      category: 'Smart tasks',
      title: 'Rules that run when you are offline',
      description:
        'Create triggers from any view. Mention @billing in a note and Foundry routes it to the right queue without another tab open.',
      linkLabel: 'Read the changelog',
      linkUrl: 'https://app.acme.com/changelog/smart-tasks',
    },
    {
      category: 'Audit export',
      title: 'One-click compliance bundles',
      description:
        'Export signed activity logs as CSV or JSON. Retention windows now respect workspace policy out of the box.',
      linkLabel: 'View export docs',
      linkUrl: 'https://docs.acme.com/audit-export',
    },
    {
      category: 'Notifications',
      title: 'Quiet hours that actually stick',
      description:
        'Mobile push respects focus schedules across time zones. Digest emails roll up at 9am local, not server time.',
    },
  ],
  next: {
    eyebrow: 'Next',
    title: 'June roadmap office hours',
    ctaLabel: 'Reserve a seat',
    ctaUrl: 'https://app.acme.com/events/june-roadmap',
  },
  recipientEmail: 'ece@company.com',
  readOnWebUrl: 'https://acme.com/changelog/issue-14',
};
