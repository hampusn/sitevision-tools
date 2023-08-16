import { ApisauceInstance } from 'apisauce'
import { StoreExtension } from '../../types'

interface IApi {
  getStore (): StoreExtension
  getNodes (url: string): Promise<Record<string, any>[]>
  getNodeProperties (url: string): Promise<Record<string, any>>
}

export type ApiContext = {
  store: StoreExtension
}

export default class Api implements IApi {
  protected _transporter: ApisauceInstance
  private _apiContext: ApiContext

  constructor (transporter: ApisauceInstance, apiContext: ApiContext) {
    this._transporter = transporter
    this._apiContext = apiContext
  }

  getStore (): StoreExtension {
    return this._apiContext.store
  }

  getNodes(url: string): Promise<Record<string, any>[]> {
    return Promise.resolve([])
  }

  getNodeProperties(url: string): Promise<Record<string, any>> {
    return Promise.resolve({})
  }
}
