import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/main.js',
	output: {
		file: '../../dist/knockout.js',
		format: 'iife'
	},
	plugins: [
    resolve({ extensions: ['.js', '.jsx'] }),
    common({
      include: ['node_modules/**']
    }),
    terser()
  ]
};