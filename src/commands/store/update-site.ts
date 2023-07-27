import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'update-site',
  alias: [ 'update', 'up' ],
  description: 'Update stored data for a site.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      prompt,
      print: { info, error },
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
        message: 'Which site would you like to update?',
        choices: (await store.getSites()).map(({ title, url }) => ({ message: `${title} (${url})`, name: url })),
      })).url

      site = await store.getSite(url)
    }

    if (!site) {
      error(`No site found for URL: ${url}`)
      return
    }

    const updates = await prompt.ask([
      {
        type: 'input',
        name: 'title',
        message: 'Title',
        required: true,
        initial: site.title,
      },
      {
        type: 'input',
        name: 'url',
        message: 'URL',
        required: true,
        initial: site.url,
      },
      {
        type: 'input',
        name: 'user',
        required: true,
        message: 'Username',
        initial: site.user,
      },
      {
        type: 'password',
        name: 'pass',
        required: true,
        message: 'Password',
        initial: site.pass,
      },
    ])

    await store.updateSite(url, updates)

    info('update-site')
  }
}



