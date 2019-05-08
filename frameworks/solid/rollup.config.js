import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const plugins = [
	babel({
		exclude: 'node_modules/**',
		plugins: [["jsx-dom-expressions", {moduleName: 'solid-js/dom'}]]
  }),
  resolve({ extensions: ['.js', '.jsx'] }),
  terser()
];

export default {
	input: 'src/main.jsx',
	output: {
		file: '../../dist/solid.js',
		format: 'iife'
	},
	plugins
};