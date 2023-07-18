import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'config',
  alias: ['c'],
  description: 'Get information about the current configuration in your CWD.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      config,
      print: { info, newline },
    } = toolbox

    info('Collected configurations:')
    config.getCollected().map(fp => info(`- ${fp}`))
    
    newline()
    info('Merged configuration:')
    info(config.get())
  },
}
