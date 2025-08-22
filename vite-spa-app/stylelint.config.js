export default {
  extends: [
    'stylelint-config-standard', // stylelint 官方的标准样式规范
    'stylelint-config-recess-order', // 使用社区推荐的 CSS 属性排序规则，无需手动配置 stylelint-order 插件
    'stylelint-config-standard-vue', // 兼容 Vue 文件
  ],

  // 针对不同类型的文件设置自定义语法解析器
  overrides: [
    {
      files: ['**/*.(less|css|vue|html)'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],

  rules: {
    // top left right 等不允许替换成 inset 有兼容性问题
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['inset'],
      },
    ],
    // 颜色函数可以使用基于逗号的语法
    'color-function-notation': null,
    // 允许使用 deep
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    // 关闭字体校验
    'font-family-no-missing-generic-family-keyword': null,
    // id 选择器 驼峰
    'selector-id-pattern': '^[a-z][a-zA-Z0-9]+$',
    // 动画驼峰
    'keyframes-name-pattern': '^[a-z][a-zA-Z0-9]+$',
  },
};
