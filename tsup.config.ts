import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/eslint/index.ts", "src/prettier/index.ts"],
	format: ["esm", "cjs"],
	dts: true,
	sourcemap: true,
	clean: true,
	shims: true,
});
