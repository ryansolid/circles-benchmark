import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/main.js',
	output: {
		file: '../../dist/lithtml.js',
		format: 'iife'
	},
	plugins: [resolve(), terser()]
};