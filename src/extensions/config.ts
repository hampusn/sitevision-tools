
// import deepmerge from 'deepmerge'
import { deepmerge } from 'deepmerge-ts'
import { GluegunToolbox } from 'gluegun'
import { cosmiconfigSync } from 'cosmiconfig'
import { dirname, resolve } from 'path'
import * as generators from '../generators'

export default (toolbox: GluegunToolbox) => {
  const { pluginName } = toolbox
  const explorer = cosmiconfigSync(pluginName)

  const getParentDir = (dir) => resolve(dir, '..')

  const collectConfigs = () => {
    const configs = []
    let dir = ''
    let conf;

    while (conf = explorer.search(dir)) {
      configs.push(conf.config)
      dir = getParentDir(dirname(conf.filepath))
    }

    return configs
  }

  // Inject deep merged configurations.
  toolbox.config = deepmerge(
    {
      [pluginName]: {
        // Builtin generators
        generators
      },
    },
    toolbox.config,
    ...collectConfigs()
  )
}
