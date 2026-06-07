'use client';

import { filterTemplateGroups } from '@/lib/filter-template-groups';
import type { BlockCategoryGroup } from '@/lib/group-blocks';
import { cn } from '@/lib/utils';
import { ChevronDown, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { useStudio } from './studio-context';
import { studioInput } from './studio-styles';

const ACCORDION_MS = 250;

interface ThemeSidebarProps {
  themeId: string;
  groups: BlockCategoryGroup[];
}

function getDefaultOpenCategory(groups: BlockCategoryGroup[]): string | null {
  return groups[0]?.category ?? null;
}

function SidebarAccordionSection({
  label,
  open,
  onToggle,
  count,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  count?: number;
  children: ReactNode;
}) {
  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm"
        aria-expanded={open}
      >
        <span className="min-w-0 truncate font-semibold text-foreground">{label}</span>
        {count !== undefined ? (
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{count}</span>
        ) : null}
        <ChevronDown
          className={cn(
            'ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ease-out',
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
          <div className="mt-0.5">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ThemeSidebar({ themeId, groups }: ThemeSidebarProps) {
  const pathname = usePathname();
  const [openCategory, setOpenCategory] = useState<string | null>(() =>
    getDefaultOpenCategory(groups),
  );
  const [query, setQuery] = useState('');
  const { isTemplateSelected, toggleTemplateSelection, selectedTemplates } = useStudio();

  const isSearching = query.trim().length > 0;
  const filteredGroups = useMemo(() => filterTemplateGroups(groups, query), [groups, query]);

  useEffect(() => {
    setOpenCategory(getDefaultOpenCategory(groups));
  }, [groups]);

  useEffect(() => {
    for (const group of groups) {
      const hasActive = group.blocks.some(
        (block) => pathname === `/themes/${themeId}/${block.category}/${block.name}`,
      );
      if (hasActive) {
        setOpenCategory(group.category);
      }
    }
  }, [pathname, themeId, groups]);

  function handleToggle(category: string) {
    setOpenCategory((prev) => (prev === category ? null : category));
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border">
      <div className="border-b border-border px-2 py-2">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search templates"
            className={cn(studioInput, 'h-8 pl-8 pr-8 text-xs')}
            aria-label="Search templates"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      {selectedTemplates.length > 0 ? (
        <div className="border-b border-border px-3 py-2 text-xs text-muted-foreground">
          {selectedTemplates.length} selected
        </div>
      ) : null}

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {filteredGroups.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-muted-foreground">
            No templates match &ldquo;{query.trim()}&rdquo;
          </p>
        ) : (
          filteredGroups.map((group) => {
            const isOpen = isSearching || openCategory === group.category;

            return (
              <SidebarAccordionSection
                key={group.category}
                label={group.label}
                open={isOpen}
                onToggle={() => handleToggle(group.category)}
                count={isSearching ? group.blocks.length : undefined}
              >
                <ul className="space-y-0.5">
                  {group.blocks.map((block) => {
                    const href = `/themes/${themeId}/${block.category}/${block.name}`;
                    const active = pathname === href;
                    const selected = isTemplateSelected({
                      category: block.category,
                      name: block.name,
                    });

                    return (
                      <li key={block.name}>
                        <div
                          className={cn(
                            'flex items-center gap-1.5 rounded-md pl-3 pr-1 transition-colors',
                            active || selected ? 'bg-muted/60' : 'hover:bg-muted/40',
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() =>
                              toggleTemplateSelection({
                                category: block.category,
                                name: block.name,
                              })
                            }
                            onClick={(event) => event.stopPropagation()}
                            className="h-3.5 w-3.5 shrink-0 rounded border-border accent-foreground"
                            aria-label={`Select ${block.name}`}
                          />
                          <Link
                            href={href}
                            className={cn(
                              'block min-w-0 flex-1 truncate py-1.5 text-sm transition-colors',
                              active
                                ? 'font-medium text-foreground'
                                : 'text-muted-foreground hover:text-foreground',
                            )}
                          >
                            {block.name}
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </SidebarAccordionSection>
            );
          })
        )}
      </nav>
    </aside>
  );
}
