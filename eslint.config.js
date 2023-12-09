import antfu from '@antfu/eslint-config'

const config = antfu(
  {
    ignores: [],
  },
  {
    rules: {
      'curly': ['error', 'all'],
      'no-console': 'off',
      // 'arrow-parens': ['error', 'as-needed'],
      'array-callback-return': 0,
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    },
  },
  {
    rules: {
      'style/brace-style': ['error', '1tbs'],
      'style/quotes': ['error', 'single', { avoidEscape: true }],
      'style/arrow-parens': ['error', 'as-needed'],
    },
  },
  {
    plugins: {
      // ts: pluginTs,
    },
    rules: {
      'ts/ban-types': [2, { types: { Function: false } }],
    },
  },
  {
    rules: {
      'antfu/top-level-function': 'off',
    },
  },
  // {
  //   plugins: {
  //     // vue: pluginVue,
  //   },
  //   rules: {
  //     // 'vue/attribute-hyphenation': ['warn', 'never', { ignore: ['custom-prop'] }], // props attrs - disabled
  //     'vue/v-on-event-hyphenation': ['warn', 'never', { ignore: ['custom-event'] }], // v-on
  //     'vue/component-name-in-template-casing': [
  //       'error',
  //       'PascalCase',
  //       {
  //         registeredComponentsOnly: false,
  //         ignores: [],
  //       },
  //     ],
  //   },
  // },
  {
    rules: {
      'jsdoc/no-defaults': 'off',
      'jsdoc/require-returns-description': 'off',
    },
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)

export default config
