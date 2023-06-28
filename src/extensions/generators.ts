import { GluegunToolbox } from 'gluegun'
import { Generators, Generator, SimpleGenerator, GeneratorWrapper } from '../types'

module.exports = (toolbox: GluegunToolbox) => {
  const { runtime: { brand } } = toolbox

  /**
   * Get all generators from the config object.
   * 
   * @returns {Generators}
   */
  const getAll = (): Generators => {
    const { config } = toolbox
    
    return config[brand]?.generators || {}
  }

  /**
   * Foo Bar
   */
  const get = (name: string): Generator | SimpleGenerator | null => {
    const generators: Generators = getAll()

    if (typeof generators[name] === 'function') {
      return (generators[name] as GeneratorWrapper)(toolbox)
    } else if (typeof generators[name] === 'object') {
      return (generators[name] as SimpleGenerator)
    }

    return null
  }

  toolbox.generators = {
    getAll,
    get
  }
}
