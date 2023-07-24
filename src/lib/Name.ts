import { strings } from 'gluegun'

/**
 * Wraps a string with magical getters for different naming conventions.
 * 
 * Mainly used together with StringTemplate class in the generate command 
 * to format file paths and class names.
 * 
 * @example
 * const name = new Name('Jane Doe');
 * 
 * String(name); // "Jane Doe"
 * name.pascal; // "JaneDoe"
 * name.camel; // "janeDoe"
 * name.hyphend; // "jane-doe"
 */
export default class Name {
  raw: string = ''
  
  private _pascal: string = ''
  private _camel: string = ''
  private _hyphend: string = ''

  constructor (raw: string) {
    this.raw = raw
  }

  /**
   * Returns the name in pascal case.
   * "Something peculiar" => "SomethingPeculiar"
   */
  get pascal (): string {
    if (!this._pascal && this.raw) {
      this._pascal = strings.pascalCase(this.raw)
    }

    return this._pascal
  }

  /**
   * Returns the name in camel case.
   * "Winter is coming" => "winterIsComing"
   */
  get camel (): string {
    if (!this._camel && this.raw) {
      this._camel = strings.camelCase(this.raw)
    }

    return this._camel
  }

  /**
   * Returns the name but with all parts lower cased and separated by a hyphen character.
   * "Lorem Ipsum dolor" => "lorem-ipsum-dolor"
   */
  get hyphend (): string {
    if (!this._hyphend && this.raw) {
      this._hyphend = strings.kebabCase(this.raw)
    }

    return this._hyphend
  }

  /**
   * Returns the name unmodified/raw.
   */
  toString (): string {
    return this.raw
  }
}
