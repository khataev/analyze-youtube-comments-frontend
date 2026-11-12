import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Фиксированный порт: он прописан в CORS_ORIGINS бэкенда. Если порт занят — падаем, а не берём соседний
  server: { port: 5173, strictPort: true },
})
