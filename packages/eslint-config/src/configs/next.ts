import { GLOB_SRC } from "../globs";
import type { ConfigItem } from "../types";
import { interopDefault, renameRules } from "../utils";

export async function next(): Promise<ConfigItem[]> {
	// @ts-expect-error: This package don't have types
	// eslint-disable-next-line typescript/no-unsafe-assignment
	const pluginNext = await interopDefault(import("@next/eslint-plugin-next"));

	return [
		{
			name: "shun-shobon/next/setup",
			plugins: {
				// eslint-disable-next-line typescript/no-unsafe-assignment
				next: pluginNext,
			},
		},
		{
			name: "shun-shobon/next/rules",
			files: [GLOB_SRC],
			rules: {
				// Next.jsの推奨ルールを有効化
				...renameRules(
					// eslint-disable-next-line typescript/no-unsafe-argument, typescript/no-unsafe-member-access
					pluginNext.configs.recommended.rules,
					"@next/next/",
					"next/",
				),

				// Next.jsの更に厳格なルールを有効化
				...renameRules(
					// eslint-disable-next-line typescript/no-unsafe-argument, typescript/no-unsafe-member-access
					pluginNext.configs["core-web-vitals"].rules,
					"@next/next/",
					"next/",
				),

				// `img`要素を使う場合もあるので無効化
				"next/no-img-element": "off",
			},
		},
	];
}
