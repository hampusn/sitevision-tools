
const NO_PROTOCOL_REGEX = /(?:(?:https?)?:?\/\/)?(.*)/i


/**
 * Parse contents as JSON and always return an literal object.
 */
export const parseJson = function parseJson (contents: any): Record<string, any> {
  try {
    return JSON.parse(contents)
  } catch (e) { /* ... */ }

  return {}
}

export const parseOrigin = function parseOrigin (url: string): string {
  if (!url.toLowerCase().startsWith('http')) {
    url = `https://${url}`
  }

  return new URL(url).origin
}

export const removeProtocolFromUrl = function removeProtocolFromUrl (url: string): string {
  return NO_PROTOCOL_REGEX.exec(url)?.[1] || null
}

export const escapeRegex = function escapeRegex (str: string): string {
  return str.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
}
