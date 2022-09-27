module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    /*
    "off"/0 - turn the rule off
    "warn"/1 - turn the rule on as a warning
    "error"/2 - turn the rule on as an error (exit code 1)
    */
    camelcase: 1,
    'max-len': [
      1,
      {
        code: 80,
        tabWidth: 2,
        comments: 80,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    // General https://eslint.org/docs/latest/rules/
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'import/no-mutable-exports': 0,
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md#options
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    'no-class-assign': 0,
    'no-console': [
      1,
      {
        allow: ['error']
      }
    ],
    'no-continue': 0,
    'no-func-assign': 0,
    'no-nested-ternary': 1,
    'no-restricted-syntax': 0,
    'no-unused-vars': 2,
    'no-use-before-define': 0,
    // React
    'react/destructuring-assignment': 0,
    'react/function-component-definition': 0,
    'react/no-multi-comp': 0,
    'react/no-unescaped-entities': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    // JSX-specific
    'jsx-a11y/click-events-have-key-events': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 1
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src']
      }
    }
  }
}
