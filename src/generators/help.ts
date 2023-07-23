import { GluegunToolbox } from 'gluegun'
import { Generators, Generator } from '../types'

export default (toolbox: GluegunToolbox) => <Generator>({
  description: 'Prints information about the available generators.',
  optionalName: true,
  async run () {
    const {
      runtime: { brand },
      print: { info, newline, table },
    } = toolbox

    const rows = []
    const generators: Generators = toolbox.generators.getAll()

    for (const [generatorName, gen] of Object.entries(generators)) {
      const desc = typeof gen === 'function' ? gen().description : gen.description

      rows.push([ generatorName, desc ])
    }
    
    info(`${brand} generate <generator> <name>`)
    
    newline()
    info('Generators:')

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
})
