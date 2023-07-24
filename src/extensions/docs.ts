import { GluegunToolbox } from 'gluegun'
import { GeneratorUsage } from '../types'

module.exports = (toolbox: GluegunToolbox) => {
  const {
    runtime: { brand },
    print: { info, newline, table },
  } = toolbox

  const defaultTableOptions = {
    style: {
      'padding-left': 1,
      'padding-right': 2,
    },
  }

  const hyphenateOption = (opt: string) => opt.length > 1 ? `--${opt}` : `-${opt}`

  const printGeneratorUsage = (generatorUsage: GeneratorUsage) => {
    const {
      generatorName,
      description,
      args,
      options,
    } = generatorUsage

    if (description) {
      info(description)
      newline()
    }

    const argumentsString = args.map(([ name ]) => `<${name}>`).join(' ')
    info(`Usage: ${brand} generate ${generatorName} ${argumentsString}`)

    if (args && args.length) {
      newline()
      info('Arguments:')
      table(
        args,
        defaultTableOptions,
      )
    }

    if (options && options.length) {
      const normalizedOptions = options.map(([names, description]) => {
        return [
          Array.isArray(names) ? names.map(name => hyphenateOption(name)).join('|') : hyphenateOption(names),
          description,
        ]
      })

      newline()
      info('Options:')
      table(
        normalizedOptions,
        defaultTableOptions,
      )
    }
  }

  toolbox.docs = {
    printGeneratorUsage,
    /* ... */
  }
}


/*

Naval Fate.

Usage:
  naval_fate ship new <name>...
  naval_fate ship <name> move <x> <y> [--speed=<kn>]
  naval_fate ship shoot <x> <y>
  naval_fate mine (set|remove) <x> <y> [--moored|--drifting]
  naval_fate -h | --help
  naval_fate --version

Options:
  -h --help     Show this screen.
  --version     Show version.
  --speed=<kn>  Speed in knots [default: 10].
  --moored      Moored (anchored) mine.
  --drifting    Drifting mine.

*/
