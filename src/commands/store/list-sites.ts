import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'list-sites',
  alias: [ 'list', 'ls' ],
  description: 'Lists all sites in store.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info, newline, table },
      store,
    } = toolbox

    const sites = await store.getSites()

    newline()
    info(`Sites (${sites.length})`)
    table([
      [ 'Title', 'URL', 'User', 'Pass' ],
      [ '-----', '---', '----', '----' ],
      ...sites.map(({ title, url, user, pass }) => [ title, url, user, pass ])
    ])
  }
}
