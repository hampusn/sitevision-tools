
// import deepmerge from 'deepmerge'
import { deepmerge } from 'deepmerge-ts'
import { GluegunToolbox } from 'gluegun'
import { cosmiconfigSync } from 'cosmiconfig'
import { dirname, resolve } from 'path'
import * as generators from '../generators'
import { CONFIG_FILE_NAME } from '../consts'
import pick from 'lodash.pick'

export default (toolbox: GluegunToolbox) => {
  const { runtime: { brand } } = toolbox
  const explorer = cosmiconfigSync(brand)

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

  const save = (conf) => {
    toolbox.filesystem.write(CONFIG_FILE_NAME, {
      [brand]: conf
    })
  }

  const get = (defaults = {}, namespace = brand) => {
    return deepmerge(
      toolbox.config[namespace],
      defaults,
      pick(toolbox.parameters.options, Object.keys(defaults))
    )
  }

  // Inject deep merged configurations.
  toolbox.config = deepmerge(
    {
      [brand]: {
        // Builtin generators
        generators
      },
    },
    toolbox.config,
    ...collectConfigs(),
    {
      save,
      get,
    }
  )
}
