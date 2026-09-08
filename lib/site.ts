export const site = {
  url: 'https://piyushchugeja.com',
  name: 'Piyush Chugeja',
  title: 'Piyush Chugeja, Software Engineer',
  locale: 'en_IN',
} as const;

/** Absolute URL for metadata, OG images and JSON-LD. */
export function absolute(path: string): string {
  return new URL(path, site.url).toString();
}
