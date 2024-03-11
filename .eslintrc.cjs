module.exports = {
  extends: ["plugin:astro/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        extraFileExtensions: [".astro"],
      },
      processor: "astro/client-side-ts",
      rules: {
        "prettier/prettier": "off",
      },
    },
  ],
};
