import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'store',
  alias: ['s'],
  description: 'Credentials store. Main command prints information about the store.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info, table, newline },
      store,
    } = toolbox

    const stats = await store.getStoreStats()
    const machineId = await store.getMachineId()

    newline()
    info('Generic')
    table([
      [ 'Store path', stats.storeFile ],
      [ 'Store exists', stats.storeExists ],
      [ 'Store password', machineId ],
    ])

    newline()
    info('Groups')
    table([
      [ 'Name', 'Num entries' ],
      ...stats.groups.map((g) => Object.values(g)),
    ])
  },
}
