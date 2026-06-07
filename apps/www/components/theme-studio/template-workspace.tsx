'use client';

import { EmailPreviewSkeleton } from '@/components/skeletons/email-preview-skeleton';
import type { Block } from '@letterkit/registry';
import type { ReactNode } from 'react';
import { CodePanel } from './code-panel';
import { CopyButton } from './copy-button';
import { EmailPreviewFrame } from './email-preview-frame';
import { useStudio } from './studio-context';
import { studioCodeBlock, studioSectionLabel } from './studio-styles';

interface TemplateWorkspaceProps {
  name: string;
  block: Block;
  themeBrand?: Record<string, unknown>;
  themeTokens?: Record<string, unknown>;
  html: string;
  source: string;
}

function PropsPanel({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-0 flex-1 overflow-auto p-4">
      <div className="mx-auto w-full max-w-3xl space-y-6">{children}</div>
    </div>
  );
}

function PropsSection({ title, data }: { title: string; data: unknown }) {
  const json = JSON.stringify(data, null, 2);

  return (
    <section>
      <div className="mb-2 flex items-center justify-between gap-4">
        <h3 className={studioSectionLabel}>{title}</h3>
        <CopyButton text={json} label="Copy" className="h-7 px-2 text-xs" />
      </div>
      <pre className={studioCodeBlock}>
        <code>{json}</code>
      </pre>
    </section>
  );
}

export function TemplateWorkspace({
  name,
  block,
  themeBrand,
  themeTokens,
  html,
  source,
}: TemplateWorkspaceProps) {
  const { view, liveHtml, tokenValues, rendering } = useStudio();

  if (view === 'preview' || view === 'try') {
    const previewHtml = view === 'try' ? liveHtml || html : html;
    const pageColor =
      view === 'try' && typeof tokenValues.page === 'string'
        ? tokenValues.page
        : typeof themeTokens?.page === 'string'
          ? themeTokens.page
          : undefined;

    if (view === 'try' && rendering) {
      return <EmailPreviewSkeleton pageColor={pageColor} />;
    }

    return <EmailPreviewFrame html={previewHtml} title={`${name} preview`} pageColor={pageColor} />;
  }

  if (view === 'code') {
    return <CodePanel source={source} />;
  }

  if (view === 'props') {
    return (
      <PropsPanel>
        {themeTokens ? <PropsSection title="Design" data={themeTokens} /> : null}
        {themeBrand ? <PropsSection title="Layout" data={themeBrand} /> : null}
        <PropsSection title="Content" data={block.previewProps} />
      </PropsPanel>
    );
  }

  return null;
}
