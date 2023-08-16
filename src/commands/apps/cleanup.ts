import { SitevisionToolsToolbox } from '../../types'

module.exports = {
  name: 'cleanup',
  alias: [ 'cu' ],
  description: 'TODO',
  run: async (toolbox: SitevisionToolsToolbox) => {
    const {
      print: { info },
      // sitevisionApi,
    } = toolbox

    /// const url = ''
    // const numSaves = 2
    // await sitevisionApi.cleanup(url, numSaves)

    info('apps cleanup')
  },
}
