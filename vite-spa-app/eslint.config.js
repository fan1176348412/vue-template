import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import pluginPrettier from 'eslint-plugin-prettier';

// 要在`vue`文件中允许除`ts`之外的更多语言，请取消对以下行的注释：
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })

export default defineConfigWithVueTs(
  // 忽略的文件
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  // Vue 基础规则集
  pluginVue.configs['flat/essential'],
  // TypeScript 推荐规则集
  vueTsConfigs.recommended,
  // 忽略和 Prettier 格式化冲突的规则
  skipFormatting,
  // 启用 Prettier 规则
  {
    name: 'prettier-integration',
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error', // 将 Prettier 违规报告为错误
    },
  },
  // 自定义规则配置
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      // console 语句规则：生产环境警告，开发环境关闭
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // debugger 语句规则：生产环境警告，开发环境关闭
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // Vue 组件命名规则：允许单个单词的组件名
      'vue/multi-word-component-names': 'off',
      // 空函数规则：允许空函数
      'no-empty-function': 'off',
      // TypeScript 空函数规则：允许空函数
      '@typescript-eslint/no-empty-function': 'off',
      // TypeScript 禁用 @ts-ignore 等注释规则：允许使用
      '@typescript-eslint/ban-ts-comment': 'off',
      // TypeScript 禁用 any 类型规则：允许使用 any 类型
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
