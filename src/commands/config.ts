import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'config',
  run: async (toolbox: GluegunToolbox) => {
    const {
      config,
      print: { info },
    } = toolbox

    info(config.get({ foo: true, bar: 'yo' }))
  },
}
