import { GluegunToolbox } from 'gluegun'
import { Options } from 'gluegun/build/types/domain/options'
import { Entry } from 'buttercup'

// export types

/**
 * Config extension belonging to Sitevision Tools. Extends default config object with helper methods.
 */
export type ConfigExtension = Options & {
  /**
   * Returns an array with filepaths to all collected config files.
   */
  getCollected: () => string[]

  /**
   * Save a configuration to file (`./.sitevision-toolsrc.json`) under the namespace 'sitevision-tools'.
   * Should not really be used to store plugin configuration.
   */
  save: (conf: Record<string, any>) => void

  /**
   * TODO: Not used anymore? Remove?
   */
  configPath: () => string

  /**
   * Gets the current configuration merged with defaults. If defaults are used, they can also be overriden with CLI options.
   * This extension method will normalize the config and unwrap the [brand] key. If you are using this in a plugin, 
   * pass your plugin name as the namespace to get your plugin config.
   * 
   * @example
   * ```js
   * // Used in a command 
   * toolbox.config.get({ foo: { bar: 'yup' } })
   * ```
   * 
   * Call CLI example command without option:
   * ```sh
   * $ sitevision-tools example-command
   * > { foo: { bar: 'yup' }, ... }
   * ```
   * 
   * Call CLI example command with option overriden:
   * ```sh
   * $ sitevision-tools example-command --foo.bar nope
   * > { foo: { bar: 'nope' }, ... }
   * ```
   */
  get: (defaults?: Record<string, any>, namespace?: string) => Record<string, any>
}

export type DocsExtension = {
  printGeneratorUsage: (generatorUsage: GeneratorUsage) => void
}

export type FlagsExtension = {
  verbose:boolean
}

export type GeneratorsExtension = {
  getAll: () => Generators
  get: (name: string) => Generator | null
}

/**
 * Absolute path to the current project's root directory.
 */
export type ProjectDirExtension = string | null

export type StoreSite = {
  url:string
  user:string
  pass:string
  title?:string
}

export type StoreExtension = {
  getMachineId: () => Promise<string>
  addSite: (site: StoreSite) => Promise<string>
  getSite: (url: string, propsOnly?: boolean) => Promise<StoreSite | Entry | null>
  getSites: () => Promise<StoreSite[]>
  removeSite: (url: string, skipTrash?: boolean) => Promise<boolean>
  updateSite: (url: string, updates: Record<string, string>) => Promise<boolean>
  getStoreStats: () => Promise<Record<string, any>>
  emptyTrash: () => Promise<boolean>
}

export interface SitevisionToolsToolbox extends GluegunToolbox {
  config: ConfigExtension
  docs: DocsExtension
  store: StoreExtension
  projectDir: ProjectDirExtension
  generators: GeneratorsExtension
  flags: FlagsExtension
}

export interface GenerateCommandToolbox extends SitevisionToolsToolbox {
  prompt: null
  http: null
  system: null
  packageManager: null
}

export interface ConfigCommandToolbox extends SitevisionToolsToolbox {
  prompt: null
  http: null
  system: null
  packageManager: null
}

export interface InitCommandToolbox extends SitevisionToolsToolbox {
  http: null
  system: null
  packageManager: null
}

export type Generators = {
  [key: string]: GeneratorWrapper | SimpleGenerator;
}

/**
 * A function which should return a Generator.
 */
export type GeneratorWrapper = (toolbox?: GenerateCommandToolbox | SitevisionToolsToolbox | GluegunToolbox) => Generator

export type Generator = {
  /**
   * The generator's main callback which handles all logic.
   * This is were you create the files.
   */
  run: Function;

  /**
   * A description which is shown when generators are listed.
   */
  description: string;

  /**
   * A help text which could print arguments and options for the generator.
   */
  help?: string | Function;

  /**
   * Assign true if the name parameter (second argument) is optional.
   */
  optionalName?: boolean;
}

export type StringTemplateData = {
  [key: string]: any;
}

export type SimpleGeneratorFile = {
  /**
   * A file path to the template. This will be relative to SimpleGenerator.dir if that exists.
   */
  template: string;

  /**
   * A relative file path where the file should be created. This is relative from the project root.
   */
  target: string;

  /**
   * An optional callback which takes the toolbox and context from 
   * SimpleGenerator.context callback. Returns a boolean for if 
   * the file should be created for not.
   */
  condition?: (toolbox: GenerateCommandToolbox, contextData?: Record<string, any>) => boolean;
}

export type SimpleGenerator = {
  /**
   * An array of template files to be generated when this generator is used.
   */
  files: Array<SimpleGeneratorFile>;

  /**
   * A directory path to where your template files are located.
   */
  dir?: string;

  /**
   * A callback function which can be used to modify the context which is passed to the template files (.ejs).
   * You will most likely want to extend the data unless you are sure you don't need anything from the default context.
   */
  context?: (data: StringTemplateData, toolbox: GenerateCommandToolbox) => StringTemplateData;

  /**
   * A description which is shown when generators are listed.
   */
  description: string;

  /**
   * A help text which could print arguments and options for the generator.
   */
  help?: string | Function | GeneratorUsageHelp;

  /**
   * Assign true if the name parameter (second argument) is optional.
   */
  optionalName?: boolean;
}

export type GeneratorUsageArgument = [
  name: string,
  description?: string,
]
export type GeneratorUsageOption = [
  names: string|string[],
  description?: string,
]

export type GeneratorUsage = {
  generatorName: string;
  description?: string;
  args?: GeneratorUsageArgument[];
  options?: GeneratorUsageOption[];
}

export type GeneratorUsageHelp = Omit<GeneratorUsage, 'generatorName'>
