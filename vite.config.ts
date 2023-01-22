/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isDev = mode === 'development';
	return {
		base: isDev ? '/' : '/scrum_f2e/',
		plugins: [react()],
		server: {
			host: '0.0.0.0',
			open: true
		},
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: ['./tests/setup.ts']
		}
	};
});
