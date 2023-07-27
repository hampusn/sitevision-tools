import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'remove-site',
  alias: [ 'remove', 'rm' ],
  description: 'Remove a site from store.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      prompt,
      print: { info, error, success, checkmark, xmark },
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
        message: 'Which site would you like to remove?',
        choices: (await store.getSites()).map(({ title, url }) => ({ message: `${title} (${url})`, name: url })),
      })).url

      site = await store.getSite(url)
    }

    if (!site) {
      error(`No site found for URL: ${url}`)
      return
    }

    const confirm = await prompt.confirm(`Are you sure you want to remove ${site.title} (${site.url})?`, false)

    if (!confirm) {
      info('Removal aborted.')
      return
    }

    const removed = await store.removeSite(site.url)

    if (removed) {
      success(`${checkmark} site removed.`)
    } else {
      error(`${xmark} removal failed.`)
    }
  }
}



