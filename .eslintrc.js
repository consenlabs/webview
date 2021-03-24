module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['./node_modules/@consenlabs/eslint-ts/index', 'prettier'],
  env: {
    jest: true,
  },
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  },
}
