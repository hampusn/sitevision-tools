import { StringTemplateData } from '../types'

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
