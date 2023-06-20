import { GluegunToolbox } from 'gluegun'
import { Generators, Generator } from '../types'

export default (toolbox: GluegunToolbox) => <Generator>({
  async run () {
    const {
      print: { info, table },
    } = toolbox

    const rows = []
    const generators: Generators = toolbox.getGenerators()

    for (const [generatorName, gen] of Object.entries(generators)) {
      const desc = typeof gen === 'function' ? gen().description : gen.description

      rows.push([ generatorName, desc ])
    }
    
    info('Available generators:')

    table(
      rows,
      {
        style: {
          'padding-left': 1,
          'padding-right': 2,
        },
      },
    )
  },
  description: 'Prints information about the available generators.'
})
