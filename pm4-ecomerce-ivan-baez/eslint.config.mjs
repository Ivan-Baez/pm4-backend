// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',       // Podés usar "any"
      '@typescript-eslint/no-floating-promises': 'warn', // Solo avisa si hay promesas sin manejar
      '@typescript-eslint/no-unsafe-argument': 'warn',   // Solo avisa en argumentos inseguros
      '@typescript-eslint/no-unused-vars': 'off',        // No marca variables sin uso
      'no-unused-vars': 'off',                           // Refuerzo por si ESLint base lo activa
      'quotes': 'off',                                   // No obliga a usar comillas
      'semi': 'off',                                     // No obliga a usar punto y coma
    },
  },
);