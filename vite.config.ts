import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import rollupNodePolyfillsPlugin from 'rollup-plugin-polyfill-node';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
		  // for production
		  plugins: [rollupNodePolyfillsPlugin()],
		},
	  },
	  resolve: {
		alias: {
		  // by node-globals-polyfill
		  events: 'rollup-plugin-node-polyfills/polyfills/events',
		},
	  },
	  optimizeDeps: {
		esbuildOptions: {
		  plugins: [
			NodeGlobalsPolyfillPlugin({ buffer: true, process: true }),
			NodeModulesPolyfillPlugin(),
		  ],
		},
	  },
});
