import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true, // 서버 실행 시 자동으로 브라우저 열기
    watch: {
      usePolling: true
    }
  }
})
