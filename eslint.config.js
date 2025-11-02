import js from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-conditional-expect": "error",
      "jest/no-identical-title": "error",
    },
  },
  {
    files: ["test/**/*.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        jest: "readonly",
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-conditional-expect": "error",
      "jest/no-identical-title": "error",
    },
  },
];