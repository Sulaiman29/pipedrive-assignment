module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['@typescript-eslint'],
    env: {
      node: true,
      jest: true,
    },
    rules: {
      // Add any custom ESLint rules here
      '@typescript-eslint/no-explicit-any': 'off', // Since we're using any in some places
      'no-console': 'off', // We want to allow console.log for this project
    },
  };