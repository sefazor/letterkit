'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Theme } from '@letterkit/registry';
import Link from 'next/link';
import { useState } from 'react';
import { InstallDialog } from './install-dialog';
import { SendDialog } from './send-dialog';
import { type StudioView, useStudio } from './studio-context';
import { StudioTabs } from './studio-tabs';
import { ThemeSwitcher } from './theme-switcher';

interface ThemeStudioHeaderProps {
  theme: Theme;
  themes: Theme[];
  templateCount: number;
}

const TABS: { id: StudioView; label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'props', label: 'Props' },
  { id: 'try', label: 'Try' },
];

export function ThemeStudioHeader({ theme, themes, templateCount }: ThemeStudioHeaderProps) {
  const { view, setView, template, selectedTemplates } = useStudio();
  const [sendOpen, setSendOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);

  function handleTabChange(tab: StudioView) {
    if (tab === 'try' && view === 'try') {
      setView('preview');
      return;
    }
    setView(tab);
  }

  return (
    <>
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <Link
            href="/"
            className="shrink-0 font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            letterkit
          </Link>
          <span className="text-muted-foreground">/</span>
          <ThemeSwitcher theme={theme} themes={themes} />
          {template ? (
            <>
              <span className="text-muted-foreground">/</span>
              <span className="truncate font-medium">{template.name}</span>
            </>
          ) : (
            <span className="text-muted-foreground">· {templateCount}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {template ? <StudioTabs tabs={TABS} view={view} onChange={handleTabChange} /> : null}

          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-md px-3 text-sm"
            onClick={() => setInstallOpen(true)}
          >
            Install
            {selectedTemplates.length > 0 ? (
              <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-xs tabular-nums text-muted-foreground">
                {selectedTemplates.length}
              </span>
            ) : null}
          </Button>

          {template ? (
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-md px-3 text-sm"
              onClick={() => setSendOpen(true)}
            >
              Send
            </Button>
          ) : null}

          <Link
            href="/themes"
            className={cn('text-sm text-muted-foreground transition-colors hover:text-foreground')}
          >
            Themes
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <InstallDialog
        open={installOpen}
        onClose={() => setInstallOpen(false)}
        themeId={theme.id}
        themeName={theme.name}
        selectedTemplates={selectedTemplates}
        currentTemplate={template ? { category: template.category, name: template.name } : null}
      />

      <SendDialog
        open={sendOpen}
        onClose={() => setSendOpen(false)}
        templateName={template?.name}
      />
    </>
  );
}
