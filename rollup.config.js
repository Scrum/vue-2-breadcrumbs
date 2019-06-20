import babel from 'rollup-plugin-babel';
// import {terser} from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import vuePlugin from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/vue-breadcrumbs.min.js',
      format: 'umd',
      name: 'VueBreadcrumbs',
      exports: 'named'
    },
    {
      file: 'docs/vue-breadcrumbs.min.js',
      format: 'umd',
      name: 'VueBreadcrumbs',
      exports: 'named'
    },
    {
      file: 'lib/index.js',
      format: 'esm'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    builtins(),
    babel(),
    vuePlugin()
    // terser()
  ]
};
