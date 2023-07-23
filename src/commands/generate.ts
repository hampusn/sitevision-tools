import { GluegunToolbox } from 'gluegun'
import { Generator } from '../types'

module.exports = {
  name: 'generate',
  alias: ['g'],
  description: 'Generate files for things such as a webapp component, a script module or something else.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { newline, info, error },
      generators
    } = toolbox

    const generator: Generator = generators.get(parameters.first)

    if (!generator) {
      if (parameters.first) {
        error(`No generator by the name of '${parameters.first}' found.`)
      } else {
        error('You need to pass a generator name as an argument.')
      }

      newline()
      await generators.get('help')?.run()
      
      return null
    }

    if (parameters.options.help) {
      if (typeof generator.help === 'function') {
        await generator.help(toolbox)
      } else if (typeof generator.help === 'string') {
        info(generator.help)
      }

      return null
    }

    if (!parameters.second && !generator.optionalName) {
      error(`<name> is a required argument.`)
      newline()
      await generators.get('help')?.run()
      
      return null
    }

    if (typeof generator.run === 'function') {
      return await generator.run()
    }
  },
}
