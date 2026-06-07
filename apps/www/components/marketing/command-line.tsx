'use client';

import { CopyButton } from '@/components/theme-studio/copy-button';
import { cn } from '@/lib/utils';

interface CommandLineProps {
  command: string;
  comment?: string;
  stacked?: boolean;
  className?: string;
}

export function CommandLine({ command, comment, stacked = false, className }: CommandLineProps) {
  if (stacked) {
    return (
      <div className={cn('rounded-2xl border border-border bg-card px-5 py-4', className)}>
        <div className="mb-3 flex items-start justify-between gap-4">
          {comment ? <p className="text-sm text-muted-foreground">{comment}</p> : <span />}
          <CopyButton text={command} label="Copy" className="h-8 shrink-0" />
        </div>
        <p className="break-all font-mono text-sm leading-relaxed">
          <span className="text-muted-foreground">$</span> {command}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4',
        className,
      )}
    >
      <div className="min-w-0">
        {comment ? <p className="mb-1.5 text-sm text-muted-foreground">{comment}</p> : null}
        <p className="font-mono text-sm">
          <span className="text-muted-foreground">$</span> {command}
        </p>
      </div>
      <CopyButton text={command} label="Copy" className="h-8 shrink-0" />
    </div>
  );
}
