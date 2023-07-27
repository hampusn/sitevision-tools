import { GluegunToolbox } from 'gluegun'
import { machineId } from 'node-machine-id'
import { Credentials, DatasourceConfigurationFile, Entry, FileDatasource, Vault, init } from 'buttercup'
import { STORE_FILE } from '../consts'
import untildify from 'untildify'
import { escapeRegex, parseOrigin, removeProtocolFromUrl } from '../lib/utils'

const SITES_GROUP_TITLE: string = 'Websites'

let _machineId: string = ''
let _vault: Vault = null
let _credentials: Credentials = null
let _datasource: FileDatasource = null

module.exports = (toolbox: GluegunToolbox) => {
  const {
    filesystem: { exists },
    /* print: { info }, */
  } = toolbox

  init()

  const ABS_STORE_FILE_PATH = untildify(STORE_FILE)

  const createUrlRegex = (str: string): RegExp => {
    str = removeProtocolFromUrl(str)
    str = escapeRegex(`://${str}`)

    return new RegExp(str, 'i')
  }

  const getMachineId = async () => {
    if (!_machineId) {
      _machineId = await machineId()
    }

    return _machineId
  }

  const datasourceExists = async () => {
    return await exists(ABS_STORE_FILE_PATH) === 'file'
  }

  const getCredentials = async () => {
    if (!_credentials) {
      _credentials = Credentials.fromDatasource(<DatasourceConfigurationFile>{
        type: 'file',
        path: untildify(STORE_FILE)
      }, await getMachineId())
    }

    return _credentials
  }
    
  const getDatasource = async (credentials?: Credentials) => {
    if (!_datasource) {
      _datasource = new FileDatasource(credentials || await getCredentials())
    }

    return _datasource
  }

  const getVault = async () => {
    if (!_vault) {
      const credentials = await getCredentials()
      const datasource = await getDatasource(credentials)

      if (await datasourceExists()) {
        const vaultCredentials = Credentials.fromPassword(await getMachineId())
        const loadedState = await datasource.load(vaultCredentials)

        _vault = Vault.createFromHistory(loadedState.history, loadedState.Format);
      } else {
        _vault = Vault.createWithDefaults()
      }
    }

    return _vault
  }
  
  const addSite = async ({ url, user, pass, title = null }) => {
    const vault = await getVault()
    const sitesGroup = vault.findGroupsByTitle(SITES_GROUP_TITLE)[0] || vault.createGroup(SITES_GROUP_TITLE)

    if (!title) {
      title = url
    }

    sitesGroup
      .createEntry(title)
        .setProperty('url', parseOrigin(url))
        .setProperty('user', user)
        .setProperty('pass', pass)

    return await commitChanges(vault)
  }

  const getSite = async (url, propsOnly = true) => {
    const vault = await getVault()
    const entries = vault.findEntriesByProperty('url', createUrlRegex(url))
    const entry = entries?.[0] || null

    return propsOnly ? entry?.getProperties() || null : entry
  }

  const getSites = async () => {
    const vault = await getVault()
    const sitesGroup = vault.findGroupsByTitle(SITES_GROUP_TITLE)[0] || vault.createGroup(SITES_GROUP_TITLE)

    return sitesGroup.getEntries().map((entry) => entry.getProperties())
  }

  const removeSite = async (url, skipTrash = false) => {
    const vault = await getVault()
    const entries = vault.findEntriesByProperty('url', createUrlRegex(url))
    const numFound = entries.length
    let numRemoved = 0

    entries.forEach((entry) => {
      if (entry.delete(skipTrash) || entry.isInTrash()) {
        numRemoved++
      }
    })

    await commitChanges(vault)

    return numFound === numRemoved
  }

  const updateSite = async (url: string, updates: Record<string, string>) => {
    const vault = await getVault()
    const entry = await getSite(url, false) as Entry

    if (!entry) {
      return false
    }

    // Make sure URL follow URL.origin
    updates.url = parseOrigin(updates.url)

    // Perform updates of props
    for (const [key, value] of Object.entries(updates)) {
      entry.setProperty(key, value)
    }
    
    await commitChanges(vault)
    return true
  }

  const getStoreStats = async () => {
    const vault = await getVault()

    const stats = {
      storeFile: ABS_STORE_FILE_PATH,
      storeExists: await datasourceExists(),
      groups: vault.getAllGroups()
      .map((group) => {
        return {
          title: group.getTitle(),
          numEntries: group.getEntries().length,
        }
      }),
    }

    return stats
  }

  const emptyTrash = async () => {
    const vault = await getVault()

    vault.emptyTrash()
    await commitChanges(vault)

    return vault.getTrashGroup().getEntries().length === 0
  }

  const commitChanges = async (vault: Vault) => {
    const vaultCredentials = Credentials.fromPassword(await getMachineId())
    const credentials = await getCredentials()
    const datasource = await getDatasource(credentials)

    return await datasource.save(vault.format.history, vaultCredentials)
  }

  toolbox.store = {
    getMachineId,
    addSite,
    getSite,
    getSites,
    removeSite,
    updateSite,
    getStoreStats,
    emptyTrash,
  }
}
