module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018, // Allows parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': ['warn', {allowExpressions: true}],
        '@typescript-eslint/interface-name-prefix': ['warn', 'never'],
        'no-extra-parens': 'off',
        '@typescript-eslint/no-extra-parens': ['error'],
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowDestructuring: false,
                allowedNames: ['self'],
            },
        ],
        '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
        '@typescript-eslint/no-useless-constructor': 'warn',
        '@typescript-eslint/adjacent-overload-signatures': 'warn',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-ignore': 'error',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/prefer-namespace-keyword': 'warn',
        '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
        '@typescript-eslint/promise-function-async': ['error'],
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/unbound-method': ['warn', {ignoreStatic: true}],
        '@typescript-eslint/unified-signatures': 'warn',
        '@typescript-eslint/no-explicit-any': 'error',
        // @typescript-eslint/func-call-spacing rule not found?
        // 'func-call-spacing': 'off',
        // '@typescript-eslint/func-call-spacing': ['error'],
        // @typescript-eslint/semi rule not found?
        // 'semi': 'off',
        // '@typescript-eslint/semi': ['error'],
    }
}
