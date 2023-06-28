/**
 * Parse contents as JSON and always return an literal object.
 * 
 * @param {string} contents 
 * @returns {Object} Literal object of JSON contents.
 */
export const parseJson = function parseJson (contents) {
  try {
    return JSON.parse(contents)
  } catch (e) { /* ... */ }

  return {}
}
