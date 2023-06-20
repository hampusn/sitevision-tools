import { GluegunToolbox } from 'gluegun'
// import { findUpSync } from 'find-up'
import { Generators, Generator, SimpleGenerator, GeneratorWrapper } from '../types'
import { cosmiconfigSync } from 'cosmiconfig'
import { dirname/* , resolve */ } from 'path'

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  const { pluginName } = toolbox
  const explorer = cosmiconfigSync(pluginName)

  // Setup projectDir
  const filepath = explorer.search()?.filepath
  toolbox.projectDir = filepath ? dirname(filepath) : null

  toolbox.foo = () => {
    toolbox.print.info('called foo extension')
  }

  toolbox.getGenerators = (): Generators => {
    const { config } = toolbox
    
    return config[pluginName]?.generators || {}
  }

  toolbox.getGenerator = (name: string): Generator | SimpleGenerator | null => {
    const generators: Generators = toolbox.getGenerators()

    if (typeof generators[name] === 'function') {
      return (generators[name] as GeneratorWrapper)(toolbox)
    } else if (typeof generators[name] === 'object') {
      return (generators[name] as SimpleGenerator)
    }

    return null
  }

  toolbox.print.info(toolbox.filesystem.cwd())
}
