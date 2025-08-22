import { VueLoaderPlugin } from 'vue-loader';
import ESLintPlugin from 'eslint-webpack-plugin';
import { PROJECT_CONFIG } from './config/project.js';
import { fileURLToPath } from 'url';
import getPagesConfig from './script/getPagesConfig.js';

const isOnline = process.env.NODE_ENV === 'production';

const { entries, htmlPlugins } = getPagesConfig();

export default {
  mode: isOnline ? 'production' : 'development',
  entry: entries,
  output: {
    path: fileURLToPath(new URL('./dist', import.meta.url)),
    publicPath: isOnline
      ? `${PROJECT_CONFIG.CDN}/${PROJECT_CONFIG.PREFIX}${PROJECT_CONFIG.NAME}/`
      : '/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json', '.less', '.woff', '.ttf'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  module: {
    rules: [
      // vue 文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      // ts 文件
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      // js 文件
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // css 文件
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      // less 文件
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      // 图片文件
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
      },
      // 媒体文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[hash:8][ext]',
        },
      },
      // 字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]',
        },
      },
    ],
  },
  // 开发环境使用 source-map
  devtool: isOnline ? false : 'source-map',
  plugins: [
    new VueLoaderPlugin(),
    ...htmlPlugins,
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
      exclude: ['node_modules', 'dist'],
      overrideConfigFile: 'eslint.config.js',
      fix: !isOnline,
      cache: true,
      threads: true,
    }),
  ],
  devServer: {
    open: false,
    host: '0.0.0.0',
    hot: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
      },
    },
  },
};
