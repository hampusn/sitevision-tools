import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'add-site',
  alias: [ 'add' ],
  description: 'Store credentials for a site.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      prompt,
      print: { info, table, newline },
      store,
    } = toolbox

    const answers = await prompt.ask([
      {
        type: 'input',
        name: 'url',
        message: 'URL',
        required: true,
      },
      {
        type: 'input',
        name: 'user',
        required: true,
        message: 'Username',
      },
      {
        type: 'password',
        name: 'pass',
        required: true,
        message: 'Password',
      },
    ])

    if (parameters.options.title) {
      answers.title = parameters.options.title
    }

    await store.addSite(answers)
    const stored = await store.getSite(answers.url)

    newline()
    info(`Site ${stored.title} created in store.`)
    table(Object.entries(stored))
  }
}
