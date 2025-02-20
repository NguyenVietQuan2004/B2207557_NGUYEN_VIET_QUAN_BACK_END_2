import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Cấu hình cho môi trường
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Các biến toàn cục trong trình duyệt (window, document, v.v.)
        ...globals.node, // Các biến toàn cục trong Node.js
      },
      ecmaVersion: 2021, // Sử dụng ECMAScript 2021
      sourceType: "module", // Hỗ trợ ES Modules
    },
  },
  // Cấu hình cơ bản từ pluginJs
  pluginJs.configs.recommended,
];
