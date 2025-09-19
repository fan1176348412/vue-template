const { defineConfig } = require('@vue/cli-service');
const { PROJECT_CONFIG } = require('./config/project');

const isOnline = process.env.VUE_APP_ONLINE === 'online';
module.exports = defineConfig({
  pages: {
    page1: {
      entry: 'src/pages/page1/main.ts',
      template: 'public/index.html',
      title: 'page1',
    },
    page2: {
      entry: 'src/pages/page2/main.ts',
      template: 'public/index.html',
      title: 'page2',
    },
  },
  publicPath: isOnline
    ? `${PROJECT_CONFIG.CDN}/${PROJECT_CONFIG.PREFIX}${PROJECT_CONFIG.NAME}/`
    : './',
  transpileDependencies: true,
  devServer: {
    proxy: 'http://localhost:3000',
  },
});
