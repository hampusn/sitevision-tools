import { GluegunToolbox } from 'gluegun'

// export types

export interface GenerateCommandToolbox extends GluegunToolbox {
  prompt: null
  http: null
  system: null
  packageManager: null
}

export interface ConfigCommandToolbox extends GluegunToolbox {
  prompt: null
  http: null
  system: null
  packageManager: null
}

export interface InitCommandToolbox extends GluegunToolbox {
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
export type GeneratorWrapper = (toolbox?: GenerateCommandToolbox | GluegunToolbox) => Generator

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
  help?: string | Function;

  /**
   * Assign true if the name parameter (second argument) is optional.
   */
  optionalName?: boolean;
}
