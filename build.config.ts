import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    entries: ['src/index'],
    rollup: {
      inlineDependencies: true,
      output: {
        format: 'es',
        entryFileNames: '[name].js',
      },
      resolve: {
        exportConditions: ['node'],
      },
      esbuild: {
        minify: true,
      },
    },
    declaration: true,
    failOnWarn: false,
    externals: [
      'fsevents',
      'node:url',
      'node:buffer',
      'node:path',
      'node:child_process',
      'node:process',
      'node:path',
      'node:os',
      'clipboardy',
      'consola',
      'vite',
    ],
  },
  {
    entries: ['src/index'],
    rollup: {
      inlineDependencies: true,
      output: {
        format: 'cjs',
        entryFileNames: '[name].cjs',
      },
      resolve: {
        exportConditions: ['node'],
      },
      esbuild: {
        minify: true,
      },
    },
    declaration: true,
    externals: [
      'fsevents',
      'node:url',
      'node:buffer',
      'node:path',
      'node:child_process',
      'node:process',
      'node:path',
      'node:os',
      'clipboardy',
      'consola',
      'vite',
    ],
  },
])
