import { renderTemplateHtml } from '@/lib/themes';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    themeId?: string;
    category?: string;
    name?: string;
    props?: Record<string, unknown>;
  };

  const { themeId, category, name, props } = body;

  if (!themeId || !category || !name) {
    return Response.json({ error: 'Missing themeId, category, or name' }, { status: 400 });
  }

  try {
    const html = await renderTemplateHtml(themeId, category, name, props);
    return Response.json({ html });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Render failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
