import { ConfigCommandToolbox } from '../types'

module.exports = {
  name: 'config',
  alias: ['c'],
  description: 'Get information about the current configuration in your CWD.',
  run: async (toolbox: ConfigCommandToolbox) => {
    const {
      config,
      print: { info, muted, newline },
      flags,
    } = toolbox

    info('Collected configurations:')
    config.getCollected().map(fp => info(`- ${fp}`))
    
    if (flags.verbose) {
      newline()
      muted('Merged configuration:')
      muted(config.get())
    }
  },
}
