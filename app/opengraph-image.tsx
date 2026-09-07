import { ImageResponse } from 'next/og';
import { profile } from '@/content/profile';

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* Typographic, not decorative — the same restraint as the page, and the same
   values as the dark scheme's tokens (they can't be read from CSS here). */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#000000',
        color: '#f5f5f7',
        padding: '72px 80px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 24,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#a1a1a6',
          }}
        >
          {profile.headline}
        </div>
        <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3, marginTop: 20 }}>
          {profile.name}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.16)' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 28,
            fontSize: 28,
            color: '#a1a1a6',
          }}
        >
          <div style={{ display: 'flex' }}>Enterprise Java · Full-stack · Applied ML</div>
          <div style={{ display: 'flex', color: '#0a84ff' }}>piyushchugeja.com</div>
        </div>
      </div>
    </div>,
    size,
  );
}
