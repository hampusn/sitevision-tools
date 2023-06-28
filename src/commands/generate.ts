import { GluegunToolbox } from 'gluegun'
import { Generator, SimpleGenerator } from '../types'
import Name from '../lib/Name'
import StringTemplate from '../lib/StringTemplate'
// import { basename/* , dirname */ } from 'path'
import untildify from 'untildify'

module.exports = {
  name: 'generate',
  alias: ['g'],
  description: 'Generate files for things such as a webapp component, a script module or.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      /* pluginName, */
      parameters,
      template: { generate },
      print: { info, error, success, muted },
      /* config, */
      generators
    } = toolbox

    const generator: Generator | SimpleGenerator = generators.get(parameters.first)

    if (!generator) {
      if (parameters.first) {
        error(`No generator by the name of '${parameters.first}' found.`)
      } else {
        error('You need to pass a generator name as an argument.')
      }

      await generators.get('help')?.run()
      
      return null
    }

    if (parameters.options.help) {
      if (typeof generator.help === 'function') {
        await generator.help()
      } else if (typeof generator.help === 'string') {
        info(generator.help)
      }

      return null
    }

    // Standard Generator (callback logic)
    if (typeof (generator as Generator).run === 'function') {
      return await (generator as Generator).run()
    }

    // Simple Generator (template files)
    const simpleGenerator = generator as SimpleGenerator
    const name = new Name(parameters.second)
    const data = simpleGenerator.context?.call(null, { name }, toolbox) || { name }
    const directory = simpleGenerator.dir ? untildify(simpleGenerator.dir) : null
    for (const file of simpleGenerator.files) {
      if (typeof file.condition === 'function') {
        if (!file.condition.call(null, toolbox)) {
          muted('File skipped. Condition not met.')
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
        success(`Created ${fullPath}`)
      }).catch((err) => {
        error(`${err}`)
      })
    }
  },
}

/*

{
  plugin: 'sitevision-tools',
  command: 'generate',
  array: [ 'foo', 'bar' ],
  options: { test: true },
  raw: [
    '/Users/hampus/.nvm/versions/node/v18.15.0/bin/node',
    '/Users/hampus/.nvm/versions/node/v18.15.0/bin/sitevision-tools',
    'g',
    'foo',
    'bar',
    '--test'
  ],
  argv: [
    '/Users/hampus/.nvm/versions/node/v18.15.0/bin/node',
    '/Users/hampus/.nvm/versions/node/v18.15.0/bin/sitevision-tools',
    'g',
    'foo',
    'bar',
    '--test'
  ],
  first: 'foo',
  second: 'bar',
  third: undefined,
  string: 'foo bar'
}

*/
