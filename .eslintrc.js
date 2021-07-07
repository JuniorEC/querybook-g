module.exports = {
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'plugin:react/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        'eslint-plugin-import',
        'eslint-plugin-react',
        'eslint-plugin-prefer-arrow',
        'eslint-plugin-jsdoc',
        '@typescript-eslint',
        '@typescript-eslint/tslint',
    ],
    rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'array-simple',
            },
        ],
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    Object: {
                        message:
                            'Avoid using the `Object` type. Did you mean `object`?',
                    },
                    Function: {
                        message:
                            'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
                    },
                    Boolean: {
                        message:
                            'Avoid using the `Boolean` type. Did you mean `boolean`?',
                    },
                    Number: {
                        message:
                            'Avoid using the `Number` type. Did you mean `number`?',
                    },
                    String: {
                        message:
                            'Avoid using the `String` type. Did you mean `string`?',
                    },
                    Symbol: {
                        message:
                            'Avoid using the `Symbol` type. Did you mean `symbol`?',
                    },
                },
            },
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'explicit',
            },
        ],
        '@typescript-eslint/member-delimiter-style': [
            'off',
            {
                multiline: {
                    delimiter: 'none',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: ['method', 'function'],
                format: ['camelCase', 'PascalCase'],
                leadingUnderscore: 'allow',
            },
        ],
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/semi': ['off', null],
        '@typescript-eslint/triple-slash-reference': [
            'error',
            {
                path: 'always',
                types: 'prefer-import',
                lib: 'always',
            },
        ],
        '@typescript-eslint/tslint/config': [
            'error',
            {
                rules: {
                    'prefer-conditional-expression': true,
                },
            },
        ],
        '@typescript-eslint/unified-signatures': 'error',
        // '@typescript-eslint/no-shadow': ['error'],
        'arrow-body-style': 'error',
        'arrow-parens': ['off', 'always'],
        'brace-style': ['off', 'off'],
        complexity: 'off',
        'constructor-super': 'error',
        curly: 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'id-blacklist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            
        ],
        'id-match': 'error',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: false,
            },
        ],
        'import/no-internal-modules': 'off',
        'import/order': 'off',
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-indentation': 'error',
        'jsdoc/newline-after-description': 'error',
        'max-classes-per-file': 'off',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': 'off',
        'no-debugger': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-extra-bind': 'error',
        'no-fallthrough': 'off',
        'no-invalid-this': 'off',
        'no-irregular-whitespace': 'off',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-redeclare': 'error',
        'no-return-await': 'error',
        'no-sequences': 'error',
        'no-shadow': 'off',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'off',
        'no-underscore-dangle': 'off',
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'prefer-arrow/prefer-arrow-functions': [
            'error',
            { allowStandaloneDeclarations: true },
        ],
        'prefer-const': 'error',
        'prefer-object-spread': 'error',
        radix: 'error',
        'react/display-name': 'off',
        'react/jsx-boolean-value': 'off',
        'react/jsx-curly-spacing': 'off',
        'react/jsx-equals-spacing': 'off',
        'react/jsx-key': 'error',
        'react/jsx-no-bind': [
            'error',
            { allowArrowFunctions: true, allowBind: true },
        ],
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-target-blank': 'error',
        'react/jsx-no-undef': 'off',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/jsx-wrap-multilines': 'off',
        'react/no-children-prop': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-deprecated': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-render-return-value': 'error',
        'react/no-string-refs': 'error',
        'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
        'react/no-unknown-property': 'error',
        'react/no-unsafe': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'error',
        'react/require-render-return': 'error',
        'react/self-closing-comp': [
            'error',
            {
                component: true,
                html: true,
            },
        ],
        'space-in-parens': ['off', 'never'],
        'spaced-comment': [
            'error',
            'always',
            {
                markers: ['/'],
            },
        ],
        'use-isnan': 'error',
        'valid-typeof': 'off',
    },
};
