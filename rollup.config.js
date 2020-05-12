import typescript from 'rollup-plugin-typescript';
import sourceMaps from 'rollup-plugin-sourcemaps';
import postcss from 'rollup-plugin-postcss';

/**
 * @file 配置文件
 */

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: 'dist/schedule.js'
    }
  ],
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript')
    }),
    sourceMaps(),
    postcss()
  ]
};
