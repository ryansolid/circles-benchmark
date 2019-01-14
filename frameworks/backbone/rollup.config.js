import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';
import ignore from 'rollup-plugin-ignore';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/main.js',
	output: {
		file: '../../dist/backbone.js',
		format: 'iife'
  },
	plugins: [
    ignore(['jquery']),
    resolve({ extensions: ['.js', '.jsx'] }),
    common({
      include: ['node_modules/**']
    }),
    terser()
  ]
};