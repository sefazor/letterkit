import { ImageResponse } from 'next/og';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAF7F2',
          color: '#1D1D1B',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '72px 80px',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 18,
          }}
        >
          <div
            style={{
              background: '#1D1D1B',
              borderRadius: 12,
              height: 56,
              width: 56,
            }}
          />
          <div
            style={{
              fontSize: 42,
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 900 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div
            style={{
              color: '#5C5C58',
              fontSize: 30,
              lineHeight: 1.4,
              maxWidth: 820,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        <div style={{ color: '#8A8A86', fontSize: 24 }}>letterkit.dev</div>
      </div>
    ),
    size,
  );
}
