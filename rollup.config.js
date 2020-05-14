import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  external: [ 'components/breadcrumbs.ts' ],
  output: [
    {
      file: 'lib/vue-2-breadcrumbs.umd.min.js',
      format: 'umd',
      name: 'VueBreadcrumbs',
      exports: 'named',
      plugins: [terser()],
      globals: {
        vue: 'Vue'
      },
    },
    {
      file: 'lib/vue-2-breadcrumbs.umd.js',
      format: 'umd',
      name: 'VueBreadcrumbs',
      exports: 'named',
      globals: {
        vue: 'Vue'
      },
    },
    {
      file: 'lib/vue-2-breadcrumbs.esm.js',
      format: 'esm',
      exports: 'named',
    },
    {
      file: 'lib/vue-2-breadcrumbs.common.js',
      format: 'cjs',
      exports: 'named'
    }
  ],
  plugins: [typescript(), resolve({resolveOnly: ['@/components/breadcrumbs']})]
};
