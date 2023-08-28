import { print } from 'gluegun'
import Api from './Api'

export default class EditApi extends Api {
  async getNodes (identifier: string): Promise<Record<string, any>[]> {
    await this._transporter.get(``)

    return null

  }

  async getNodeProperties (url: string): Promise<Record<string, any>> {
    return null
  }

  async getAddonVersions (identifier: string): Promise<Record<string, any>[]> {
    const { ok, data/* , originalError */ } = await this._transporter.get(`/${identifier}/${identifier}/nodeData/${identifier}?viewType=addon`)

    if (!ok) {
      return []
    }

    return (data as Record<string, any>).childInfo.children


    // http://sitevision.test/edit-api/1/180.61bf4a4118998f59f661/180.61bf4a4118998f59f661/nodeData/180.61bf4a4118998f59f661?viewType=addon
    // http://sitevision.test/edit-api/1/2.4a64735e1873d0b61d31/2.4a64735e1873d0b61d31/nodeData/2.4a64735e1873d0b61d31?viewType=page


    /*

      "childInfo": {
        "children": [
          {
            "id": "360.61bf4a4118998f59f662",
            "name": "Form API",
            "isActive": true,
            "moduleElementId": "webapp-form-api",
            "moduleElementVersion": "0.0.1",
            "importDate": 1690653683958
          },

    */
  }

  async put (url: string, data?: any) {
    
  }


  async setAddonActiveVersion (addonIdentifier: string, versionIdentifier: string) : Promise<boolean> {
    const { ok, data, originalError } = await this._transporter.put(`/${versionIdentifier}/${addonIdentifier}/setToCurrentCustomModuleExecutable/${versionIdentifier}`)

    if (!ok || !(data as Record<string, any>).success) {
      print.error(originalError)
      return false
    }

    

    // PUT http://sitevision.test/edit-api/1/360.61bf4a4118998f59f66e/180.61bf4a4118998f59f661/setToCurrentCustomModuleExecutable/360.61bf4a4118998f59f66e
    // PUT http://sitevision.test/edit-api/1/360.61bf4a4118998f59f66c/180.61bf4a4118998f59f661/setToCurrentCustomModuleExecutable/360.61bf4a4118998f59f66c



    return true
  }


}
