import path from 'path'
import url from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      {
        find: '@diut/common',
        replacement: path.resolve(__dirname, '../../libs/common/src'),
      },
    ],
  },
  server: {
    host: true,
  },
})
