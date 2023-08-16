import { SitevisionToolsToolbox } from '../../types'

module.exports = {
  name: 'list',
  alias: [ 'ls' ],
  description: 'TODO',
  run: async (toolbox: SitevisionToolsToolbox) => {
    const {
      print: { newline, info, table },
      parameters,
      sitevisionApi,
    } = toolbox

    const url = parameters.first
    const addonIdentifier = parameters.second

    
    
    if (addonIdentifier) {
      const editApi = await sitevisionApi.getEditApiInstance(url)
      const versions = await editApi.getAddonVersions(addonIdentifier)
      // const versions = await sitevisionApi.getAddonVersions(url, addonName)

      newline()
      info(`Versions for addon ${addonIdentifier} (${versions.length})`)

      table([
        [ 'App identifier', 'Version', 'ID', 'Is active' ],
        [ '--------------', '-------', '--', '---------' ],
        ...versions.map(({ moduleElementId, moduleElementVersion, id, isActive }) => [ moduleElementId, moduleElementVersion, id, isActive ])
      ])

      // info(versions)
    } else {
      const restApi = await sitevisionApi.getRestApiInstance(url)

      const addons = await restApi.getAddons()
  
      newline()
      info(`Addons for ${url} (${addons.length})`)
      table([
        [ 'Name', 'Type', 'ID' ],
        [ '----', '----', '--' ],
        ...addons.map(({ id, type, name }) => [ name, type, id ])
      ])
    }


  },
}


/*

[
    {
        "id": "210.4a29850017d47da1a8d10fe7",
        "type": "sv:marketplaceCustomModule",
        "name": "Knapp",
        "path": "/Sitevision/Addon Repository/Knapp"
    },
    {
        "id": "180.1a5d982217e487d93ac11d1",
        "type": "sv:customModule",
        "name": "Relaterade sidor",
        "path": "/Sitevision/Addon Repository/Relaterade sidor"
    },
    {
        "id": "210.1a5d982217e487d93accc53",
        "type": "sv:marketplaceCustomModule",
        "name": "Nyhetslista",
        "path": "/Sitevision/Addon Repository/Nyhetslista"
    },
    {
        "id": "180.1a5d982217e487d93ac764e2",
        "type": "sv:customModule",
        "name": "Lista kontakterbyline",
        "path": "/Sitevision/Addon Repository/Lista kontakterbyline"
    },
    {
        "id": "210.141179d117f7286571f2defc",
        "type": "sv:marketplaceCustomModule",
        "name": "Rek.ai",
        "path": "/Sitevision/Addon Repository/Rek.ai"
    },
    {
        "id": "210.372fb9d41801e2beb001322",
        "type": "sv:marketplaceCustomModule",
        "name": "Puffmeny",
        "path": "/Sitevision/Addon Repository/Puffmeny"
    },
    {
        "id": "210.24ed023b18093f73c877b233",
        "type": "sv:marketplaceCustomModule",
        "name": "Cookie-banner",
        "path": "/Sitevision/Addon Repository/Cookie-banner"
    },
    {
        "id": "180.6975dca21809397c70417d49",
        "type": "sv:customModule",
        "name": "Pardot tracker",
        "path": "/Sitevision/Addon Repository/Pardot tracker"
    },
    {
        "id": "210.e5e7e371816339a9b6152c",
        "type": "sv:marketplaceCustomModule",
        "name": "Länkstig",
        "path": "/Sitevision/Addon Repository/Länkstig"
    },
    {
        "id": "210.5e92e42e181262dec292e5c4",
        "type": "sv:marketplaceCustomModule",
        "name": "LKI Webbfontsassistent",
        "path": "/Sitevision/Addon Repository/LKI Webbfontsassistent"
    },
    {
        "id": "180.2103449c181af3938b1af1",
        "type": "sv:customModule",
        "name": "Lista alla moduler",
        "path": "/Sitevision/Addon Repository/Lista alla moduler"
    },
    {
        "id": "210.6e58f516181af2be82fc87",
        "type": "sv:marketplaceCustomModule",
        "name": "Bädda in",
        "path": "/Sitevision/Addon Repository/Bädda in"
    },
    {
        "id": "180.54bd2396181af1f6e2b230a",
        "type": "sv:customModule",
        "name": "Lista marketplace moduler",
        "path": "/Sitevision/Addon Repository/Lista marketplace moduler"
    },
    {
        "id": "180.2bc8886e187db638da29f7",
        "type": "sv:customModule",
        "name": "Text summary from url",
        "path": "/Sitevision/Addon Repository/Text summary from url"
    },
    {
        "id": "188.2600495c188b9c2f3cd16f49",
        "type": "sv:headlessCustomModule",
        "name": "participantsFetcher",
        "path": "/Sitevision/Addon Repository/participantsFetcher"
    }
]
*/
