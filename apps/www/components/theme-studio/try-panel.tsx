'use client';

import { ChevronDown, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { getDesignTokenValues } from '@/lib/design-token-fields';
import { cn } from '@/lib/utils';
import { PropsTryForm } from './props-try-form';
import { useStudio } from './studio-context';

const PANEL_WIDTH = '26rem';
const ANIMATION_MS = 250;
const ACCORDION_MS = 250;

type TrySection = 'content' | 'layout' | 'design';

interface TryPanelProps {
  open: boolean;
}

function TryAccordionSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform ease-out',
            open && 'rotate-180',
          )}
          style={{ transitionDuration: `${ACCORDION_MS}ms` }}
        />
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
        style={{ transitionDuration: `${ACCORDION_MS}ms` }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function TryPanel({ open }: TryPanelProps) {
  const {
    template,
    setView,
    brandValues,
    setBrandValues,
    tokenValues,
    setTokenValues,
    contentValues,
    setContentValues,
    rendering,
    propsError,
  } = useStudio();

  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<TrySection | null>('content');

  useEffect(() => {
    if (!open) {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), ANIMATION_MS);
      return () => clearTimeout(timer);
    }

    if (!template) return;

    setMounted(true);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });

    return () => cancelAnimationFrame(frame);
  }, [open, template]);

  function selectSection(section: TrySection) {
    setActiveSection((prev) => (prev === section ? null : section));
  }

  if (!mounted || !template) return null;

  const designValues = getDesignTokenValues(tokenValues);

  return (
    <div
      className={cn(
        'h-full shrink-0 overflow-hidden transition-[width] ease-out',
        visible ? 'w-[26rem]' : 'w-0',
      )}
      style={{ transitionDuration: `${ANIMATION_MS}ms` }}
    >
      <aside
        className={cn(
          'flex h-full min-h-0 flex-col border-l border-border bg-background transition-opacity ease-out',
          visible ? 'opacity-100' : 'opacity-0',
        )}
        style={{ width: PANEL_WIDTH, transitionDuration: `${ANIMATION_MS}ms` }}
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4">
          <span className="text-sm font-medium text-muted-foreground">
            {rendering ? 'Updating…' : 'Try'}
          </span>
          <button
            type="button"
            onClick={() => setView('preview')}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close Try panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <TryAccordionSection
            title="Content"
            open={activeSection === 'content'}
            onToggle={() => selectSection('content')}
          >
            <PropsTryForm columns={2} values={contentValues} onChange={setContentValues} />
          </TryAccordionSection>

          <TryAccordionSection
            title="Layout"
            open={activeSection === 'layout'}
            onToggle={() => selectSection('layout')}
          >
            <PropsTryForm columns={2} values={brandValues} onChange={setBrandValues} />
          </TryAccordionSection>

          <TryAccordionSection
            title="Design"
            open={activeSection === 'design'}
            onToggle={() => selectSection('design')}
          >
            <PropsTryForm
              variant="colors"
              values={designValues}
              onChange={(next) => setTokenValues({ ...tokenValues, ...next })}
            />
          </TryAccordionSection>
        </div>

        {propsError ? (
          <p className="border-t border-border px-4 py-2 text-sm text-red-500">{propsError}</p>
        ) : null}
      </aside>
    </div>
  );
}
