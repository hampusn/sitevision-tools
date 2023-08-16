import { print } from 'gluegun'
import Api from './Api'
import { URLSearchParams } from 'url'

export default class RestApi extends Api {
  async getNodes (path: string, params = {}): Promise<Record<string, any>[]> {
    const { ok, data, originalError } = await this._transporter.get(`${path}/nodes`, params)

    if (!ok) {
      print.error((data as Record<string, any>)?.message || String(originalError))
      return []
    }
    
    return data as Record<string, any>[]

  }

  async getNodeProperties (path: string, properties = []): Promise<Record<string, any>> {
    const params = new URLSearchParams()
    params.append('format', 'json')
    params.append('json', JSON.stringify({
      properties
    }))

    const { ok, data, originalError } = await this._transporter.get(`${path}/properties`, params)

    if (!ok) {
      print.error((data as Record<string, any>)?.message || String(originalError))
      return {}
    }

    return data as Record<string, any>
  }

  async getAddons () {
    return await this.getNodes('/Addon Repository')
  }
}
