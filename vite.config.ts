import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// jamesgibson.co is served from the apex by GitHub Pages (custom domain, CNAME
// in the repo root), so production builds are mounted at / and package.json's
// homepage is https://jamesgibson.co. The publish guard checks that these agree.
export default defineConfig(({ command }) => ({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/fancy-ui-react')) return 'vendor-ui'
          if (
            id.includes('node_modules/react-markdown') ||
            id.includes('node_modules/remark') ||
            id.includes('node_modules/micromark') ||
            id.includes('node_modules/unified')
          )
            return 'vendor-markdown'
          if (id.includes('node_modules/react')) return 'vendor-react'
        },
      },
    },
  },
}))
