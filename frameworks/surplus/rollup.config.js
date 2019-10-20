import resolve from 'rollup-plugin-node-resolve';
import surplus from 'rollup-plugin-surplus';
import { terser } from 'rollup-plugin-terser';

const plugins = [
  resolve({ extensions: ['.js', '.jsx'] }),
  surplus(),
  terser()
];

export default {
	input: 'src/main.jsx',
	output: {
		file: '../../dist/surplus.js',
		format: 'iife'
	},
	plugins
};