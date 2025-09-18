import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
 globalIgnores(["dist", "build"]),
 {
   files: ["**/*.{ts,tsx}"],
   languageOptions: {
     parser: tseslint.parser,
     ecmaVersion: 2020,
     sourceType: "module",
     globals: globals.browser,
   },
   plugins: {
     "@typescript-eslint": tseslint.plugin,
     import: importPlugin,
     "jsx-a11y": jsxA11y,
     react: reactPlugin,
     "react-hooks": reactHooks,
     "react-refresh": reactRefresh,
     prettier: prettierPlugin,
   },
   rules: {
     // ✅ REACT RULES
     "react/jsx-uses-react": "off", // for React 17+
     "react/react-in-jsx-scope": "off",
     "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
     "react/prop-types": "off",

     // ✅ HOOKS RULES
     "react-hooks/rules-of-hooks": "error",
     "react-hooks/exhaustive-deps": "warn",

     // ✅ IMPORT RULES
     "import/order": [
       "warn",
       {
         groups: [
           ["builtin", "external"],
           "internal",
           ["parent", "sibling", "index"],
         ],
         "newlines-between": "always",
       },
     ],
     "import/no-unresolved": "off", // turn on if needed

     // ✅ JSX A11Y
     "jsx-a11y/anchor-is-valid": "warn",

     // ✅ TYPESCRIPT RULES
     "@typescript-eslint/no-unused-vars": [
       "warn",
       { argsIgnorePattern: "^_" },
     ],
     "@typescript-eslint/explicit-function-return-type": "off",

     // ✅ PRETTIER
     "prettier/prettier": ["warn", { endOfLine: "auto" }],
     // "prettier/prettier": ["error", { endOfLine: "auto" }],
   },
   settings: {
     react: {
       version: "detect",
     },
   },
 },
 prettier, // ✅ Turns off rules that conflict with Prettier
]);

