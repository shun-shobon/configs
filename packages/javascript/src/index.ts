import { type Config, defineConfig } from "@shun-shobon/eslint-config-utils";
import { GLOB_SRC } from "@shun-shobon/eslint-config-utils/globs";

import * as basic from "./basic";
import * as imports from "./imports";
import * as unicorn from "./unicorn";

export const plugins: Config.Plugins = {
  ...imports.plugins,
  ...unicorn.plugins,
};

export const rules: Config.Rules = {
  ...basic.rules,
  ...imports.rules,
  ...unicorn.rules,
};

export default defineConfig({
  files: [GLOB_SRC],
  plugins,
  rules,
});
