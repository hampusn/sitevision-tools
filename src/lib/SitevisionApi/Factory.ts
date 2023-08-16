import { http } from 'gluegun'
import { ApisauceInstance } from 'apisauce'
import https from 'https'
import { SitevisionToolsToolbox, StoreSite } from '../../types'
import EditApi from './EditApi'
import RestApi from './RestApi'
// import { getDefaultTransporterOptions } from './api-utils'

export default class SitevisionApiFactory {
  private _toolbox: SitevisionToolsToolbox
  private _userAgent: string
  //private _editInstances: Record<string, EditApi>
  //private _restInstances: Record<string, RestApi>

  constructor (toolbox: SitevisionToolsToolbox) {
    this._toolbox = toolbox
    
    //this._editInstances = {}
    //this._restInstances = {}
  }

  private userAgent () {
    if (!this._userAgent) {
      this._userAgent = `${this._toolbox.runtime.brand} ${this._toolbox.meta.version()}`
    }

    return this._userAgent
  }

  private async ensureSite (siteOrURL: StoreSite | string): Promise<StoreSite> {
    if (typeof siteOrURL === 'string') {
      return await this._toolbox.store.getSite(siteOrURL) as StoreSite
    }

    return siteOrURL
  }

  getTransporter (baseURL: string, username: string, password: string): ApisauceInstance {
    const options = this._toolbox.parameters.options
    const rejectUnauthorized = options.k || options.insecure
    const httpsAgent = rejectUnauthorized ? new https.Agent({ rejectUnauthorized: false }) : null

    return http.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': this.userAgent(),
        'X-Csrf-Token': '8p5gbJbBSHaqCnJBwZ1arJbPeiwYE9U5',
        'Cookie': 'JSESSIONID=6A711D56F308F674E5C9864C7BE5E456;',
        /* 'X-Csrf-Token': 'jGzyQqlSRfDa8dtmpYbgN8B9ILEyWTQk',
        'Cookie': 'cookie: _pk_id.1.e4ad=8f5a6eca92514722.1690466594.; _pk_ses.1.e4ad=1; _pk_ref.1.e4ad=%5B%22%22%2C%22%22%2C1690883904%2C%22https%3A%2F%2Fsitevision%2Fdirect-entry%22%5D; JSESSIONID=FEF2E4BAB8697651B78DDD05C8239972; sv-edit-timestamp=1690881359663' */
      },
      auth: {
        username,
        password,
      },
      httpsAgent,
    })
  }

  async getRestApiInstance (siteOrURL: StoreSite | string): Promise<RestApi> {
    const site = await this.ensureSite(siteOrURL)

    // TODO: Move logic for fetching siteName if not exists to here

    return new RestApi(this.getTransporter(`${site.url}/rest-api/1/0/${encodeURIComponent(site.siteName)}`, site.user, site.pass), {
      store: this._toolbox.store,
    })
  }

  async getEditApiInstance (siteOrURL: StoreSite | string): Promise<EditApi> {
    const site = await this.ensureSite(siteOrURL)

    return new EditApi(this.getTransporter(`${site.url}/edit-api/1`, site.user, site.pass), {
      store: this._toolbox.store,
    })
  }
}



/*
  private async unsetSiteNameOnFail (url: string, res: any) {
    const { ok, status, data } = res

    if (!ok && status === 400 && data?.type === 'invalidParameter') {
      print.error('Site name might be out of sync. Unsetting and will update on retry.')
      print.newline()

      await this._toolbox.store.updateSite(url, {
        siteName: ''
      })
    }
  }
*/
