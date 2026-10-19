import tseslint from "typescript-eslint";

const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "out/**", "build/**"] },
  ...tseslint.configs.recommended,
];
export default config;
