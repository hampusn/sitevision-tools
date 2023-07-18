import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'sitevision-tools',
  run: async (toolbox) => {
    const {
      print: { newline, info, table },
      meta: { version, checkForUpdate },
    } = toolbox

    newline()
    info('Sitevision Tools')

    const newVersion = await (async () => {
      try {
        return await checkForUpdate()
      } catch (_) {}

      return 'unknown'
    })()
    
    const rows = [
      [ 'Project directory', toolbox.projectDir ],
      [ 'Current version', version() ],
      [ 'New version', String(newVersion) ],
    ]

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
}

module.exports = command
