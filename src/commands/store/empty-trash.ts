import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'empty-trash',
  alias: [ 'empty', 'et' ],
  description: 'Empty trash in store.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      prompt,
      print: { info, error, success, checkmark, xmark },
      store,
    } = toolbox

    const confirm = await prompt.confirm(`Do you really want to empty trash?`, false)

    if (!confirm) {
      info('Emptying trash aborted.')
      return
    }

    const emptied = await store.emptyTrash()

    if (emptied) {
      success(`${checkmark} trash is empty.`)
    } else {
      error(`${xmark} failed to empty trash.`)
    }
  }
}



