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
    globals: {
        expect: true,
        test: true,
        describe: true,
    },
    plugins: [
        'react',
    ],
    parser: '@typescript-eslint/parser',
    extends: ['eslint:recommended', 'airbnb-base', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
        },
    },
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'default-case': 'off',
        'react/display-name': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/first': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/imports-first': 'off',
        'import/prefer-default-export': 'off',
        'prefer-promise-reject-errors': 'off',
        'class-methods-use-this': 'off',
        'no-plusplus': 'off',
        indent: ['error', 4],
        'func-names': 'off',
        'global-require': 'off',
        'no-mixed-operators': 'off',
        'max-len': ['error', 180],
        'no-param-reassign': ['error', { props: false }],
        'no-underscore-dangle': ['error', { allowAfterThis: true }],
        // This one is to avoid complaining avoid invoking functions defined at the bottom of the file
        // which is the preferred place to put private stuff as it's better to have the public API of a module
        // on top as it's usually what you need to check to know how to use it
        'no-use-before-define': ['error', 'nofunc'],
        'prefer-arrow-callback': 'off',
        yoda: 'off',
        'no-void': 'off',
        'prefer-destructuring': 'off',
        'jsx-quotes': [2, 'prefer-single'],
        'react/react-in-jsx-scope': 'off',
    },
};
