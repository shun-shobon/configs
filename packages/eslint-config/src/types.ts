import type { FlatGitignoreOptions } from "eslint-config-flat-gitignore";
import type { FlatESLintConfig } from "eslint-define-config";

export type Awaitable<T> = T | Promise<T>;

export interface ConfigItem extends Omit<FlatESLintConfig, "plugins"> {
	/**
	 * For inspector.
	 */
	name?: string;
	/**
	 * Relax plugins type limitation, as most of the plugins did not have correct
	 * type info yet.
	 */
	// eslint-disable-next-line typescript/no-explicit-any
	plugins?: Record<string, any>;
}

export interface OptionsConfig
	extends OptionsComponentExts,
		OptionsDisableTypeCheckedFiles {
	/**
	 * Ignore files.
	 *
	 * @defaultValue some common ignore files
	 */
	ignores?: string[];

	/**
	 * Enable .gitignore support.
	 *
	 * Passing an object to configure the options.
	 *
	 * @defaultValue `true`
	 * @see https://github.com/antfu/eslint-config-flat-gitignore
	 */
	gitignore?: boolean | FlatGitignoreOptions;

	/**
	 * Enable TypeScript support.
	 *
	 * @defaultValue it will be auto-detected based on the dependencies.
	 */
	typescript?: boolean;

	/**
	 * Enable React support.
	 *
	 * @defaultValue it will be auto-detected based on the dependencies.
	 */
	react?: boolean;

	/**
	 * Enable Next.js support.
	 *
	 * @defaultValue it will be auto-detected based on the dependencies.
	 */
	next?: boolean;

	/**
	 * Enable Qwik support.
	 *
	 * @defaultValue it will be auto-detected based on the dependencies.
	 */
	qwik?: boolean;

	/**
	 * Enable Astro support.
	 *
	 * @defaultValue it will be auto-detected based on the dependencies.
	 */
	astro?: boolean;

	/**
	 * Enable Storybook support.
	 *
	 * @defaultValue it will be auto-detected based on the dependencies.
	 */
	storybook?: boolean;
}

export interface OptionsHasTypeScript {
	/**
	 * Enable TypeScript support.
	 */
	typescript?: boolean;
}

export interface OptionsComponentExts {
	/**
	 * Additional extensions for component files.
	 *
	 * @example Astro and Svelte
	 *
	 * ```ts
	 * {
	 * 	"componentExts": ["astro", "svelte"]
	 * }
	 * ```
	 *
	 * @defaultValue The default is `[]`, but it will be auto-detected based on the dependencies.
	 */
	componentExts?: string[];
}

export interface OptionsDisableTypeCheckedFiles {
	/**
	 * Glob patterns of files to disable type checking.
	 *
	 * @defaultValue `[]`
	 */
	disableTypeCheckedFiles?: string[];
}
