import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { readPackageJson } from '../scripts/modify-pkgjson.mjs';
import rollupPostcss from 'rollup-plugin-postcss';
import postcssCustomPropertiesFallback from '../scripts/postcss-custom-properties-fallback/plugin.mjs';
import path from 'path';
import processLitCSSPlugin from '../scripts/processLitCSSPlugin.mjs';
import importCss from 'rollup-plugin-import-css';

// @ts-ignore-start
// eslint-disable-next-line -- // @typescript-eslint/ban-ts-comment // @ts-ignore
import properties from './css/custom-properties.module.js'; // eslint-disable-line
// @ts-ignore-end

const esbuidOptions = { minify: true };

const rootDir = new URL('../', import.meta.url).pathname;

const createEsModulesConfig = (entryPoints = []) => {
  return [
    ...entryPoints .filter(name => name) // Add check to remove undefined values
    .map(name => {
      return {
        input: `./lib/${name}.ts`,
        output: {
          file: `./lib/${name}.js`,
          format: 'es',
        },
        external: [/^lit/, /^@theme-engine-ui/],
        plugins: [
          nodeResolve({ rootDir }),
          importCss({ from: undefined }),
          esbuild(),
          processLitCSSPlugin(),
        ],
      };
    }),
  ];
};

const createCSSFilesConfig = (cssFiles = []) => {
  return [
    ...cssFiles.map(name => {
      return {
        input: `./lib/${name}.css`,
        output: {
          file: `./dist/${name}.css`,
        },
        plugins: [
          rollupPostcss({
            plugins: [
              postcssCustomPropertiesFallback({ importFrom: properties }),
            ],
            extract: path.resolve(`./dist/${name}.css`),
          }),
        ],
      };
    }),
  ];
};

const createBundleConfig = (bundle, namespace) => {
  const packageJson = readPackageJson('./');
  const bundleName = packageJson.name.replace('@theme-engine-ui/', '');

  return bundle
    ? {
        input: `lib/${bundle}.ts`,
        output: {
          file: `./dist/${bundleName}.min.js`,
          format: 'umd',
          sourcemap: true,
          name: namespace,
        },
        plugins: [
          nodeResolve({ rootDir }),
          importCss(),
          processLitCSSPlugin(),
          minifyHTML(),
          esbuild(esbuidOptions),
        ],
      }
    : undefined;
};

export const UUIProdConfig = ({
  entryPoints = [],
  cssFiles = [],
  bundle,
  namespace = '',
}) => {
  console.log('entryPoints:', entryPoints);
  console.log('cssFiles:', cssFiles);
  console.log('bundle:', bundle);

  const cssFilesConfig = createCSSFilesConfig(cssFiles);
  const esModulesConfig = createEsModulesConfig(entryPoints);
  const bundleConfig = createBundleConfig(bundle, namespace);

  return [...cssFilesConfig, ...esModulesConfig, bundleConfig].filter(x => x);
};