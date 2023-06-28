import { GluegunToolbox } from 'gluegun'
import { cosmiconfigSync } from 'cosmiconfig'
import { dirname/* , resolve */ } from 'path'

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  const { runtime: { brand } } = toolbox
  const explorer = cosmiconfigSync(brand)

  // Setup projectDir
  const filepath = explorer.search()?.filepath
  toolbox.projectDir = filepath ? dirname(filepath) : null

  toolbox.foo = () => {
    toolbox.print.info('called foo extension')
  }

  toolbox.print.info(toolbox.filesystem.cwd())
}
