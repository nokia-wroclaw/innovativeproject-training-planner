module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true,
  },
  "ignorePatterns": ["**/node_modules", "client/build"],
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    "sourceType": "module",
    'ecmaVersion': 2018,
  },
  'plugins': [
    'react',
  ],
  "settings": {
    "react": {
      "version": "latest"
    }
  },
  'rules': {
    "react/prop-types": 0,
    "new-cap": [0, { "capIsNewExceptions": ["Router"] }],
    "require-jsdoc": 0
  },
};
