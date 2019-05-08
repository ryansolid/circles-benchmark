import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';

const plugins = [
  resolve(),
  commonjs(),
  svelte(),
  terser()
];

export default {
	input: 'src/main.js',
	output: {
		file: '../../dist/svelte.js',
    format: 'iife',
    name: 'main'
	},
  plugins
};