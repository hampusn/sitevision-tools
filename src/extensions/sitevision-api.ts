import { SitevisionApiExtension, SitevisionToolsToolbox } from '../types'
/* import https from 'https'
import { extractJsonVariableFromHTML } from '../lib/utils'
import { URLSearchParams } from 'url' */
import SitevisionApiFactory from '../lib/SitevisionApi/Factory'

module.exports = (toolbox: SitevisionToolsToolbox) => {
  /* const {
    http,
    print: { info, error, newline },
    parameters: { options },
  } = toolbox */

  const factory = new SitevisionApiFactory(toolbox)

  toolbox.sitevisionApi = <SitevisionApiExtension>{
    factory,
    getRestApiInstance: async (siteOrURL) => await factory.getRestApiInstance(siteOrURL),
    getEditApiInstance: async (siteOrURL) => await factory.getEditApiInstance(siteOrURL),
  }
  /* 
  return

  const getOptionalHttpsAgent = () => {
    if (options.k || options.insecure) {
      return new https.Agent({  
        rejectUnauthorized: false
      })
    }

    return null
  }

  const unsetSiteNameOnFail = async (url: string, res: any) => {
    const { ok, status, data } = res

    if (!ok && status === 400 && data?.type === 'invalidParameter') {
      error('Site name might be out of sync. Unsetting and will update on retry.')
      newline()

      await toolbox.store.updateSite(url, {
        siteName: ''
      })
    }
  }

  const getInstance = async (url, force = false) => {
    if (!_instances[url] || force) {
      const site = await toolbox.store.getSite(url) as StoreSite
      const httpsAgent = getOptionalHttpsAgent()

      _instances[url] = http.create({
        baseURL: `${site.url}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        auth: {
          username: site.user,
          password: site.pass,
        },
        httpsAgent,
      })
    }
    return _instances[url]
  }

/*   const getEditInstance = async (url) => {

  } 

  const getSiteNameFromEdit = async (url) => {
    const instance = await getInstance(url)

    const { ok, data, originalError } = await instance.get('/edit')

    if (!ok) {
      throw originalError
    }

    return extractJsonVariableFromHTML('siteName', data as string)
  }

  const getRestInstance = async (url, force = false) => {
    if (!_apiInstances[url] || force) {
      const site = await toolbox.store.getSite(url) as StoreSite
      const httpsAgent = getOptionalHttpsAgent()

      if (!site.siteName) {
        site.siteName = await getSiteNameFromEdit(site.url)

        // Update record with siteName in store
        await toolbox.store.updateSite(url, {
          siteName: site.siteName
        })
      }

      _apiInstances[url] = http.create({
        baseURL: `${site.url}/rest-api/1/0/${encodeURIComponent(site.siteName)}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        auth: {
          username: site.user,
          password: site.pass,
        },
        httpsAgent,
      })
    }

    return _apiInstances[url]
  }

  const todo = async (url) => {
    const api = await getInstance(url)
    const { ok, data, originalError } = await api.get('/edit')

    if (ok) {
      info(data)
    } else {
      error(String(originalError))
    }
  }

  const getAddons = async (url) => {
    const api = await getRestInstance(url)
    const res = await api.get('/Addon Repository/nodes')

    await unsetSiteNameOnFail(url, res)

    if (!res.ok) {            
      throw res.originalError
    }

    return res.data
  }

  const getAddonVersions = async (url, addonName) => {    
    const params = new URLSearchParams()
    params.append('format', 'json')
    params.append('json', JSON.stringify({
      properties: [ 'appVersion', 'displayName', 'appIdentifier', 'appImportDate' ]
    }))

    const api = await getRestInstance(url)
    const res = await api.get(`/Addon Repository/${encodeURIComponent(addonName)}/nodes`, params)

    console.log(res)

    await unsetSiteNameOnFail(url, res)

    if (!res.ok) {
      throw res.originalError
    }

    return res.data

  }

  toolbox.sitevisionApi = {
    getAddons,
    getAddonVersions,
    todo
  } */
}

// http://sitevision.test/rest-api/1/0/Sitevision/Addon%20Repository/Form%20API/nodes?format=json&json=%7B%22properties%22%3A%5B%22appVersion%22%2C%22importDate%22%5D%7D
