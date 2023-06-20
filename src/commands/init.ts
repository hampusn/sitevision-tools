import { GluegunToolbox } from 'gluegun'
import { cosmiconfigSync } from 'cosmiconfig'
import { basename, dirname } from 'path'

module.exports = {
  name: 'init',
  run: async (toolbox: GluegunToolbox) => {
    const {
      pluginName,
      /* parameters, */
      config,
      /* filesystem, */
      print: { info },
    } = toolbox

    const explorer = cosmiconfigSync(pluginName)

    info(explorer.search())

    const dir = dirname(explorer.search()?.filepath)
    const base = basename(dir)

    info('dir: ' + dir)
    info('base: ' + base)
  /* 
    toolbox.projectDir = 
  
  
    const rootPath = findUpSync(YEOMAN_CONFIG_FILE_NAME, {
      cwd: instance.destinationRoot()
    }) */
  
  
  




    info(`INFO!`)
    // info(parameters)

    // const myConfig = loadConfig(pluginName, process.cwd())

    info(config)

  },
}
