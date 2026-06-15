import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' 

export default defineConfig({
  plugins: [react()],
    base: '/weatherApp/', 

  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'color-functions', 'global-builtin', 'if-function'],
      },
    },
  },
})