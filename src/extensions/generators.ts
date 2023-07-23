import { Generators, Generator, SimpleGenerator, GeneratorWrapper, GenerateCommandToolbox } from '../types'
import Name from '../lib/Name'
import StringTemplate from '../lib/StringTemplate'
import untildify from 'untildify'

module.exports = (toolbox: GenerateCommandToolbox) => {
  const {
    runtime: { brand },
    print: { muted, success, error, checkmark, xmark },
    template: { generate },
    parameters,
  } = toolbox

  const createGeneratorFromSimple = (simpleGenerator: SimpleGenerator): Generator => {
    return {
      async run () {
        const name = new Name(parameters.second)
        const data = simpleGenerator.context?.call(null, { name }, toolbox) || { name }
        const directory = simpleGenerator.dir ? untildify(simpleGenerator.dir) : null

        for (const file of simpleGenerator.files) {
          if (typeof file.condition === 'function') {
            if (!file.condition.call(null, toolbox, data)) {
              muted(`- Skipped template ${file.template})`)
              continue;
            }
          }

          const path = new StringTemplate(file.target)
          const fullPath = untildify(path.exec(data))
          const templatePath = untildify(file.template)

          generate({
            template: templatePath,
            target: fullPath,
            props: data,
            directory
          }).then(() => {
            success(`${checkmark} Created ${fullPath}`)
          }).catch((err) => {
            error(`${xmark} ${err}`)
          })
        }
      },
      description: simpleGenerator.description,
      help: simpleGenerator.help,
      optionalName: !!simpleGenerator.optionalName,
    }
  }

  /**
   * Get all generators from the config object.
   * 
   * @returns {Generators}
   */
  const getAll = (): Generators => {
    const { config } = toolbox
    
    return config[brand]?.generators || {}
  }

  /**
   * Get a generator by name.
   */
  const get = (name: string): Generator | null => {
    const generators: Generators = getAll()

    if (typeof generators[name] === 'function') {
      return (generators[name] as GeneratorWrapper)(toolbox)
    } else if (typeof generators[name] === 'object' && generators[name] !== null) {
      return createGeneratorFromSimple(generators[name] as SimpleGenerator)
    }

    return null
  }

  toolbox.generators = {
    getAll,
    get
  }
}
