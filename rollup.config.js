import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import sourceMaps from 'rollup-plugin-sourcemaps';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';

/**
 * @file 配置文件
 */

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'iife',
      file: 'dist/schedule.js'
    }
  ],
  plugins: [
    nodeResolve({
      // use "jsnext:main" if possible
      // see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true
    }),
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript')
    }),
    sourceMaps(),
    postcss(),
    json()
  ]
};
