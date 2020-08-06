module.exports = {
  env: {
    // "browser": true,
    // "commonjs": true,
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:node/recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    // 👇 to play nice with prettier's es5 setting
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    'consistent-return': 'off',
  },
};
