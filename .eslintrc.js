/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    extends: [
      'next',
      'next/core-web-vitals',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    rules: {
      // Customize rules here:
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'no-console': 'warn',
      'prefer-const': 'warn'
    }
  }
  