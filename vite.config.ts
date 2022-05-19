import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), checker({ typescript: true })],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: 'src/test/setupTests.ts',
    },
});
