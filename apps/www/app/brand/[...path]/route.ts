import { readFileSync, existsSync } from 'node:fs';
import { join, normalize } from 'node:path';

const brandDir = join(process.cwd(), '../../themes/_brand');

const MIME: Record<string, string> = {
  svg: 'image/svg+xml',
  png: 'image/png',
  webp: 'image/webp',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
};

/**
 * Serve brand assets from themes/_brand/ at /brand/*
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  const { path } = await params;
  const filename = normalize(path.join('/'));

  if (filename.includes('..') || filename.startsWith('/')) {
    return new Response('Not found', { status: 404 });
  }

  const filePath = join(brandDir, filename);
  if (!existsSync(filePath)) {
    return new Response('Not found', { status: 404 });
  }

  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  const contentType = MIME[ext] ?? 'application/octet-stream';
  const body = readFileSync(filePath);

  return new Response(body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
