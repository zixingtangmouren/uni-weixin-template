/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 11:54:57
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-01 15:49:33
 * @Description: file content
 */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'space-before-function-paren': ['error', 'never']
  },
  globals: {
    UniApp: true,
    uni: true,
    AnyObject: true
  }
}
