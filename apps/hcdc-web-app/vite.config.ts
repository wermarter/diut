import path from 'path'
import url from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
// import basicSsl from '@vitejs/plugin-basic-ssl'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()], // basicSsl()
  optimizeDeps: {
    include: ['@mui/material/Unstable_Grid2'],
  },
  resolve: {
    alias: [
      {
        find: '@diut/common',
        replacement: path.resolve(__dirname, '../../libs/common/src'),
      },
      {
        find: '@diut/hcdc',
        replacement: path.resolve(__dirname, '../../libs/hcdc/src'),
      },
    ],
  },
  server: {
    host: true,
    // port: 3500,
    // https: true,
  },
})
