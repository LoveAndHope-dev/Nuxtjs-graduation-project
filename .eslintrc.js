module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    "arrow-parens": 0,//箭头函数用小括号括起来
    "dot-notation": [0, { "allowKeywords": true }],
    "no-unused-vars": 0,//不能有声明后未被使用的变量或参数
    "standard/no-callback-literal": 0,
    "unicorn/prefer-includes": 0,
    "prefer-const": 0,
    "space-before-function-paren": 0,
    "spaced-comment": 0,
    "object-shorthand": 0,
    "no-unused-components": 0,
    "indent": ["off", 2],
    "object-curly-spacing": 0,
    "semi": 0,
    "no-var": 0,
    "no-trailing-spaces": 0,
    "no-mutable-exports": 0,
    "eol-last": 0,
    'vue/no-unused-components': 'off',
    "no-lonely-if": 'off',
    "require-await": 'off',
    "import/order": 'off',
    "vue/html-indent": 'off',
    "vue/html-self-closing": 'off',
    "vue/multiline-html-element-content-newline": 'off',
    "vue/no-parsing-error": [2, {
      "x-invalid-end-tag": false,
    }],
    "no-unused-expressions": 'off',
    "import/no-mutable-exports": 'off',
    "no-multi-str": 'off',
    "eqeqeq": 'off',
    "no-undef": 'off',
    "vue/singleline-html-element-content-newline": 'off',
    "vue/attributes-order": 'off',
    "vue/require-default-prop": 'off',
    "vue/mustache-interpolation-spacing": 'off',
    "vue/valid-v-model": 'off',
    "no-console": 'off'
  }
}
