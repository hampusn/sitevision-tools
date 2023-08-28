import { StoreExtension } from "../../types"

export default class AuthWrapper {
  private _url: string
  private _store: StoreExtension
  
  constructor (url, store) {
    this._url = url
    this._store = store
  }

  
}

/*

    'X-Csrf-Token': 'jGzyQqlSRfDa8dtmpYbgN8B9ILEyWTQk',
    Cookie: 'cookie: _pk_id.1.e4ad=8f5a6eca92514722.1690466594.; _pk_ses.1.e4ad=1; _pk_ref.1.e4ad=%5B%22%22%2C%22%22%2C1690883904%2C%22https%3A%2F%2Fsitevision%2Fdirect-entry%22%5D; JSESSIONID=FEF2E4BAB8697651B78DDD05C8239972; sv-edit-timestamp=1690881359663',

    'X-Csrf-Token': 'jGzyQqlSRfDa8dtmpYbgN8B9ILEyWTQk',
    Cookie: 'cookie: _pk_id.1.e4ad=8f5a6eca92514722.1690466594.; _pk_ses.1.e4ad=1; _pk_ref.1.e4ad=%5B%22%22%2C%22%22%2C1690883904%2C%22https%3A%2F%2Fsitevision%2Fdirect-entry%22%5D; JSESSIONID=FEF2E4BAB8697651B78DDD05C8239972; sv-edit-timestamp=1690881359663',

    'X-Csrf-Token': 'jGzyQqlSRfDa8dtmpYbgN8B9ILEyWTQk',
    Cookie: 'cookie: _pk_id.1.e4ad=8f5a6eca92514722.1690466594.; _pk_ses.1.e4ad=1; _pk_ref.1.e4ad=%5B%22%22%2C%22%22%2C1690883904%2C%22https%3A%2F%2Fsitevision%2Fdirect-entry%22%5D; JSESSIONID=FEF2E4BAB8697651B78DDD05C8239972; sv-edit-timestamp=1690881359663',

    'X-Csrf-Token': 'jGzyQqlSRfDa8dtmpYbgN8B9ILEyWTQk',
    Cookie: 'cookie: _pk_id.1.e4ad=8f5a6eca92514722.1690466594.; _pk_ses.1.e4ad=1; _pk_ref.1.e4ad=%5B%22%22%2C%22%22%2C1690883904%2C%22https%3A%2F%2Fsitevision%2Fdirect-entry%22%5D; JSESSIONID=FEF2E4BAB8697651B78DDD05C8239972; sv-edit-timestamp=1690881359663',

    'X-Csrf-Token': 'jGzyQqlSRfDa8dtmpYbgN8B9ILEyWTQk',
    Cookie: 'cookie: _pk_id.1.e4ad=8f5a6eca92514722.1690466594.; _pk_ses.1.e4ad=1; _pk_ref.1.e4ad=%5B%22%22%2C%22%22%2C1690883904%2C%22https%3A%2F%2Fsitevision%2Fdirect-entry%22%5D; JSESSIONID=FEF2E4BAB8697651B78DDD05C8239972; sv-edit-timestamp=1690881359663',


            "csrfToken": "jGzyQqlSRfDa8dtmpYbgN8B9ILEyWTQk",
        "csrfToken": "jGzyQqlSRfDa8dtmpYbgN8B9ILEyWTQk",

        x-csrf-token: jGzyQqlSRfDa8dtmpYbgN8B9ILEyWTQk




{
    "displayName": "Sitevision",
    "siteId": "2.4a64735e1873d0b61d31",
    "nodeId": "2.4a64735e1873d0b61d31",
    "temporaryStateCount": 0,
    "nodeHasChildren": true,
    "parentNodeId": "1",
    "fileRepositoryId": "15.4a64735e1873d0b61d35",
    "maxFileSizeInMB": 128,
    "imageRepositoryId": "15.4a64735e1873d0b61d33",
    "maxImageSizeInMB": 32,
    "decorationRepositoryId": "64.4a64735e1873d0b61d3e",
    "templateRepositoryId": "14.4a64735e1873d0b61d37",
    "dataStorageRepositoryId": "287.4a64735e1873d0b61d33e",
    "dataStoragePostQuota": 1000,
    "moduleElementDraftRepositoryId": "191.4a64735e1873d0b61d3b",
    "customModuleRepositoryId": "190.4a64735e1873d0b61d3a",
    "marketplaceConfigurationId": "681.4a64735e1873d0b61d33f",
    "webAnalyticsRepositoryId": "288.4a64735e1873d0b61d340",
    "publishingProjectRepositoryRootId": "742.4a64735e1873d0b61d341",
    "publishingProjectActiveRepositoryId": "740.4a64735e1873d0b61d342",
    "publishingProjectInactiveRepositoryId": "740.4a64735e1873d0b61d343",
    "siteFontCssUrl": "/2.4a64735e1873d0b61d31/0/9853/edit/sitevision-site.css",
    "systemResourceBaseUrl": "/sitevision/system-resource/5f8ad9f87064d73fbdedc52cc809c6811346eeafb2f2f8466aaf511a0bf51eff/",
    "sitevisionCssUrl": "/2.4a64735e1873d0b61d31/0/9853/print/SiteVision.css?offline",
    "trashcanId": "23.4a64735e1873d0b61d318",
    "viewType": "page",
    "objectPath": [
        {
            "name": "Sitevision Server",
            "value": "1",
            "hasChildren": true
        },
        {
            "name": "Sitevision",
            "value": "2.4a64735e1873d0b61d31",
            "clickable": false,
            "hasChildren": true
        }
    ],
    "superSidebar": {
        "buttons": [
            {
                "name": "history",
                "requireWritable": false
            },
            {
                "name": "search",
                "requireWritable": false
            },
            {
                "name": "browse",
                "requireWritable": false
            },
            {
                "name": "publish",
                "requireWritable": true
            },
            {
                "name": "create",
                "requireWritable": false,
                "children": [
                    {
                        "name": "archive",
                        "requireWritable": false
                    },
                    {
                        "name": "structureObject",
                        "requireWritable": false
                    },
                    {
                        "name": "page",
                        "requireWritable": false
                    },
                    {
                        "name": "link",
                        "requireWritable": false
                    },
                    {
                        "name": "folder",
                        "requireWritable": false
                    }
                ]
            },
            {
                "name": "exit",
                "requireWritable": false
            }
        ]
    },
    "user": {
        "rights": {
            "READ": 1,
            "WRITE": 2,
            "PUBLISH": 3,
            "WRITE_LAYOUT": 4,
            "WRITE_METADATA_DEF": 5,
            "WRITE_FONTTEMPLATES": 6,
            "WRITE_TEMPLATES": 7,
            "WRITE_COLORS": 8,
            "USE_EDITOR_TREE": 9,
            "WRITE_SITE_PROPS": 10,
            "WRITE_SERVER_PROPS": 11,
            "WRITE_ACL": 12,
            "CREATE_PAGE": 13,
            "CREATE_SITE": 14,
            "CREATE_LINK": 15,
            "CREATE_ARCHIVE": 16,
            "CREATE_FOLDER": 17,
            "CREATE_TEMPLATE": 18,
            "CREATE_TEMPLATE_COMPONENT": 19,
            "DELETE_OBJECT": 20,
            "GENERATE_ACCESS_REPORT": 21,
            "SUPERVISOR": 22,
            "ADD_ABSOLUTE_CONTENT": 23,
            "USE_ARCHIVE": 24,
            "CHANGE_TEMPLATE": 25,
            "SHOW_IMAGEARCHIVE": 26,
            "USE_SITEFONTSTYLE": 27,
            "SHOW_FILEARCHIVE": 28,
            "CREATE_STRUCTURE_NODES": 29,
            "UNLOCK_LOCKS": 30,
            "WRITE_DECORATIONS": 31,
            "WRITE_SUBSCRIPTIONS": 32,
            "PUBLISH_BROKEN_LINKS": 33,
            "USE_CUSTOM_COLORS": 34,
            "CHANGE_PASSWORD": 35,
            "RECURSIVE_PUBLISH": 36,
            "MANAGE_DIRECTORY": 37,
            "MANAGE_HEAD": 38,
            "DEVELOPER": 39,
            "RECURSIVE_LINKCHECK": 40,
            "WORKFLOW_SUPERVISOR": 41,
            "MANAGE_WORKFLOWS": 42,
            "DIRECT_PUBLISH": 43,
            "REVIEW": 44,
            "CREATE_LAYOUT": 45,
            "CREATE_LINKED_LAYOUT": 46,
            "SCHEDULE_LOCK_SUPERVISOR": 47,
            "SHOW_DECORATIONARCHIVE": 48,
            "CREATE_DECORATION_TEMPLATE": 49,
            "MANAGE_ME_WEBSERVICE": 50,
            "MANAGE_CUSTOM_SEARCH_INDEX": 51,
            "MODIFY_SEARCH_PRIORITY": 52,
            "SHOW_MOBILEVIEWS": 53,
            "CREATE_MOBILEVIEW": 54,
            "MANAGE_GRIDS": 55,
            "CREATE_GRID_ROW_COLUMN": 56,
            "MANAGE_RESPONSIVE_WEB": 57,
            "USE_RESPONSIVE_WEB": 58,
            "CREATE_SOCIALGROUP_TEMPLATE": 59,
            "CREATE_SOCIALGROUP_PAGE": 60,
            "MANAGE_SELECTABLE_VIEWS_SOCIALGROUPS": 61,
            "MANAGE_SOCIALGROUPS": 62,
            "CREATE_SOCIALGROUP_FOLDER": 63,
            "CREATE_CLOSED_SOCIALGROUPS": 64,
            "USE_SOCIALGROUPS": 65,
            "SET_SELECTED_FILE_VERSION": 66,
            "MANAGE_SEARCH_INTEGRATION": 67,
            "ADD_CUSTOM_SEARCH_INDEX": 68,
            "MANAGE_GROUP_ACTIVITIES": 69,
            "CHANGE_TEMPLATE_RECURSIVE": 70,
            "USE_VIEWS": 71,
            "CREATE_CUSTOMIZE_TABLE": 72,
            "MANAGE_SITE_LICENSES": 73,
            "MANAGE_SOCIAL_IDENTITIES": 74,
            "USE_IMAGE_FILTERS": 75,
            "MANAGE_PUBLIC_ACCESS": 76,
            "MANAGE_PROPAGATE_ACL": 77,
            "MANAGE_AB_TESTS": 78,
            "MANAGE_USERS": 79,
            "PUBLISH_EPLIKT_ITEM": 80,
            "MANAGE_TRANSLATIONS": 81,
            "MANAGE_CUSTOM_MODULES": 82,
            "MANAGE_ELEMENTS": 83,
            "MANAGE_VFS": 84,
            "MANAGE_WEB_ARCHIVE": 85,
            "SEND_PUSH_NOTIFICATIONS": 86,
            "MANAGE_DATA_STORES": 87,
            "MANAGE_TAGS": 88,
            "MANAGE_MARKETPLACE": 89,
            "MOVE_NODE": 90,
            "MANAGE_ENVISION": 91,
            "MANAGE_SERVICE_USERS": 92,
            "MANAGE_CHANNELS": 93,
            "MANAGE_SITEVISION_WEB_ANALYTICS": 94,
            "USE_ENVISION": 95,
            "MANAGE_PUBLISHING_PROJECT": 96,
            "MANAGE_DOWNLOAD_PROTECTION": 97,
            "CREATE_PRIVATE_CHANNELS": 98
        },
        "isSystemUser": true,
        "id": "system"
    },
    "toolbar": {
        "main": [
            {
                "name": "properties",
                "requireWritable": false,
                "children": [
                    {
                        "name": "siteProperties",
                        "requireWritable": false
                    },
                    {
                        "name": "unpublish",
                        "requireWritable": true
                    },
                    {
                        "name": "nodeProperties",
                        "requireWritable": false
                    },
                    {
                        "name": "undoNodeChanges",
                        "requireWritable": false
                    },
                    {
                        "name": "scriptConsole",
                        "hidden": "SHIFT_ALT",
                        "requireWritable": false
                    },
                    {
                        "name": "delete",
                        "requireWritable": true
                    },
                    {
                        "name": "update",
                        "requireWritable": false
                    },
                    {
                        "name": "saveVersion",
                        "requireWritable": true
                    }
                ]
            },
            {
                "name": "preview",
                "requireWritable": false,
                "children": [
                    {
                        "name": "preview",
                        "requireWritable": false
                    },
                    {
                        "name": "versions",
                        "requireWritable": false
                    },
                    {
                        "name": "responsiveMode",
                        "requireWritable": false
                    },
                    {
                        "name": "headless",
                        "requireWritable": false
                    }
                ]
            }
        ],
        "portlets": [
            {
                "name": "PictureAndMedia",
                "portlets": [
                    {
                        "id": "image",
                        "title": "Bild",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "postcard2",
                        "title": "Vykort",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "imageslideshow",
                        "title": "Bildspel",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "video",
                        "title": "Video",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "imagemap",
                        "title": "Imagemap",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "imageexplorer",
                        "title": "Bildbank",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "imageupload",
                        "title": "Bilduppladdning",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "youtube",
                        "title": "YouTube",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "randomimage",
                        "title": "Slumpad bild",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "embeddedmedia",
                        "title": "Media",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    }
                ]
            },
            {
                "name": "Integration",
                "portlets": [
                    {
                        "id": "userprofile",
                        "title": "Användarprofil",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "login",
                        "title": "Inloggning",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "loginstatus",
                        "title": "Inloggningsstatus",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "sharepointfile",
                        "title": "SharePoint fildelning",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "sharepointsearchfilelist",
                        "title": "SharePoint söklistning",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "readspeaker_expandingplayer",
                        "title": "ReadSpeaker",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "directory",
                        "title": "Personsök",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "html",
                        "title": "HTML",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "script",
                        "title": "Skript",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "iframe",
                        "title": "IFrame",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "userregistration",
                        "title": "Användarregistrering",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "changepassword",
                        "title": "Byt lösenord",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "generatepassword",
                        "title": "Glömt lösenord",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "proxy",
                        "title": "Proxy",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    }
                ]
            },
            {
                "name": "Interactive",
                "portlets": [
                    {
                        "id": "booking",
                        "title": "Bokning",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "comments2",
                        "title": "Kommentarer",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "facetedsearch",
                        "title": "Sök facetterad",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "predefinedsearch",
                        "title": "Söklistning",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "standardsearch",
                        "title": "Sök",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "form",
                        "title": "E-postformulär",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "dbform",
                        "title": "Frågeformulär",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "poll",
                        "title": "Webbfråga",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "survey",
                        "title": "Enkät",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "signup",
                        "title": "Webbanmälan",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "formpublish",
                        "title": "Snabbpublicering",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "simplesubscription",
                        "title": "Prenumerera",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "subscriptions",
                        "title": "Prenumerationslista",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "adminsubscriptions",
                        "title": "Mina prenumerationer",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    }
                ]
            },
            {
                "name": "Template",
                "portlets": [
                    {
                        "id": "jcrmenu",
                        "title": "Meny",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "nestedlistmenu",
                        "title": "Listmeny",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "expandmenu",
                        "title": "Expanderande meny",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "droplistmenu",
                        "title": "Rullgardinsmeny",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "multilevellink",
                        "title": "Flernivålänk",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "abc",
                        "title": "A-Ö lista",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "searchform",
                        "title": "Sökruta",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "sitemap",
                        "title": "Webbkarta",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "print",
                        "title": "Utskriftsversion",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "language",
                        "title": "Språkväljare",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "pdf",
                        "title": "PDF-utskrift",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "contact2",
                        "title": "Kontakt",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "crdbookmark2",
                        "title": "Lägg till/ta bort favorit",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "listbookmark2",
                        "title": "Lista favoriter",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "related",
                        "title": "Relaterad information",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    }
                ]
            },
            {
                "name": "Collaboration",
                "portlets": [
                    {
                        "id": "fileshare",
                        "title": "Filer v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "sharedlinks",
                        "title": "Delade länkar v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "createdocument",
                        "title": "Skapa dokument",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "searchform2",
                        "title": "Sökruta för person och innehåll",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "fileshareall",
                        "title": "Alla filer",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "timelineimages",
                        "title": "Bilder i aktivitetsflöde v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "tasks",
                        "title": "Gruppuppgifter",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "calendar",
                        "title": "Gruppkalender",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "timeline",
                        "title": "Aktivitetsflöde v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "tagtimeline",
                        "title": "Aktivitetsflöde för etikett v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "timelinesearch",
                        "title": "Sök i aktivitetsflöde",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "timelineentry",
                        "title": "Inlägg i aktivitetsflöde v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "profileimage",
                        "title": "Profilbild v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "profileprogress",
                        "title": "Profilstyrka",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "usercontacts",
                        "title": "Kontakter v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "userfollowers",
                        "title": "Följare v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "usercontactsall",
                        "title": "Alla kontakter/följare",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "personalsettings",
                        "title": "Personliga inställningar v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "groupadmin",
                        "title": "Gruppmedlemmar v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "messages",
                        "title": "Meddelanden",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "groupadminall",
                        "title": "Alla gruppmedlemmar v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "userfields",
                        "title": "Användarfält",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "taglist",
                        "title": "Mina etiketter v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "notifications",
                        "title": "Notifieringar v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "contactsearch",
                        "title": "Sökruta för person",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "contactstatus",
                        "title": "Kontaktstatus v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "sendmessage",
                        "title": "Skicka meddelande",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "sharepage",
                        "title": "Dela sida v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "likepage",
                        "title": "Gilla sida v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "groupmemberstatus",
                        "title": "Medlemsstatus v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "grouptypeselector",
                        "title": "Gruppinställningar v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "contactsearchall",
                        "title": "Sök person",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "predefinedcontactsearch",
                        "title": "Söklistning av personer",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "usergroups",
                        "title": "Grupper v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "bookmarklist",
                        "title": "Bokmärkta inlägg",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "usergroupsall",
                        "title": "Alla grupper v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    }
                ]
            },
            {
                "name": "SocialMedia",
                "portlets": [
                    {
                        "id": "rating",
                        "title": "Betyg",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "tellfriend",
                        "title": "Tipsa en kompis",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "blog",
                        "title": "Blogg",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "blog_category",
                        "title": "Bloggkategorier",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "blog_menu",
                        "title": "Bloggmeny",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "tagcloud2",
                        "title": "Taggmoln",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "twittersearch",
                        "title": "Twitter-sökning",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    }
                ]
            },
            {
                "name": "Other",
                "portlets": [
                    {
                        "id": "text",
                        "title": "Text",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "archive",
                        "title": "Nyheter",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "archivemenu",
                        "title": "Nyhetsmeny",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "linklist",
                        "title": "Länklista",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "file",
                        "title": "Fildelning",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "linked",
                        "title": "Länkad modul",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "toc",
                        "title": "Innehållsförteckning",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "today",
                        "title": "Idag",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "todaysname",
                        "title": "Dagens namn",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "eventcalendar",
                        "title": "Evenemangskalender",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "contentlist",
                        "title": "Innehållslista",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "showtags",
                        "title": "Etiketter",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "button",
                        "title": "Knapp v1",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "birthday",
                        "title": "Födelsedag",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "custommodule/180.61bf4a4118998f59f661",
                        "draft": false,
                        "title": "Form API",
                        "author": "My Company",
                        "helpUrl": "https://example.com/webapps",
                        "webApp": true,
                        "webAppId": "360.61bf4a4118998f59f662",
                        "isSigned": false
                    }
                ]
            },
            {
                "name": "defaultPortlets",
                "portlets": [
                    {
                        "id": "image",
                        "title": "Bild",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    },
                    {
                        "id": "text",
                        "title": "Text",
                        "external": false,
                        "externalSupportConfig": false,
                        "useConfigWindow": false
                    }
                ]
            }
        ],
        "hideGetMorePortlets": false
    },
    "enableAddPortletButtons": true,
    "validPropertyTabs": [
        "subscription",
        "advancedSecurity",
        "acl",
        "workflowSettings",
        "information",
        "pageFiles",
        "pageAddresses",
        "snippets",
        "pageAppearance",
        "webResourceSettings",
        "webArchiveInfo",
        "cssAssets",
        "requiredScheme",
        "indexingSettings",
        "accessStatistics",
        "javaScriptAssets",
        "pageImages",
        "metadata",
        "tags",
        "rssAssets"
    ],
    "validSitePropertyTabs": [
        "landingPages",
        "siteLinks",
        "siteAddresses",
        "subscriptions",
        "webFontFamilies",
        "topicIntegrations",
        "webAnalytics",
        "bookmark",
        "addonCertificates",
        "rating",
        "userManagement",
        "blog",
        "webColors",
        "socialCollaboration",
        "eplikt",
        "gaStatistics",
        "customIndexes",
        "email",
        "webDAVAccess",
        "simpleGroups",
        "serviceUsers",
        "securityRoles",
        "seoSettings",
        "forms",
        "workflows",
        "accessibility",
        "decorations",
        "advancedSiteSecurity",
        "comments",
        "siteFonts",
        "marketplaceConfiguration",
        "cssClasses",
        "archive",
        "aliases",
        "linkChecker",
        "siteCookies",
        "oAuth2Configurations",
        "webArchive",
        "anonymization",
        "bestBefore",
        "print",
        "settings",
        "sharePointSettings",
        "siteListStyles",
        "imageFilters",
        "namedReferences",
        "textMessage",
        "tags",
        "fileSettings",
        "dataStorage",
        "ruleEngine",
        "envision",
        "createPageConfig",
        "general",
        "indexingConfigurationSettings",
        "tableTypes",
        "directoryServices",
        "rss",
        "captcha",
        "restApi",
        "siteLanguages",
        "loginConfiguration",
        "metadataTemplates",
        "information",
        "responsiveWeb"
    ],
    "nodeStatus": {
        "changed": false,
        "unpublished": false,
        "published": true,
        "publishedBy": "System",
        "publishedAt": 1690631743518,
        "trashed": false
    },
    "siteStatus": {
        "changed": false,
        "unpublished": false,
        "published": true,
        "publishedBy": "System",
        "publishedAt": 1690631743518,
        "trashed": false
    },
    "defaultTableType": {
        "id": "675.4a64735e1873d0b61d31f",
        "cssClassName": "sv-standard"
    },
    "defaultUnit": "em",
    "followWAI": true,
    "enableWcagValidation": false,
    "responsiveBreakpoints": [],
    "responsiveWebEnabled": false,
    "doctype": "HTML5",
    "socialCollaborationEnabled": false,
    "stormCommerceActive": false,
    "allowWebUsers": false,
    "translateTextActivated": false,
    "belongsToPublishingProject": false,
    "helpURL": "http://help.sitevision.se",
    "viewTypeMenu": [
        "element",
        "marketplace",
        "publishingproject",
        "datastorage",
        "file",
        "template",
        "page",
        "image",
        "addon",
        "decoration"
    ],
    "userInfo": {
        "fullName": "System",
        "title": "Administratör"
    },
    "hasReadPermissionOnSite": true,
    "siteName": "Sitevision",
    "showPublishReminderOnNameChange": false,
    "contentTreeData": [
        {
            "key": "94.4a64735e1873d0b61d358",
            "title": "Mittenspalt",
            "icon": "/edit-icons/content_area_flat_16.png",
            "contentNodeType": "verticalLayout",
            "draggable": true,
            "folder": true,
            "expanded": true,
            "children": [
                {
                    "key": "12.4a64735e1873d0b61d359",
                    "title": "Text",
                    "icon": "/edit-icons/text_portlet_flat_16.png",
                    "contentNodeType": "text",
                    "draggable": true
                },
                {
                    "key": "12.343061a41873e1c6bd41",
                    "title": "Skript",
                    "icon": "/edit-icons/cube4_flat_16.png",
                    "contentNodeType": "script",
                    "draggable": true
                }
            ]
        }
    ]
}

*/
