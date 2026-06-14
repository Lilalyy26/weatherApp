import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <-- C'est ce plugin-là qui est déjà installé chez toi !

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // On garde l'option pour masquer les lignes d'avertissements de Bootstrap
        silenceDeprecations: ['import', 'color-functions', 'global-builtin', 'if-function'],
      },
    },
  },
})