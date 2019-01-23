import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

const plugins = [
  resolve({ extensions: ['.js', '.jsx'] }),
  common({
    include: ['node_modules/**'],
    exclude: [ 'node_modules/process-es6/**' ]
  }),
  replace({"process.env.NODE_ENV": "'production'"}),
  babel({
		exclude: 'node_modules/**',
		plugins: ["babel-plugin-inferno"]
  }),
  terser()
];

export default {
	input: 'src/main.jsx',
	output: {
		file: '../../dist/inferno.js',
		format: 'iife'
	},
	plugins
};