'use client';

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export type StudioView = 'preview' | 'code' | 'props' | 'try';

export interface StudioTemplate {
  themeId: string;
  category: string;
  name: string;
}

export type StudioTemplateRef = Pick<StudioTemplate, 'category' | 'name'>;

function selectionKey(template: StudioTemplateRef): string {
  return `${template.category}/${template.name}`;
}

interface StudioContextValue {
  themeId: string;
  view: StudioView;
  setView: (view: StudioView) => void;
  template: StudioTemplate | null;
  selectedTemplates: StudioTemplateRef[];
  isTemplateSelected: (template: StudioTemplateRef) => boolean;
  toggleTemplateSelection: (template: StudioTemplateRef) => void;
  clearTemplateSelection: () => void;
  registerTemplate: (template: StudioTemplate, contentProps: Record<string, unknown>) => void;
  brandValues: Record<string, unknown>;
  setBrandValues: (values: Record<string, unknown>) => void;
  tokenValues: Record<string, unknown>;
  setTokenValues: (values: Record<string, unknown>) => void;
  contentValues: Record<string, unknown>;
  setContentValues: (values: Record<string, unknown>) => void;
  liveHtml: string;
  rendering: boolean;
  propsError: string | null;
  refreshPreview: () => Promise<void>;
}

const StudioContext = createContext<StudioContextValue | null>(null);

interface StudioProviderProps {
  children: ReactNode;
  themeId: string;
  initialBrand: Record<string, unknown>;
  initialTokens: Record<string, unknown>;
}

export function StudioProvider({
  children,
  themeId,
  initialBrand,
  initialTokens,
}: StudioProviderProps) {
  const [view, setView] = useState<StudioView>('preview');
  const [template, setTemplate] = useState<StudioTemplate | null>(null);
  const [brandValues, setBrandValues] = useState(initialBrand);
  const [tokenValues, setTokenValues] = useState(initialTokens);
  const [contentValues, setContentValues] = useState<Record<string, unknown>>({});
  const [liveHtml, setLiveHtml] = useState('');
  const [rendering, setRendering] = useState(false);
  const [propsError, setPropsError] = useState<string | null>(null);
  const [selectedTemplates, setSelectedTemplates] = useState<StudioTemplateRef[]>([]);
  const tryPropsBaselineRef = useRef<string | null>(null);

  useEffect(() => {
    setBrandValues(initialBrand);
    setTokenValues(initialTokens);
    setSelectedTemplates([]);
  }, [themeId, initialBrand, initialTokens]);

  const isTemplateSelected = useCallback(
    (next: StudioTemplateRef) =>
      selectedTemplates.some((item) => selectionKey(item) === selectionKey(next)),
    [selectedTemplates],
  );

  const toggleTemplateSelection = useCallback((next: StudioTemplateRef) => {
    setSelectedTemplates((prev) => {
      const key = selectionKey(next);
      const exists = prev.some((item) => selectionKey(item) === key);
      if (exists) {
        return prev.filter((item) => selectionKey(item) !== key);
      }
      return [...prev, next].sort((a, b) => {
        const byCategory = a.category.localeCompare(b.category);
        return byCategory !== 0 ? byCategory : a.name.localeCompare(b.name);
      });
    });
  }, []);

  const clearTemplateSelection = useCallback(() => {
    setSelectedTemplates([]);
  }, []);

  const refreshPreview = useCallback(async () => {
    if (!template) return;

    setRendering(true);
    try {
      const response = await fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          themeId: template.themeId,
          category: template.category,
          name: template.name,
          props: { ...contentValues, brand: brandValues, tokens: tokenValues },
        }),
      });

      const data = (await response.json()) as { html?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? 'Render failed');
      }

      setLiveHtml(data.html ?? '');
      setPropsError(null);
    } catch (error) {
      setPropsError(error instanceof Error ? error.message : 'Render failed');
    } finally {
      setRendering(false);
    }
  }, [template, contentValues, brandValues, tokenValues]);

  const registerTemplate = useCallback(
    (next: StudioTemplate, contentProps: Record<string, unknown>) => {
      tryPropsBaselineRef.current = null;
      setLiveHtml('');
      setTemplate(next);
      setContentValues({ ...contentProps });
    },
    [],
  );

  useEffect(() => {
    if (view !== 'try') {
      tryPropsBaselineRef.current = null;
      return;
    }
    if (!template) return;

    const snapshot = JSON.stringify({ contentValues, brandValues, tokenValues });

    if (tryPropsBaselineRef.current === null) {
      tryPropsBaselineRef.current = snapshot;
      return;
    }

    if (tryPropsBaselineRef.current === snapshot) return;

    tryPropsBaselineRef.current = snapshot;

    const timer = setTimeout(() => {
      void refreshPreview();
    }, 400);

    return () => clearTimeout(timer);
  }, [view, template, contentValues, brandValues, tokenValues, refreshPreview]);

  return (
    <StudioContext.Provider
      value={{
        themeId,
        view,
        setView,
        template,
        selectedTemplates,
        isTemplateSelected,
        toggleTemplateSelection,
        clearTemplateSelection,
        registerTemplate,
        brandValues,
        setBrandValues,
        tokenValues,
        setTokenValues,
        contentValues,
        setContentValues,
        liveHtml,
        rendering,
        propsError,
        refreshPreview,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within StudioProvider');
  }
  return context;
}
