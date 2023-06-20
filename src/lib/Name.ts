import camelcase from 'camelcase'
import decamelize from 'decamelize'

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
      this._pascal = camelcase(this.raw, { pascalCase: true })
    }

    return this._pascal
  }

  get camel (): string {
    if (!this._camel && this.raw) {
      this._camel = camelcase(this.raw)
    }

    return this._camel
  }

  get hyphend (): string {
    if (!this._hyphend && this.raw) {
      this._hyphend = decamelize(this.camel, { separator: '-' })
    }

    return this._hyphend
  }

  toString (): string {
    return this.raw
  }
}
