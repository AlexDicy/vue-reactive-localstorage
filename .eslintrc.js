module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
    rules: {
        "semi": ["error", "always"],
        "indent": ["error", 4],
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always"
        }],
        "quotes": ["error", "double"]
    }
};