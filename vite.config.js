import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base 用相对路径，兼容 share/ 静态托管与预览子路径
export default defineConfig({
  base: './',
  plugins: [react()],
})
