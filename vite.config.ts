import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import rollupNodePolyfillsPlugin from 'rollup-plugin-polyfill-node';
import nodePolyfills  from 'rollup-plugin-polyfill-node';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
		  // for production
		  plugins: [nodePolyfills ()],
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
			polyfillNode({ buffer: true, process: true }),
		  ],
		},
	  },
});
