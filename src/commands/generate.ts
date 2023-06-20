import { GluegunToolbox } from 'gluegun'
import { Generator, SimpleGenerator } from '../types'
import Name from '../lib/Name'
import StringTemplate from '../lib/StringTemplate'
import { basename, dirname } from 'path'
import untildify from 'untildify'

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      /* pluginName, */
      parameters,
       template: { generate },
       print: { info, error, success, muted },
      /* config, */
    } = toolbox

    const generator: Generator | SimpleGenerator = toolbox.getGenerator(parameters.first)

    if (!generator) {
      if (parameters.first) {
        error(`No generator by the name of '${parameters.first}' found.`)
      } else {
        error('You need to pass a generator name as an argument.')
      }

      await toolbox.getGenerator('help')?.run()
      
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
    const name = new Name(parameters.second)
    for (const file of (generator as SimpleGenerator).files) {
      if (typeof file.condition === 'function') {
        if (!file.condition.call(null, toolbox)) {
          muted('File skipped. Condition not met.')
          continue;
        }
      }

      const path = new StringTemplate(file.target)
      const data = file.context?.call(null, { name }, toolbox) || { name }
      const fullPath = untildify(path.exec(data))
      const templatePath = untildify(file.template)

      generate({
        template: basename(templatePath),
        target: fullPath,
        props: data,
        directory: dirname(templatePath),
      }).then(() => {
        success(`Created ${fullPath}`)
      }).catch((err) => {
        error(`${err}`)
      })
    }



    
    /* info(parameters) */

    // info(generator)
    

    // info(toolbox)

    /* await generate({
      template: 'model.ts.ejs',
      target: `models/${name}-model.ts`,
      props: { name },
    }) */

    /* info(`Generated file at models/${name}-model.ts`) */
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
