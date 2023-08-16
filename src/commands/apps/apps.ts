import { SitevisionToolsToolbox } from '../../types'

module.exports = {
  name: 'apps',
  alias: [ 'a' ],
  description: 'TODO',
  run: async (toolbox: SitevisionToolsToolbox) => {
    const {
      print: { info },
      /* sitevisionApi, */
    } = toolbox

    // await sitevisionApi.todo('sitevision.test')

    info('apps')
  },
}


/*

sitevision-tools apps activate-version <site> <addonName|identifier>? <version>?
sitevision-tools apps list <site> <addonName|identifier>?
sitevision-tools apps cleanup <site> <numSaves>=2

*/

/*

sitevisionApi.getAddons()
sitevisionApi.getAddonVersions(addonName|identifier)
sitevisionApi.activateVersion(addonName|identifier, version|identifier)
sitevisionApi.getSiteName(url)
sitevisionApi.getRestInstance(url)
sitevisionApi.getEditInstance(url)

*/
