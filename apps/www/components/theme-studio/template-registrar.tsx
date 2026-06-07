'use client';

import { useEffect } from 'react';
import { useStudio } from './studio-context';

interface TemplateRegistrarProps {
  themeId: string;
  category: string;
  name: string;
  previewProps: Record<string, unknown>;
}

export function TemplateRegistrar({
  themeId,
  category,
  name,
  previewProps,
}: TemplateRegistrarProps) {
  const { registerTemplate } = useStudio();

  useEffect(() => {
    registerTemplate({ themeId, category, name }, previewProps);
  }, [themeId, category, name, previewProps, registerTemplate]);

  return null;
}
