import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist'
  }
})
