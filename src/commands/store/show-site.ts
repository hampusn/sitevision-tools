import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'show-site',
  alias: [ 'show' ],
  description: 'Show credentials for a stored site.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      prompt,
      parameters,
      print: { error, table },
      store,
    } = toolbox

    let site: Record<string, string>
    let url = parameters.first

    if (!url || !(site = await store.getSite(url))) {
      if (url && !site) {
        error(`No site found for URL: ${url}`)
      }

      url = (await prompt.ask({
        type: 'select',
        name: 'url',
        message: 'Which site would you like to view?',
        choices: (await store.getSites()).map(({ title, url }) => ({ message: `${title} (${url})`, name: url })),
      })).url

      site = await store.getSite(url)
    }

    if (!site) {
      error(`No site found for URL: ${url}`)
      return
    }

    table(Object.entries(site))
  }
}
