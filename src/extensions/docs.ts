import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const {
    runtime: { brand },
    print: { info, newline, table },
  } = toolbox

  toolbox.docs = {
    printGeneratorUsage (generatorName:string, options:string[][] = []) {
      info(`Usage: ${brand} generate ${generatorName} <name>`)

      if (options && options.length) {
        newline()
        info('Options:')
        table(
          options,
          {
            style: {
              'padding-left': 1,
              'padding-right': 2,
            },
          },
        )
      }
    },
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
