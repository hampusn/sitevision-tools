import { extractJsonVariableFromHTML } from '../../lib/utils'
import { SitevisionToolsToolbox, StoreSite } from '../../types'

module.exports = {
  name: 'site',
  description: 'Sitevision sites.',
  run: async (toolbox: SitevisionToolsToolbox) => {
    const {
      print: { info },
      parameters,
      store,
      sitevisionApi,
    } = toolbox

    const url = parameters.first
    const site = await store.getSite(url) as StoreSite
    const api = sitevisionApi.factory.getTransporter(site.url, site.user, site.pass)
    const res = await api.get('/edit')

    info('----')
    info(extractJsonVariableFromHTML('csrfToken', <string>res.data))
    info('----')

    info(res.headers)
  },
}
