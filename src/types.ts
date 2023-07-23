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
 * A function which should a Generator
 */
export type GeneratorWrapper = (toolbox?: GenerateCommandToolbox) => Generator

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
   * 
   */
  template: string;

  /**
   * 
   */
  target: string;

  /**
   * An optional callback which takes the toolbox and context from 
   * SimpleGenerator.context callback. Returns a boolean for if 
   * the file should be created for not.
   * 
   * @param toolbox 
   * @returns 
   */
  condition?: (toolbox: GenerateCommandToolbox, contextData?: Record<string, any>) => boolean;
}

export type SimpleGenerator = {
  files: Array<SimpleGeneratorFile>;

  /**
   * 
   */
  dir?: string;

  /**
   * 
   * @param data 
   * @param toolbox 
   * @returns 
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