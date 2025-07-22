// .eslintrc.js

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        '@typescript-eslint/recommended',
        '@typescript-eslint/recommended-requiring-type-checking'
    ],
    env: {
        node: true,
        es2020: true,
        jest: true
    },
    rules: {
        // TypeScript specific rules
        '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/prefer-const': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        
        // Code style
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        
        // Best practices
        'no-console': 'off', // Allow console for logging
        'no-debugger': 'error',
        'no-alert': 'error',
        
        // ES6+
        'arrow-spacing': 'error',
        'template-curly-spacing': 'error',
        
        // Node.js specific
        'no-process-exit': 'error',
        'no-path-concat': 'error',
        
        // JSDoc
        'valid-jsdoc': 'off', // Disabled in favor of TypeScript types
        
        // Complexity
        'complexity': ['warn', 10],
        'max-depth': ['warn', 4],
        'max-lines': ['warn', 300],
        'max-params': ['warn', 4]
    },
    overrides: [
        {
            files: ['tests/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
            env: {
                jest: true
            },
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-unused-vars': 'off'
            }
        }
    ]
}; 