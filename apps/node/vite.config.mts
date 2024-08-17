import { defineConfig } from 'vite';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => ({
  plugins: [],
  test: {
    // load .env.test in test environment
    env: loadEnv(mode, process.cwd(), ''),
  }
}));