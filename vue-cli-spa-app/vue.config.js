const { defineConfig } = require('@vue/cli-service');
const { PROJECT_CONFIG } = require('./config/project');

const isOnline = process.env.VUE_APP_ONLINE === 'online';
module.exports = defineConfig({
  publicPath: isOnline
    ? `${PROJECT_CONFIG.CDN}/${PROJECT_CONFIG.PREFIX}${PROJECT_CONFIG.NAME}/`
    : './',
  transpileDependencies: true,
});
