import { GluegunToolbox } from 'gluegun'
import { cosmiconfigSync } from 'cosmiconfig'
import { dirname } from 'path'

module.exports = (toolbox: GluegunToolbox) => {
  const { runtime: { brand } } = toolbox
  const explorer = cosmiconfigSync(brand)

  // Setup projectDir
  const filepath = explorer.search()?.filepath
  toolbox.projectDir = filepath ? dirname(filepath) : null
}
