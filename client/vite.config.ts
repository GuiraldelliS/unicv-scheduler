import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), legacy()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
    optimizeDeps: {
      exclude: ['js-big-decimal'],
    },
    define: {
      'process.env.AUTH0_DOMAINE': JSON.stringify(env.AUTH0_DOMAIN),
      'process.env.AUTH0_CLIENT_ID': JSON.stringify(env.AUTH0_CLIENT_ID),
    },
  }
})
