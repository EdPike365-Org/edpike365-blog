# Gatsby

Gatsby advanced starter has a custom ESLint (and testing with jest and cypress).

https://github.com/Vagr9K/gatsby-advanced-starter/blob/master/.eslintrc.js

https://www.gatsbyjs.com/docs/how-to/custom-configuration/eslint/

https://www.gatsbyjs.com/plugins/gatsby-plugin-eslint/

```JSON
    "eslint": "^8.53.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-prettier": "^9.0.0",
    "eslint-config-react-app": "^7.0.1",
    "eslint-plugin-import": "^2.29.0",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
```

## My first shot

Would use Prettier for formatting.

```JS
//.eslintrc.js
// This setup has ESLint for linting then it uses Prettier for ALL actual formatting
// https://blog.theodo.com/2019/08/why-you-should-use-eslint-prettier-and-editorconfig-together/
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    globals: {
        __PATH_PREFIX__: true,
    },
    // plugin:prettier/recommended negates need for rules, plugins, and extends prettier
    extends: ['react-app', 'eslint:recommended', 'airbnb-base', 'prettier'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
    },
    plugins: ['prettier'],
}
```

## TS

https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/eslint-config.ts

```TS

import { ESLint } from "eslint"
import path from "path"

const eslintRulePaths = path.resolve(`${__dirname}/eslint-rules`)
const eslintRequirePreset = require.resolve(`./eslint/required`)

export const eslintRequiredConfig: ESLint.Options = {
  rulePaths: [eslintRulePaths],
  useEslintrc: false,
  allowInlineConfig: false,
  // @ts-ignore
  emitWarning: true,
  baseConfig: {
    parser: require.resolve(`@babel/eslint-parser`),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: `module`,
      ecmaFeatures: {
        jsx: true,
      },
      // TODO proper check for custom babel & plugins config
      // Currently when a babelrc is added to the project, it will override our babelOptions
      babelOptions: {
        presets: [require.resolve(`babel-preset-gatsby`)],
      },
      requireConfigFile: false,
    },
    globals: {
      graphql: true,
      __PATH_PREFIX__: true,
      __TRAILING_SLASH__: true,
      __BASE_PATH__: true, // this will rarely, if ever, be used by consumers
    },
    extends: [eslintRequirePreset],
  },
}

export const eslintConfig = (
  usingAutomaticJsxRuntime: boolean
): ESLint.Options => {
  return {
    useEslintrc: false,
    resolvePluginsRelativeTo: __dirname,
    rulePaths: [eslintRulePaths],
    baseConfig: {
      globals: {
        graphql: true,
        __PATH_PREFIX__: true,
        __TRAILING_SLASH__: true,
        __BASE_PATH__: true, // this will rarely, if ever, be used by consumers
      },
      extends: [
        require.resolve(`eslint-config-react-app`),
        eslintRequirePreset,
      ],
      parser: require.resolve(`@babel/eslint-parser`),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: `module`,
        ecmaFeatures: {
          jsx: true,
        },
        // TODO proper check for custom babel & plugins config
        // Currently when a babelrc is added to the project, it will override our babelOptions
        babelOptions: {
          presets: [require.resolve(`babel-preset-gatsby`)],
        },
        requireConfigFile: false,
      },
      plugins: [],
      rules: {
        // New versions of react use a special jsx runtime that remove the requirement
        // for having react in scope for jsx. Once the jsx runtime is backported to all
        // versions of react we can make this always be `off`.
        // I would also assume that eslint-config-react-app will switch their flag to `off`
        // when jsx runtime is stable in all common versions of React.
        "react/jsx-uses-react": usingAutomaticJsxRuntime ? `off` : `error`,
        "react/react-in-jsx-scope": usingAutomaticJsxRuntime ? `off` : `error`,
        "import/no-webpack-loader-syntax": [0],
        "react/jsx-pascal-case": [
          `warn`,
          {
            allowNamespace: true,
          },
        ],
        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/master/docs/rules
        // "jsx-a11y/accessible-emoji": `warn`, Deprecated
        "jsx-a11y/alt-text": `warn`,
        "jsx-a11y/anchor-has-content": `warn`,
        "jsx-a11y/anchor-is-valid": `warn`,
        "jsx-a11y/aria-activedescendant-has-tabindex": `warn`,
        "jsx-a11y/aria-props": `warn`,
        "jsx-a11y/aria-proptypes": `warn`,
        "jsx-a11y/aria-role": `warn`,
        "jsx-a11y/aria-unsupported-elements": `warn`,
        "jsx-a11y/autocomplete-valid": [
          `warn`,
          {
            inputComponents: [],
          },
        ],
        "jsx-a11y/click-events-have-key-events": `warn`,
        "jsx-a11y/control-has-associated-label": [
          `warn`,
          {
            ignoreElements: [
              `audio`,
              `canvas`,
              `embed`,
              `input`,
              `textarea`,
              `tr`,
              `video`,
            ],
            ignoreRoles: [
              `grid`,
              `listbox`,
              `menu`,
              `menubar`,
              `radiogroup`,
              `row`,
              `tablist`,
              `toolbar`,
              `tree`,
              `treegrid`,
            ],
            includeRoles: [`alert`, `dialog`],
          },
        ],
        "jsx-a11y/heading-has-content": `warn`,
        "jsx-a11y/html-has-lang": `warn`,
        "jsx-a11y/iframe-has-title": `warn`,
        "jsx-a11y/img-redundant-alt": `warn`,
        "jsx-a11y/interactive-supports-focus": [
          `warn`,
          {
            tabbable: [
              `button`,
              `checkbox`,
              `link`,
              `progressbar`,
              `searchbox`,
              `slider`,
              `spinbutton`,
              `switch`,
              `textbox`,
            ],
          },
        ],
        // "jsx-a11y/label-has-for": `warn`, was deprecated and replaced with jsx-a11y/has-associated-control in v6.1.0
        "jsx-a11y/label-has-associated-control": `warn`,
        "jsx-a11y/lang": `warn`,
        "jsx-a11y/media-has-caption": `warn`,
        "jsx-a11y/mouse-events-have-key-events": `warn`,
        "jsx-a11y/no-access-key": `warn`,
        "jsx-a11y/no-autofocus": `warn`,
        "jsx-a11y/no-distracting-elements": `warn`,
        "jsx-a11y/no-interactive-element-to-noninteractive-role": `warn`,
        "jsx-a11y/no-noninteractive-element-interactions": [
          `warn`,
          {
            body: [`onError`, `onLoad`],
            iframe: [`onError`, `onLoad`],
            img: [`onError`, `onLoad`],
          },
        ],
        "jsx-a11y/no-noninteractive-element-to-interactive-role": `warn`,
        "jsx-a11y/no-noninteractive-tabindex": `warn`,
        // "jsx-a11y/no-onchange": `warn`, Deprecated
        "jsx-a11y/no-redundant-roles": `warn`,
        "jsx-a11y/no-static-element-interactions": `warn`,
        "jsx-a11y/role-has-required-aria-props": `warn`,
        "jsx-a11y/role-supports-aria-props": `warn`,
        "jsx-a11y/scope": `warn`,
        "jsx-a11y/tabindex-no-positive": `warn`,
      },
    },
  }
}
```

