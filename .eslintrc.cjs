module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-var-requires": false,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
      alias: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
        map: [
          ["@components", "./src/components"],
          ["@pages", "./src/pages"],
          ["@router", "./src/router"],
          ["@store", "./src/store"],
          ["@styles", "./src/styles"],
          ["@/types", "./src/types"],
          ["@utils", "./src/utils"],
        ],
      },
    },
  },
};
