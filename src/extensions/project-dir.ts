import { GluegunToolbox } from 'gluegun'
import { cosmiconfigSync } from 'cosmiconfig'
import { dirname } from 'path'
import { ProjectDirExtension } from '../types'

module.exports = (toolbox: GluegunToolbox) => {
  const { runtime: { brand } } = toolbox
  const explorer = cosmiconfigSync(brand)

  // Setup projectDir
  const filepath = explorer.search()?.filepath
  toolbox.projectDir = <ProjectDirExtension>(filepath ? dirname(filepath) : null)
}
