import { SitevisionToolsToolbox } from '../../types'

module.exports = {
  name: 'activate-version',
  alias: [ 'av' ],
  description: 'TODO',
  run: async (toolbox: SitevisionToolsToolbox) => {
    const {
      print: { info },
      parameters,
      sitevisionApi,
    } = toolbox

    const url = parameters.first
    const addonIdentifier = parameters.second
    const versionIdentifier = parameters.third

    const editApi = await sitevisionApi.getEditApiInstance(url)
    const res = await editApi.setAddonActiveVersion(addonIdentifier, versionIdentifier)

    // await sitevisionApi.activateVersion(url, addonName, version)

    info('apps activate-version')
    info(res)
  },
}
