import { strings } from 'gluegun'

export default class Name {
  raw: string = ''
  
  private _pascal: string = ''
  private _camel: string = ''
  private _hyphend: string = ''

  constructor (raw: string) {
    this.raw = raw
  }

  get pascal (): string {
    if (!this._pascal && this.raw) {
      this._pascal = strings.pascalCase(this.raw)
    }

    return this._pascal
  }

  get camel (): string {
    if (!this._camel && this.raw) {
      this._camel = strings.camelCase(this.raw)
    }

    return this._camel
  }

  get hyphend (): string {
    if (!this._hyphend && this.raw) {
      this._hyphend = strings.kebabCase(this.raw)
    }

    return this._hyphend
  }

  toString (): string {
    return this.raw
  }
}
