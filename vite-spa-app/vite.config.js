import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { PROJECT_CONFIG } from './config/project';

const isOnline = process.env.NODE_ENV === 'production';

// https://vite.dev/config/
export default defineConfig({
  base: isOnline ? `${PROJECT_CONFIG.CDN}/${PROJECT_CONFIG.PREFIX}${PROJECT_CONFIG.NAME}/` : './',
  plugins: [
    vue(),
    vueDevTools({
      launchEditor: 'cursor',
    }),
    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      // 导入的库
      imports: ['vue'],
      // 生成dts
      dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url)),
      // Vue 模版内部自动导入
      vueTemplate: true,
    }),
    // https://github.com/unplugin/unplugin-vue-components
    Components({
      // 组件目录
      dirs: [
        fileURLToPath(new URL('./src/pages/*/components', import.meta.url)),
        fileURLToPath(new URL('./src/components', import.meta.url)),
      ],
      // 生成dts
      dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url)),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.vue', '.ts'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 把所有第三方库拆成一个 vendors 包
            return 'vendor';
          }
        },
        chunkFileNames: 'chunk-[name].js',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
