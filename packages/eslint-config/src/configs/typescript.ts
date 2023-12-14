import { GLOB_TS, GLOB_TSX, GLOB_SRC } from "../globs";
import type { ConfigItem } from "../types";
import { interopDefault, renameRules } from "../utils";

export async function typescript(): Promise<ConfigItem[]> {
  const [pluginTypescript, parserTypescript] = await Promise.all([
    interopDefault(import("@typescript-eslint/eslint-plugin")),
    interopDefault(import("@typescript-eslint/parser")),
  ]);

  return [
    {
      plugins: {
        typescript: pluginTypescript,
      },
    },
    {
      files: [GLOB_SRC],
      languageOptions: {
        parser: parserTypescript,
        parserOptions: {
          sourceType: "module",
          EXPERIMENTAL_useProjectService: true,
        },
      },
      rules: {
        // 厳密なルール + 型チェックのルールを有効化
        ...renameRules(
          pluginTypescript.configs["strict-type-checked"]!.rules!,
          "@typescript-eslint/",
          "typescript/"
        ),

        // コーディング規約 + 型チェックのルールを有効化
        ...renameRules(
          pluginTypescript.configs["stylistic-type-checked"]!.rules!,
          "@typescript-eslint/",
          "typescript/"
        ),

        // exportされている関数は型の明示を必須にする
        "typescript/explicit-module-boundary-types": "warn",

        // 型をexportする際に`type`の付与を必須にする
        "typescript/consistent-type-exports": [
          "error",
          {
            fixMixedExportsWithInlineTypeSpecifier: true,
          },
        ],

        // 型をimportする際に`type`の付与を必須にする
        "typescript/consistent-type-imports": "error",

        // `_`から始まる変数名以外の未使用変数を警告
        "typescript/no-unused-vars": [
          "warn",
          {
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
          },
        ],

        // 副作用の可能性のあるtype importを警告
        "typescript/no-import-type-side-effects": "warn",

        // なるべくreadonlyを付与する
        "typescript/prefer-readonly": "warn",

        // `Promise`を返す関数は`async`を付与する
        "typescript/promise-function-async": "error",

        // ソートでは必ず比較関数を渡す
        "typescript/require-array-sort-compare": "error",

        // `return await`を使う
        // 一貫性のためと、awaitが無くなったときにasyncを外すのは面倒なため
        // また、スタックトレースが読みやすくなる
        "typescript/return-await": ["warn", "always"],

        // if文にboolean以外を許可しない
        "typescript/strict-boolean-expressions": [
          "error",
          {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false,
          },
        ],
      },
    },
    {
      files: [GLOB_TS, GLOB_TSX],
      rules: {
        // ESLintの推奨ルールからTypeScriptで検証可能なものを無効化
        ...pluginTypescript.configs["eslint-recommended"]!.overrides![0]!
          .rules!,
      },
    },
  ];
}
