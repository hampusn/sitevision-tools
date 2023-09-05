import { ApisauceInstance } from 'apisauce'
import { StoreExtension } from '../../types'

interface IApi {}

export type ApiContext = {
  store: StoreExtension
}

export default class Api2 implements IApi {
  protected _transporter: ApisauceInstance
  private _apiContext: ApiContext

  constructor (transporter: ApisauceInstance, apiContext: ApiContext) {
    this._transporter = transporter
    this._apiContext = apiContext
  }
}













/*
// jshint esversion: 6
const createClient = require("webdav");
const log = require('npmlog');
const request = require('request-promise-native');
const errors = require('request-promise-native/errors');
const nodeFetch = require("node-fetch");
const setCookieParser = require('set-cookie-parser');
const UUIDv4 = require('@limepark/uuidv4');
const cheerio = require('cheerio');
const { addErrorData, addErrorException }  =require('./error-data');
const StatSender = require('./stats');
const LOG_TAG = 'SVAPI';
const { URL, parse } = require('url');
const SitevisionFiles = require('./sitevision-files');

// const onCookieUpdates = (function () {
//   const funs = [];
//   const addHandler = function addHandler(fun) {
//     funs.push(fun);
//   };

//   addHandler.trigger = function triggerOnCookieUpdates(cookies) {
//     funs.forEach(fun => fun(cookies));
//   }

//   return addHandler;
// }());

// createClient.setFetchMethod((url, options) => {
//   options.headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36';
//   return nodeFetch(url, options).then(res => {
//     const setCookieHeader = res.headers.get('set-cookie');
//     if (setCookieHeader) {
//       const cookies = setCookieParser.parse(setCookieHeader)
//         .reduce((obj, cookie) => {
//           obj[cookie.name] = cookie.value;
//           return obj;
//         }, {});

//       onCookieUpdates.trigger(cookies);
//     }

//     return res;
//   })
// });

// class SitevisionFiles {
//   constructor(svapi) {
//     this.svapi = svapi;
//     this.webdav = svapi.webdav;
//   }

//    * Lists all files and directories from Sitevision.
//    *
//    * @return     {Promise}  array stat of all files/folders
//   async listAll() {
//     const folderFetchQueue = ['/'];
//     const items = [];

//     let maxIterations = 999;
//     while (folderFetchQueue.length > 0 && --maxIterations > 0) {
//       const nextFolder = folderFetchQueue.shift();
//       const folderStat = await this.webdav.stat(nextFolder);
//       const folderItems = await this.webdav.getDirectoryContents(nextFolder);

//       folderItems.forEach(item => {
//         if (item.type == 'directory') {
//           folderFetchQueue.push(item.filename);
//         }

//         items.push(item);
//       });
//     }

//     return items;
//   }

//   async ensureDir(dirName) {
//     try {
//       const stat = await this.webdav.stat(dirName);
//       return true;
//     } catch (ex) { }

//     const parts = dirName.split('/').filter(dir => dir != '');
//     const curr = [];
//     for (var i = 0; i < parts.length; i++) {
//       curr.push(parts[i]);

//       const dirToCheck = curr.join('/');
//       try {
//         await this.webdav.stat(dirToCheck);
//       } catch (ex) {
//         try {
//           await this.webdav.createDirectory(dirToCheck);
//         } catch (ex) {
//           // log somewhere.
//           log.error(LOG_TAG, `Unable to create directory ${dirToCheck}`, ex);
//           return false;
//         }
//       }
//     }

//     return true;
//   }
// }

class SitevisionAuthenticationException extends Error {

}

class SitevisionRedirectException extends Error {
  constructor(message, host, target) {
    super(message);

    this.host = host;
    this.target = target;

    Error.captureStackTrace(this, this.constructor);
  }
}

class SitevisionCertificateError extends Error {

}

const sleep = function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), delay);
  })
}

// const wrapWithAuthentication = function wrapWithAuthentication(webdav, cookies, svapi) {
//   const authenticatedWebdavClient = {};
//   onCookieUpdates(function receiveNewCookies(newCookies) {
//     cookies = Object.assign({}, cookies, newCookies);
//   });

//   const getCurrentCookies = () => cookies;

//   Object.keys(webdav).forEach(key => {
//     const method = webdav[key];
//     const expectedArgumentCount = method.length;

//     authenticatedWebdavClient[key] = async function () {
//       const cookies = getCurrentCookies();

//       const headerOptions = {
//         Cookie: Object.keys(cookies).map(cookieName => [encodeURIComponent(cookieName), encodeURIComponent(cookies[cookieName])].join('=')).join(';')
//       };

//       const args = [];
//       for (var i = 0; i < expectedArgumentCount; i++) {
//         args[i] = arguments[i];
//       }

//       //
//       // First argument is always path so we make a replace for windows \ => /
//       args[0] = args[0].replace(/\\/g, '/');

//       //
//       // Last argument is options, add headers to that.
//       args[args.length - 1] = Object.assign({}, args[args.length - 1] || {}, { headers: headerOptions });

//       for (var i = 0; i < 5; i++) {
//         try {
//           const result = await method.apply(webdav, args);

//           return result;
//         } catch (ex) {
//           if (ex.toString().indexOf('Unauthorized') !== -1) {
//             log.warn(LOG_TAG, 'Request failed with 401 Unauthorized. Trying to add basic authentication to next request.');
//             headerOptions.Authorization = 'Basic ' + Buffer.from(`${svapi.username}:${svapi.password}`).toString('base64');
//             await sleep(i * 500);
//           } else if (ex.toString().indexOf('ECONNREFUSED') === -1) {
//             throw ex;
//           } else {
//             log.warn(LOG_TAG, `${key} failed: Connection refused. Trying again.`);
//             await sleep(i * 500);
//           }
//         }
//       }
//     };
//   });

//   return authenticatedWebdavClient;
// };

class SitevisionApi {
  constructor(host, credentials, config = null) {
    this.host = host.replace(/\/+$/, '');
    this.hostname = new URL(host).hostname;
    
    this.credentialType = credentials.credentialType || 'password';
    this._cookies = null;

    if (credentials.credentialType === 'cookie') {
      this._cookies = credentials.cookies;
    } else {
      this.username = credentials.username;
      this.password = credentials.password;
    }
    
    this.siteNode = null;
    this.config = config;

    this.keepAliveInterval = null;
    this.keepAliveTimeout = 10 * 60 * 1000;
    this.config = config;
    this.statSessionId = UUIDv4.getInstance();

    this.statTimeout = 1 * 60 * 1000;
    this.statInterval = null;

    this.sessionId = null;
    this._loginSuccess = false;
    

    this.utils = require('./utils');
  }

  _useSelectedLoginMethod(opts) {
    if (this.credentialType === 'cookie') {
      opts.headers = {
        ...opts.headers,
        cookie: Object.keys(this._cookies).map(cookieName => [cookieName, this._cookies[cookieName]].join('=')).join(';')
      };

      delete opts.auth;
    } else if (this.config.useQuerystringLogin) {
      log.info(LOG_TAG, `Using experimental QueryString login`);
      let separator = '?';
      if (opts.url.indexOf('?') > -1) {
        separator = '&';
      }

      opts.url = opts.url + `${separator}name=${encodeURIComponent(opts.auth.user)}&pwd=${encodeURIComponent(opts.auth.pass)}&portletLogin=${encodeURIComponent('Logga in')}`;
      delete opts.auth;
    }

    return opts;
  }

  _collectCookies(headers) {
    return headers['set-cookie'].reduce((obj, cookie, index) => {
      const [key, value] = cookie.substr(0, cookie.indexOf(';')).split("=");
      obj[key] = value;

      return obj;
    }, {});
  }

  async _doubleCheckLoginSuccess(loginResponse) {
    const cookies = this._collectCookies(loginResponse.headers);
    const headerOptions = {
      cookie: Object.keys(cookies).map(cookieName => [cookieName, cookies[cookieName]].join('=')).join(';')
    };

    try {
      const response = await request({
        url: this.host,
        resolveWithFullResponse: true,
        headers: headerOptions
      });

      const isLoggedIn = response.body.indexOf('id="sv-editor-menu"');
      return {
        success: isLoggedIn,
        response
      }
    } catch (ex) {
      log.error(LOG_TAG, 'Double check failed');
      return {
        success: false,
        response: null
      }
    }
  }

  async _login() {
    let response;
    try {
      response = await request(this._useSelectedLoginMethod({
        url: this.host,
        resolveWithFullResponse: true,
        followRedirect: false,
        auth: {
          user: this.username,
          pass: this.password,
          sendImmediately: true
        }
      }));
    } catch (ex) {
      addErrorData('login-response', response);
      addErrorException(ex);

      if (ex.statusCode === 401) {
        throw new SitevisionAuthenticationException(`Unable to login on ${this.host} using ${this.username}. Username/password error.`);
      } else if (ex.statusCode === 301 || ex.statusCode === 302) {
        const target = new URL(ex.response.headers.location, this.host);
        const source = new URL(this.host);
        let message = null;

        if (target.hostname == source.hostname && target.protocol != source.protocol) {
          message = `Protocol changed from ${source.protocol} to ${target.protocol}`;
          throw new SitevisionRedirectException(message, source, target);
        } else if (target.hostname != source.hostname && target.protocol == source.protocol) {
          message = `Hostname changed from ${source.hostname} to ${target.hostname}`;
          throw new SitevisionRedirectException(message, source, target);
        } else if (target.hostname != source.hostname && target.protocol != source.protocol) {
          message = `Protocol and hostname changed from changed from ${source.protocol}//${source.hostname} to ${target.protocol}//${target.hostname}`;
          throw new SitevisionRedirectException(message, source, target);
        } else if (target.search.indexOf('redirect=') > -1) {
          const doubleCheckedResponse = await this._doubleCheckLoginSuccess(ex.response);
          if (doubleCheckedResponse.success) {
            response = doubleCheckedResponse.response;
          } else {
            throw new SitevisionAuthenticationException(`Unable to login on ${this.host} using ${this.username}. A redirect was made to ${target.toString()} during login.`);
          }
        } else {
          throw new SitevisionAuthenticationException(`Unable to login on ${this.host} using ${this.username}. A redirect was made to ${target.toString()} during login.`);
        }
      } else {
        throw ex;
      }
    }

    const isLoggedIn = response.body.includes('id="sv-editor-menu"');
    if (isLoggedIn && (response.headers['set-cookie'] || this.credentialType === 'cookie')) {
      const cookies = this.credentialType === 'cookie' ? this._cookies : this._collectCookies(response.headers);
      const SESSION_ID_COOKIE = 'JSESSIONID';
      const sessionIdCookie = cookies[SESSION_ID_COOKIE];
      if (sessionIdCookie) {
        this._cookies = cookies;
        this.sessionId = sessionIdCookie;
      } else {
        throw new SitevisionAuthenticationException(`Unable to login on ${this.host} using ${this.username}. No JSESSIONID cookie was present in headers`);
      }

      if (!this.sessionId) {
        throw new SitevisionAuthenticationException(`Unable to login on ${this.host} using ${this.username}. Unable to resolve session id`);
      }
    } else {
      addErrorData('login-response', response);
      throw new SitevisionAuthenticationException(`Unable to login on ${this.host} using ${this.username}. (No 'sv-editor-menu' was present)`);
    }

    return true;
  }

  async getSiteInfo() {
    if (!this.sessionId) {
      return null;
    }

    const headerOptions = {
      cookie: Object.keys(this._cookies).map(cookieName => [cookieName, this._cookies[cookieName]].join('=')).join(';')
    };

    log.info(LOG_TAG, `Requesting ${this.host + '/edit'}`);
    const response = await request(this._useSelectedLoginMethod({
      url: this.host + '/edit',
      headers: headerOptions,
      followRedirect: true,
      resolveWithFullResponse: true,
      gzip: true,
      auth: {
        user: this.username,
        pass: this.password,
        sendImmediately: true
      }
    }));

    log.verbose(LOG_TAG, `Loading response in cheerio`, response.headers);
    const $ = cheerio.load(response.body);
    const scriptTags = $('script').toArray();
    let bootstrapData = null;
    log.verbose(LOG_TAG, `Scanning ${scriptTags.length} script tags for bootstrapData`);

    for (const script of scriptTags) {
      const scriptCode = $(script).html();
      log.verbose(LOG_TAG, `Scanning script code for bootstrapData`, scriptCode);

      if (scriptCode.indexOf('bootstrapData') > -1) {
        log.info(LOG_TAG, 'Found bootstrap data');
        bootstrapData = new Function(scriptCode + '; return bootstrapData;')();
        break;
      }
    }

    if (!bootstrapData) {
      log.error(LOG_TAG, 'Unable to find bootstrap data from SiteVision. Unable to scan for addons.');
    }

    return bootstrapData;
  }

  async getAllAddons(customModuleRepositoryId) {
    if (!customModuleRepositoryId) {
      return null;
    }

    try {
      const headerOptions = {
        cookie: Object.keys(this._cookies).map(cookieName => [cookieName, this._cookies[cookieName]].join('=')).join(';')
      };

      //http://gw.test/edit-api/1/190.3260292015ff3ada3b187/190.3260292015ff3ada3b187/fullNodeData/190.3260292015ff3ada3b187?viewType=addon&_=1566474010499/
      log.info(LOG_TAG, 'Requesting addons from ' + this.host);
      const fullNodeData = JSON.parse(await request(this._useSelectedLoginMethod({
        url: this.host + `/edit-api/1/${customModuleRepositoryId}/${customModuleRepositoryId}/fullNodeData/${customModuleRepositoryId}?viewType=addon`,
        headers: headerOptions,
        auth: {
          user: this.username,
          pass: this.password,
          sendImmediately: true
        }
      })));

      if (!fullNodeData) {
        log.error(LOG_TAG, `Unable to get fullNodeData for ${customModuleRepositoryId}`);
      }

      return fullNodeData.treeData;
    } catch (ex) {
      log.error(LOG_TAG, `Failed to get addons from SiteVision: ${ex.toString()}`);
    }
  }

  async init() {
    try {
      this._loginSuccess = await this._login();
    } catch (ex) {
      if (ex instanceof SitevisionAuthenticationException) {
        log.error(LOG_TAG, ex.toString());
        this._loginSuccess = false;
      } else if (ex instanceof SitevisionRedirectException) {
        log.error(LOG_TAG, ex.toString());
        this._loginSuccess = false;

        //
        // Pass this down. This is probably not how it should be done.
        throw ex;
      } else if (ex instanceof errors.RequestError) {
        await this.utils.dumpStackTrace(ex);
        log.error(LOG_TAG, 'Request error: ' + ex.cause);
        if (['CERT_HAS_EXPIRED', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'ERR_TLS_CERT_ALTNAME_INVALID'].indexOf(ex.cause.code) > -1) {
          //
          // Generate a new error. This is probably not how it should be done.
          throw new SitevisionCertificateError();
        }
      } else {
        log.error(LOG_TAG, 'Unknown error: ' + ex.toString());
        this.utils.dumpStackTrace(ex);
      }
    }

    if (this._loginSuccess) {
      //this.webdav = wrapWithAuthentication(createClient(this.host + '/webdav/files/' + (this.config && this.config.path ? this.config.path : '')), this._cookies, this);
      this.files = new SitevisionFiles(this, this.config && this.config.path ? this.config.path : '');
      await this.files.init();

      StatSender.ping(this.statSessionId, this.hostname);
    }
  }

  async validate() {
    return this._loginSuccess;
  }

  keepAlive() {
    this.startStatSender();

    if (this.keepAliveInterval != null) {
      return true;
    }

    this.keepAliveInterval = setInterval(() => {
      this._ping();
    }, this.keepAliveTimeout);

    return true;
  }

  stopKeepAlive() {
    if (this.keepAliveInterval == null) {
      return true;
    }

    clearInterval(this.keepAliveInterval);
    this.keepAliveInterval = null;

    return true;
  }

  startStatSender() {
    if (this.statInterval != null) {
      return true;
    }

    StatSender.ping(this.statSessionId, this.hostname);

    this.statInterval = setInterval(() => {
      StatSender.ping(this.statSessionId, this.hostname);
    }, this.statTimeout);

    return true;
  }

  stopStatSender() {
    if (this.statInterval == null) {
      return true;
    }

    clearInterval(this.statInterval);
    this.statInterval = null;

    return true;
  }

  async cleanUp() {
    this.stopStatSender();
    await StatSender.remove(this.statSessionId);
    return this.stopKeepAlive();
  }

  async _ping() {
    // just access homepage
    // to keep login session alive.
    const headerOptions = {
      cookie: Object.keys(this._cookies).map(cookieName => [cookieName, this._cookies[cookieName]].join('=')).join(';')
    };

    StatSender.ping(this.statSessionId, this.hostname);

    try {
      log.info(LOG_TAG, `Requesting ${this.host} too keep session alive.`);
      for (var i = 0; i < 5; i++) {
        try {
          const response = await request({
            url: this.host,
            headers: headerOptions
          });

          return true;
        } catch (ex) {
          if (ex.toString().indexOf('ECONNREFUSED') === -1) {
            throw ex;
          } else {
            log.warn(LOG_TAG, `Ping failed: Connection refused. Trying again.`);
            await sleep(i * 500);
          }
        }
      }
    } catch (ex) {
      log.error(LOG_TAG, `Error when requesting ${this.host} in _ping: ${ex.toString()}`);
      this.utils.dumpStackTrace(ex);
      await this.utils.quit();
    }
  }
}

const createSitevisionApiInstance = async function createSitevisionApiInstance(host, credentials, config) {
  const instance = new SitevisionApi(host, credentials, config);
  await instance.init();
  const isValid = await instance.validate();
  instance.keepAlive();

  return isValid ? instance : null;
}

module.exports.createSitevisionApiInstance = createSitevisionApiInstance;
module.exports.SitevisionRedirectException = SitevisionRedirectException;
module.exports.SitevisionCertificateError = SitevisionCertificateError;
*/
