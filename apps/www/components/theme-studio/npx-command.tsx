'use client';

import { CopyButton } from './copy-button';

interface NpxCommandProps {
  label: string;
  command: string;
}

export function NpxCommand({ label, command }: NpxCommandProps) {
  return (
    <div className="rounded-2xl border border-border bg-card px-4 py-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <CopyButton text={command} label="Copy" className="h-7 px-2 text-xs" />
      </div>
      <code className="block break-all font-mono text-sm leading-relaxed">{command}</code>
    </div>
  );
}
