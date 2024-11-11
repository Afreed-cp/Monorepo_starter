// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/packages/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'es',
      sourcemap: true,
      preserveModulesRoot: 'src/packages',
      entryFileNames: '[name].js',
      exports: 'named'
    }
  ],
  external: [
    ...Object.keys(packageJson.peerDependencies || {}),
    ...Object.keys(packageJson.dependencies || {}),
    /^lit/,  // Externalize all lit-related imports
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
      rootDir: 'src/packages',
      exclude: ['**/*.test.ts', '**/*.stories.ts']
    }),
    resolve({
        moduleDirectories: ['node_modules']
      }),
    commonjs(),
    terser({
        format: {
          comments: false
        }
      })
  ]
};