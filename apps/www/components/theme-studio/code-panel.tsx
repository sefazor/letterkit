'use client';

import { CopyButton } from './copy-button';
import { NpxCommand } from './npx-command';
import { useStudio } from './studio-context';
import { studioCodeBlock, studioSectionLabel } from './studio-styles';

interface CodePanelProps {
  source: string;
}

export function CodePanel({ source }: CodePanelProps) {
  const { template } = useStudio();

  const templateCommand = template
    ? `npx letterkit add ${template.themeId}/${template.category}/${template.name}`
    : null;

  return (
    <div className="min-h-0 flex-1 overflow-auto p-4">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        {templateCommand ? (
          <section className="space-y-2">
            <h3 className={studioSectionLabel}>Install</h3>
            <NpxCommand label="Template" command={templateCommand} />
          </section>
        ) : null}

        <section>
          <div className="mb-2 flex items-center justify-between gap-4">
            <h3 className={studioSectionLabel}>Source</h3>
            <CopyButton text={source} label="Copy" className="h-7 px-2 text-xs" />
          </div>
          <pre className={studioCodeBlock}>
            <code>{source}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
