import glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

/**
 * 获取页面配置
 * @returns {Object} entries 入口配置
 * @returns {Array} htmlPlugins HtmlWebpackPlugin 配置
 */
export default function getPagesConfig() {
  const entries = {};
  const htmlPlugins = [];
  const entryPaths = glob.sync(fileURLToPath(new URL('../src/pages/*/main.ts', import.meta.url)));
  entryPaths.forEach((entryPath) => {
    const pageName = entryPath.match(/src\/pages\/(.+)\/main\.ts/)?.[1];
    entries[pageName] = entryPath;
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: fileURLToPath(new URL('../public/index.html', import.meta.url)),
        filename: `${pageName}.html`,
        chunks: [pageName],
      }),
    );
  });
  return {
    entries,
    htmlPlugins,
  };
}
