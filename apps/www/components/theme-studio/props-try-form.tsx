'use client';

import { useEffect, useState } from 'react';
import { isColorTokenKey } from '@/lib/design-token-fields';
import { formatPropLabel, isPrimitiveProp } from '@/lib/prop-label';
import { cn } from '@/lib/utils';
import { studioInput, studioSectionLabel } from './studio-styles';

interface PropsTryFormProps {
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
  columns?: 1 | 2;
  variant?: 'default' | 'colors';
}

const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;

function normalizeHex(value: string): string {
  return HEX_PATTERN.test(value) ? value : '#000000';
}

function ColorTokenField({
  propKey,
  label,
  value,
  onChange,
  fieldClass,
}: {
  propKey: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  fieldClass?: string;
}) {
  const [draft, setDraft] = useState(value);
  const displayHex = HEX_PATTERN.test(draft) ? draft.toUpperCase() : draft;

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <div
      className={cn(
        'group -mx-2 flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-muted/50',
        fieldClass,
      )}
    >
      <span className="w-[4.75rem] shrink-0 truncate text-[11px] leading-none text-muted-foreground">
        {label}
      </span>

      <label
        htmlFor={`${propKey}-picker`}
        className="relative h-4 w-4 shrink-0 cursor-pointer overflow-hidden rounded-[3px] border border-border"
        style={{ backgroundColor: normalizeHex(draft) }}
      >
        <input
          id={`${propKey}-picker`}
          type="color"
          value={normalizeHex(draft)}
          onChange={(event) => {
            const next = event.target.value.toUpperCase();
            setDraft(next);
            onChange(next);
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>

      <input
        id={propKey}
        type="text"
        value={displayHex}
        onChange={(event) => {
          const next = event.target.value;
          setDraft(next);
          if (HEX_PATTERN.test(next)) {
            onChange(next.toUpperCase());
          }
        }}
        onBlur={() => {
          if (!HEX_PATTERN.test(draft)) {
            setDraft(value);
          }
        }}
        spellCheck={false}
        className="min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-[11px] uppercase tracking-wide text-foreground outline-none"
      />
    </div>
  );
}

function PropField({
  propKey,
  value,
  onChange,
  fullWidth = false,
  variant = 'default',
}: {
  propKey: string;
  value: unknown;
  onChange: (value: unknown) => void;
  fullWidth?: boolean;
  variant?: 'default' | 'colors';
}) {
  const label = formatPropLabel(propKey);
  const fieldClass = fullWidth ? 'col-span-2' : undefined;

  if (typeof value === 'boolean') {
    return (
      <label className={cn('flex items-center gap-2 py-1', fieldClass)}>
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 rounded border-border"
        />
        <span className="text-sm">{label}</span>
      </label>
    );
  }

  if (isPrimitiveProp(value)) {
    if (isColorTokenKey(propKey, value)) {
      return (
        <ColorTokenField
          propKey={propKey}
          label={label}
          value={String(value)}
          onChange={(next) => onChange(next)}
          fieldClass={fieldClass}
        />
      );
    }

    return (
      <div className={cn(variant === 'colors' ? 'space-y-1' : 'space-y-1.5', fieldClass)}>
        <label htmlFor={propKey} className="text-[11px] text-muted-foreground">
          {label}
        </label>
        <input
          id={propKey}
          type={typeof value === 'number' ? 'number' : 'text'}
          value={typeof value === 'number' ? value : String(value ?? '')}
          onChange={(event) => {
            if (typeof value === 'number') {
              const next = event.target.value === '' ? 0 : Number(event.target.value);
              onChange(Number.isNaN(next) ? value : next);
              return;
            }
            onChange(event.target.value);
          }}
          className={studioInput}
        />
      </div>
    );
  }

  const [draft, setDraft] = useState(() => JSON.stringify(value, null, 2));

  useEffect(() => {
    setDraft(JSON.stringify(value, null, 2));
  }, [value]);

  return (
    <div className={cn('space-y-1.5', fieldClass)}>
      <label htmlFor={propKey} className={studioSectionLabel}>
        {label}
      </label>
      <textarea
        id={propKey}
        value={draft}
        onChange={(event) => {
          const next = event.target.value;
          setDraft(next);
          try {
            onChange(JSON.parse(next) as unknown);
          } catch {
            // wait for valid JSON
          }
        }}
        rows={Math.min(6, draft.split('\n').length + 1)}
        spellCheck={false}
        className="w-full resize-y rounded-md border border-border bg-background p-2 font-mono text-sm outline-none focus:border-foreground/40"
      />
    </div>
  );
}

export function PropsTryForm({
  values,
  onChange,
  columns = 1,
  variant = 'default',
}: PropsTryFormProps) {
  const entries = Object.entries(values);

  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground">No props for this template.</p>;
  }

  if (variant === 'colors') {
    return (
      <div className="grid grid-cols-2 gap-x-1 gap-y-0">
        {entries.map(([key, value]) => (
          <PropField
            key={key}
            propKey={key}
            value={value}
            variant="colors"
            onChange={(next) => onChange({ ...values, [key]: next })}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(columns === 2 ? 'grid grid-cols-2 gap-x-3 gap-y-4' : 'space-y-4')}>
      {entries.map(([key, value]) => (
        <PropField
          key={key}
          propKey={key}
          value={value}
          fullWidth={columns === 2 && !isPrimitiveProp(value) && typeof value !== 'boolean'}
          onChange={(next) => onChange({ ...values, [key]: next })}
        />
      ))}
    </div>
  );
}
