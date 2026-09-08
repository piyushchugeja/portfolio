import { independentSchema } from '@/lib/schema';

export const independent = independentSchema.parse({
  heading: 'Independent work',
  body: 'Alongside my day job I take on freelance work for small businesses, building and maintaining WordPress and Shopify storefronts and running the Google Ads and social campaigns that point at them.',
  areas: ['WordPress', 'Shopify', 'Google Ads', 'Social campaigns'],
});
