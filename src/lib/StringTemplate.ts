import { StringTemplateData } from '../types'

/**
 * A simple template language for adding a variant of template literals 
 * which will be built when used the first time.
 * 
 * This is mainly used for adding support for variables in JSON strings.
 * 
 * @example
 * const data = { first: 'Hello', second: { third: 'World!' } };
 * const aTemplate = '${first} ${second.third}';
 * const stringTemplate = new StringTemplate(aTemplate);
 * 
 * const result = stringTemplate.exec(data);
 * // "Hello World!"
 */
export default class StringTemplate {
  template: string = ''
  private _templateFn: Function = null

  constructor (template: string) {
    this.template = template
  }

  exec (data: StringTemplateData): string {
    if (!this._templateFn) {
      const sanitized = this.template
        .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, (_, match) => `\$\{__data__.${match.trim()}\}`)
        .replace(/(\$\{(?!__data__\.)[^}]+\})/g, '')

      this._templateFn = Function('__data__', `return \`${sanitized}\``)
    }

    return this._templateFn.call(null, data)
  }

}
