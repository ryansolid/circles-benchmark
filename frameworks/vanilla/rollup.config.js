import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/main.js',
	output: {
		file: '../../dist/vanilla.js',
		format: 'iife'
	},
	plugins: [terser()]
};