module.exports = {
  // 标记为根配置文件，ESLint 不会继续向上查找父目录的配置文件
  root: true,
  // 定义代码运行环境
  env: {
    // 启用 Node.js 全局变量和 API
    node: true,
    // 启用 Vue 3 的 setup 编译器宏（如 defineProps、defineEmits 等）
    'vue/setup-compiler-macros': true,
  },
  // 继承的配置规则集
  extends: [
    // Vue 3 基础规则集，包含 Vue 3 语法检查
    'plugin:vue/vue3-essential',
    // ESLint 推荐规则集
    // https://eslint.org/docs/latest/rules/
    'eslint:recommended',
    // TypeScript 推荐规则集
    '@vue/typescript/recommended',
    // 集成 Prettier 规则，避免与 Prettier 格式化冲突
    // 需安装 eslint-plugin-prettier eslint-config-prettier
    'plugin:prettier/recommended',
  ],
  // 解析器选项
  parserOptions: {
    // 指定 ECMAScript 版本为 2020
    ecmaVersion: 2020,
  },
  // 自定义规则配置
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
};
