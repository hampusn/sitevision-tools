
import { deepmergeCustom } from 'deepmerge-ts'
import { GluegunToolbox } from 'gluegun'
import { cosmiconfigSync } from 'cosmiconfig'
import { dirname, resolve } from 'path'
import * as generators from '../generators'
import { CONFIG_FILE_NAME } from '../consts'
import pick from 'lodash.pick'
import { ConfigExtension } from '../types'

export const deepmerge = deepmergeCustom({
  mergeOthers(values, utils /*, meta */) {
    // When string fields are overriden, make sure empty strings 
    // don't override previous values.
    if (values.every((v) => typeof v === 'string')) {
      return values.filter((v) => !!v).pop() || ''
    }

    return utils.actions.defaultMerge
  }
})

export default (toolbox: GluegunToolbox) => {
  const { runtime: { brand } } = toolbox
  const explorer = cosmiconfigSync(brand)

  const getParentDir = (dir) => resolve(dir, '..')

  const collectConfigs = (onlyConfig = true) => {
    const configs = []
    let dir = ''
    let conf

    while (conf = explorer.search(dir)) {
      configs.unshift(onlyConfig ? conf.config : conf)
      dir = getParentDir(dirname(conf.filepath))
    }

    return configs
  }

  const getCollected = (): string[] => {
    return collectConfigs(false).map(conf => conf.filepath)
  }

  const save = (conf) => {
    toolbox.filesystem.write(CONFIG_FILE_NAME, {
      [brand]: conf
    })
  }

  const configPath = (): string => {
    return toolbox.filesystem.path(CONFIG_FILE_NAME)
  }

  const get = (defaults = {}, namespace = brand) => {
    return deepmerge(
      defaults,
      toolbox.config[namespace],
      pick(toolbox.parameters.options, Object.keys(defaults))
    )
  }

  // Inject deep merged configurations.
  toolbox.config = <ConfigExtension>deepmerge(
    {
      [brand]: {
        // Builtin generators
        generators
      },
    },
    toolbox.config,
    ...collectConfigs(),
    {
      getCollected,
      save,
      configPath,
      get
    }
  )
}
