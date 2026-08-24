import { ImageResponse } from 'next/og';
import { featuredProjects, getProject } from '@/lib/projects';
import { profile } from '@/content/profile';

export const alt = 'Case study — Piyush Chugeja';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  const title = project?.title ?? profile.name;
  const tagline = project?.tagline ?? profile.headline;
  /* The pipeline is the site's signature, so the card carries it too — three
     stages at most, or the type gets too small to read at thumbnail size. */
  const stages = (project?.pipeline ?? []).slice(0, 3).map((stage) => stage.label);

  return new ImageResponse(
    (
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
            style={{ fontSize: 24, letterSpacing: 2, textTransform: 'uppercase', color: '#a1a1a6' }}
          >
            Case study
          </div>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3, marginTop: 20 }}>
            {title}
          </div>
          <div style={{ fontSize: 34, color: '#a1a1a6', marginTop: 18, maxWidth: 900 }}>
            {tagline}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {stages.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 34 }}>
              {stages.map((stage, index) => (
                <div key={stage} style={{ display: 'flex', alignItems: 'center' }}>
                  {index > 0 ? (
                    <div
                      style={{
                        width: 56,
                        height: 1,
                        background: 'rgba(255,255,255,0.24)',
                        margin: '0 18px',
                      }}
                    />
                  ) : null}
                  <div
                    style={{ width: 9, height: 9, borderRadius: 9, background: '#0a84ff' }}
                  />
                  <div style={{ fontSize: 24, color: '#f5f5f7', marginLeft: 12 }}>{stage}</div>
                </div>
              ))}
              <div style={{ fontSize: 24, color: '#6e6e73', marginLeft: 18 }}>…</div>
            </div>
          ) : null}

          <div style={{ height: 1, background: 'rgba(255,255,255,0.16)' }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 26,
              fontSize: 26,
              color: '#a1a1a6',
            }}
          >
            <div style={{ display: 'flex' }}>{profile.name}</div>
            <div style={{ display: 'flex', color: '#0a84ff' }}>piyushchugeja.com</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
