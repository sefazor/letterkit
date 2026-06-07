'use client';

import { buildTemplatesInstallCommand, buildThemeInstallCommand } from '@/lib/install-commands';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NpxCommand } from './npx-command';
import type { StudioTemplateRef } from './studio-context';

const ANIMATION_MS = 200;

interface InstallDialogProps {
  open: boolean;
  onClose: () => void;
  themeId: string;
  themeName: string;
  selectedTemplates: StudioTemplateRef[];
  currentTemplate?: StudioTemplateRef | null;
}

export function InstallDialog({
  open,
  onClose,
  themeId,
  themeName,
  selectedTemplates,
  currentTemplate,
}: InstallDialogProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), ANIMATION_MS);
      return () => clearTimeout(timer);
    }

    setMounted(true);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  const templates =
    selectedTemplates.length > 0 ? selectedTemplates : currentTemplate ? [currentTemplate] : [];

  const runCommand =
    buildTemplatesInstallCommand(themeId, templates) ?? buildThemeInstallCommand(themeId);

  const title =
    templates.length === 0
      ? `Install ${themeName}`
      : templates.length === 1
        ? 'Install template'
        : `Install ${templates.length} templates`;

  const description =
    templates.length === 0
      ? 'No selection — installs the full theme.'
      : templates.length === 1
        ? `${templates[0]?.category}/${templates[0]?.name}`
        : `Selected from ${themeName}`;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 transition-opacity ease-out',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      style={{ transitionDuration: `${ANIMATION_MS}ms` }}
    >
      <div
        className={cn(
          'w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-background transition-all ease-out',
          visible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
        )}
        style={{ transitionDuration: `${ANIMATION_MS}ms` }}
        aria-labelledby="install-dialog-title"
      >
        <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-5">
          <div className="min-w-0">
            <h2 id="install-dialog-title" className="text-base font-semibold">
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          {templates.length > 1 ? (
            <ul className="max-h-36 space-y-1 overflow-y-auto rounded-xl border border-border bg-muted/20 px-3 py-2 font-mono text-xs text-muted-foreground">
              {templates.map((template) => (
                <li key={`${template.category}/${template.name}`}>
                  {template.category}/{template.name}
                </li>
              ))}
            </ul>
          ) : null}

          <NpxCommand label="Run" command={runCommand} />
        </div>
      </div>
    </div>
  );
}
