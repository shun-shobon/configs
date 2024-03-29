import { GLOB_STORYBOOK, GLOB_STORYBOOK_CONFIG } from "../globs";
import type { ConfigItem } from "../types";
import { interopDefault } from "../utils";

export async function storybook(): Promise<ConfigItem[]> {
	// eslint-disable-next-line typescript/no-unsafe-assignment
	const [pluginStorybook] = await Promise.all([
		// @ts-expect-error: This package don't have types
		interopDefault(import("eslint-plugin-storybook")),
	]);

	return [
		{
			plugins: {
				// eslint-disable-next-line typescript/no-unsafe-assignment
				storybook: pluginStorybook,
			},
		},
		{
			files: [GLOB_STORYBOOK],
			rules: {
				// Storybookの推奨ルールから拝借
				"import/no-anonymous-default-export": "off",
				"storybook/await-interactions": "error",
				"storybook/context-in-play-function": "error",
				"storybook/default-exports": "error",
				"storybook/hierarchy-separator": "warn",
				"storybook/no-redundant-story-name": "warn",
				"storybook/prefer-pascal-case": "warn",
				"storybook/story-exports": "error",
				"storybook/use-storybook-expect": "error",
				"storybook/use-storybook-testing-library": "error",
			},
		},
		// Storybookの設定ファイルへのルール
		{
			files: [GLOB_STORYBOOK_CONFIG],
			rules: {
				"storybook/no-uninstalled-addons": "error",
			},
		},
	];
}
