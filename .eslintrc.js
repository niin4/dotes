module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "google",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "linebreak-style": ["off"],
        "require-jsdoc": ["off"],
        "indent": ["error", 2],
        "object-curly-spacing": ["off"],
        "react/prop-types": ["off"],
        "react-hooks/exhaustive-deps": ["off"]
    }
};