## JS

https://github.com/gatsbyjs/gatsby/blob/master/.eslintrc.js

```JS
module.exports = {
  parser: `@babel/eslint-parser`,
  extends: [
    `google`,
    `eslint:recommended`,
    `plugin:flowtype/recommended`,
    `plugin:react/recommended`,
    `prettier`,
  ],
  plugins: [`flowtype`, `prettier`, `react`, `filenames`, `@babel`],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      configFile: `./.babelrc.js`,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    before: true,
    after: true,
    spyOn: true,
    // These should be in scope but for some reason eslint can't see them
    NodeJS: true,
    JSX: true,
    NodeRequire: true,
    TimerHandler: true,
    __PATH_PREFIX__: true,
    __BASE_PATH__: true,
    __ASSET_PREFIX__: true,
    _CFLAGS_: true,
    __GATSBY: true,
    __TRAILING_SLASH__: true,
  },
  rules: {
    "@babel/no-unused-expressions": [
      `error`,
      {
        allowTaggedTemplates: true,
      },
    ],
    "no-unused-expressions": `off`,
    "@babel/no-invalid-this": `error`,
    "no-invalid-this": `off`,
    "arrow-body-style": [
      `error`,
      `as-needed`,
      { requireReturnForObjectLiteral: true },
    ],
    "new-cap": `off`,
    "no-unused-vars": [
      `warn`,
      {
        varsIgnorePattern: `^_`,
        argsIgnorePattern: `^_`,
        ignoreRestSiblings: true,
      },
    ],
    "consistent-return": [`error`],
    "filenames/match-regex": [`error`, `^[a-z-\\d\\.]+$`, true],
    "no-console": `off`,
    "no-inner-declarations": `off`,
    "prettier/prettier": `error`,
    quotes: [`error`, `backtick`],
    "react/display-name": `off`,
    "react/jsx-key": `warn`,
    "react/no-unescaped-entities": `off`,
    "react/prop-types": `off`,
    "require-jsdoc": `off`,
    "valid-jsdoc": `off`,
    "prefer-promise-reject-errors": `warn`,
    "no-prototype-builtins": `warn`,
    "guard-for-in": `warn`,
    "spaced-comment": [
      `error`,
      `always`,
      { markers: [`/`], exceptions: [`*`, `+`] },
    ],
    camelcase: [
      `error`,
      {
        properties: `never`,
        ignoreDestructuring: true,
        allow: [`^unstable_`],
      },
    ],
  },
  overrides: [
    {
      files: [
        `packages/**/gatsby-browser.js`,
        `packages/gatsby/cache-dir/**/*`,
      ],
      env: {
        browser: true,
      },
      globals: {
        ___loader: false,
        ___emitter: false,
      },
    },
    {
      files: [`**/cypress/integration/**/*`, `**/cypress/support/**/*`],
      globals: {
        cy: false,
        Cypress: false,
      },
    },
    {
      files: [`*.ts`, `*.tsx`],
      parser: `@typescript-eslint/parser`,
      plugins: [`@typescript-eslint/eslint-plugin`],
      extends: [`plugin:@typescript-eslint/recommended`],
      rules: {
        // We should absolutely avoid using ts-ignore, but it's not always possible.
        // particular when a dependencies types are incorrect.
        "@typescript-eslint/ban-ts-comment": [
          `warn`,
          { "ts-ignore": `allow-with-description` },
        ],
        // This rule is great. It helps us not throw on types for areas that are
        // easily inferrable. However we have a desire to have all function inputs
        // and outputs declaratively typed. So this let's us ignore the parameters
        // inferrable lint.
        "@typescript-eslint/no-inferrable-types": [
          `error`,
          { ignoreParameters: true },
        ],
        "@typescript-eslint/ban-types": [
          `error`,
          {
            extendDefaults: true,
            types: {
              "{}": {
                fixWith: `Record<string, unknown>`,
              },
              object: {
                fixWith: `Record<string, unknown>`,
              },
            },
          },
        ],
        camelcase: `off`,
        // TODO: These rules allow a lot of stuff and don't really enforce. If we want to apply our styleguide, we'd need to fix a lot of stuff
        "@typescript-eslint/naming-convention": [
          `error`,
          {
            selector: `default`,
            format: [`camelCase`],
          },
          {
            selector: `variable`,
            format: [`camelCase`, `UPPER_CASE`, `PascalCase`],
            leadingUnderscore: `allowSingleOrDouble`,
            trailingUnderscore: `allowSingleOrDouble`,
          },
          {
            selector: `function`,
            format: [`camelCase`, `PascalCase`],
            leadingUnderscore: `allow`,
          },
          {
            selector: `parameter`,
            format: [`camelCase`, `PascalCase`, `snake_case`],
            leadingUnderscore: `allowSingleOrDouble`,
          },
          {
            selector: `enumMember`,
            format: [`camelCase`, `UPPER_CASE`, `PascalCase`],
          },
          {
            selector: `typeLike`,
            format: [`PascalCase`],
          },
          {
            selector: `typeAlias`,
            format: [`camelCase`, `PascalCase`],
          },
          {
            selector: `property`,
            format: null,
          },
          {
            selector: `objectLiteralProperty`,
            format: null,
          },
          {
            selector: `enum`,
            format: [`PascalCase`, `UPPER_CASE`],
          },
          {
            selector: `method`,
            format: [`PascalCase`, `camelCase`],
            leadingUnderscore: `allowSingleOrDouble`,
          },
          {
            selector: `interface`,
            format: [`PascalCase`],
            prefix: [`I`],
          },
        ],
        // This rule tries to prevent using `require()`. However in node code,
        // there are times where this makes sense. And it specifically is causing
        // problems in our tests where we often want this functionality for module
        // mocking. At this point it's easier to have it off and just encourage
        // using top-level imports via code reviews.
        "@typescript-eslint/no-var-requires": `off`,
        "@typescript-eslint/no-extra-semi": `off`,
        // This rule ensures that typescript types do not have semicolons
        // at the end of their lines, since our prettier setup is to have no semicolons
        // e.g.,
        // interface Foo {
        // -  baz: string;
        // +  baz: string
        // }
        "@typescript-eslint/member-delimiter-style": [
          `error`,
          {
            multiline: {
              delimiter: `none`,
            },
          },
        ],
        "@typescript-eslint/no-empty-function": `off`,
        // This ensures that we always type the return type of functions
        // a high level focus of our TS setup is typing fn inputs and outputs.
        "@typescript-eslint/explicit-function-return-type": `error`,
        // This forces us to use interfaces over types aliases for object definitions.
        // Type is still useful for opaque types
        // e.g.,
        // type UUID = string
        "@typescript-eslint/consistent-type-definitions": [
          `error`,
          `interface`,
        ],
        "@typescript-eslint/no-use-before-define": [
          `error`,
          { functions: false },
        ],
        // Allows us to write unions like `type Foo = "baz" | "bar"`
        // otherwise eslint will want to switch the strings to backticks,
        // which then crashes the ts compiler
        quotes: `off`,
        "@typescript-eslint/quotes": [
          2,
          `backtick`,
          {
            avoidEscape: true,
          },
        ],
        // bump to @typescript-eslint/parser started showing Flow related errors in ts(x) files
        // so disabling them in .ts(x) files
        "flowtype/no-types-missing-file-annotation": `off`,
        "@typescript-eslint/array-type": [`error`, { default: `generic` }],
      },
    },
  ],
  settings: {
    react: {
      version: `18.2.0`,
    },
  },
}
```
