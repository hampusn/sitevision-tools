import { GluegunToolbox } from 'gluegun'

// export types

export type Generators = {
  [key: string]: GeneratorWrapper | SimpleGenerator;
}

/**
 * A function which should a Generator
 */
export type GeneratorWrapper = (toolbox?: GluegunToolbox) => Generator

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
  condition?: (toolbox: GluegunToolbox, contextData?: Record<string, any>) => boolean;
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
  context?: (data: StringTemplateData, toolbox: GluegunToolbox) => StringTemplateData;

  /**
   * A description which is shown when generators are listed.
   */
  description: string;

  /**
   * A help text which could print arguments and options for the generator.
   */
  help?: string | Function;
}
