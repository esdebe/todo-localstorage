/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    cssCodeSplit: true,
  },
  plugins: [
    react(),
    chunkSplitPlugin({
      strategy: 'unbundle',
      customSplitting: {
        'vendor-primary': ['react', 'react-dom', 'framer-motion', 'localforage'],
        '@components': [/src\/components/],
        '@lib': [/src\/lib/],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './utils/setup.ts',
    testTimeout: 60_000,
    hookTimeout: 60_000,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp,tmp}/**',
      '**/e2e/**',
    ],
  },
  resolve: {
    alias: {
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },
})
