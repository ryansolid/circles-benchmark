import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const plugins = [
	babel({
		exclude: 'node_modules/**',
		presets: ['solid']
  }),
  resolve({ extensions: ['.js', '.jsx'] }),
  terser()
];

export default {
	input: 'src/main.jsx',
	output: {
		file: '../../dist/solidsignals.js',
		format: 'iife'
	},
	plugins
};