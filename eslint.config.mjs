import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

/* `next/typescript` brings rules that fire on Next's own generated files, so
   next-env.d.ts is ignored alongside the dead Vite app in src/. */
const config = [
  {
    ignores: ['src/**', 'vite.config.js', '.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },
];

export default config;
