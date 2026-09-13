import type { PipelineStage } from '@/lib/schema';

/** An ordered list, because the order is the information. */
export function Pipeline({ stages, label }: { stages: PipelineStage[]; label: string }) {
  if (stages.length === 0) return null;

  return (
    <ol className="pipeline" aria-label={label}>
      {stages.map((stage) => (
        <li key={stage.label} className="pipeline-stage">
          <span className="pipeline-dot" aria-hidden="true" />
          <span className="pipeline-label">{stage.label}</span>
          {stage.detail ? <span className="pipeline-detail">{stage.detail}</span> : null}
        </li>
      ))}
    </ol>
  );
}
