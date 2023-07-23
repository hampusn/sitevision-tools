import { GluegunCommand } from 'gluegun'
import { CLI_NAME } from '../consts'

const command: GluegunCommand = {
  name: 'sitevision-tools',
  run: async (toolbox) => {
    const {
      print: { newline, info, table },
      meta: { version, checkForUpdate },
    } = toolbox

    newline()
    info(CLI_NAME)

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
