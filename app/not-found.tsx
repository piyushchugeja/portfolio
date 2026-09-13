import Link from 'next/link';
import { ArrowLeft } from '@/components/ui/Icon';

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell">
        <p className="t-eyebrow">404</p>
        <h1 className="t-title-1 mt-3">That page isn&rsquo;t here</h1>
        <p className="t-body-lg mt-5 max-w-[52ch] text-label-secondary">
          The link may be old, or the page may have moved. Everything on the site is reachable from
          the home page.
        </p>
        <Link href="/" className="btn btn-secondary mt-9">
          <ArrowLeft size={17} />
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
