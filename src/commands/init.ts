import { parseJson } from '../lib/utils'
import { ComponentStructureType, ProjectType } from '../consts'
import { InitCommandToolbox } from '../types'

/**
 * TODO:
 * - Refactor config questions
 * - Expose questions in plugins for custom questions/data
 */

module.exports = {
  name: 'init',
  alias: ['i'],
  description: 'Initializes a project with a configuration file marking the project root.',
  run: async (toolbox: InitCommandToolbox) => {
    const {
      config,
      filesystem,
      print: { info, success, newline },
      prompt,
    } = toolbox

    const tsConfigExists = filesystem.exists('tsconfig.json')
    const manifestContents = filesystem.read('manifest.json')
    let defaultType = ''

    if (manifestContents) {
      defaultType = parseJson(manifestContents).type
    }

    defaultType = defaultType || ProjectType.WEBSITE

    const projectTypes = [
      { message: 'WebApp', name: ProjectType.WEBAPP },
      { message: 'RESTApp', name: ProjectType.RESTAPP },
      { message: 'Website (Sitevision files archive)', name: ProjectType.WEBSITE },
      { message: 'Unspecified (Inherit from configuration)', name: ProjectType.UNSPECIFIED },
    ]

    let initialProject = projectTypes.findIndex(({ name }) => name === defaultType)
    
    if (initialProject === -1) {
      initialProject = projectTypes.findIndex(({ name }) => name === ProjectType.WEBSITE)
    }

    let useDefaultAuthor = null
    let projectType = null
    const answers = await prompt.ask([
      {
        type: 'select',
        name: 'type',
        message: 'Select the kind of project you are working on',
        choices: projectTypes,
        initial: initialProject,
        result (value) {
          projectType = value

          return value === ProjectType.UNSPECIFIED ? '' : value
        },
      },

      {
        type: 'confirm',
        name: 'author.useDefault',
        message: 'Use default author (resolved from config)?',
        initial: true,
        result (value) {
          useDefaultAuthor = value

          return value
        },
      },

      {
        type: 'input',
        name: 'author.name',
        message: 'Author name',
        skip: () => useDefaultAuthor,
        result: (value) => value || undefined,
      },

      {
        type: 'input',
        name: 'author.email',
        message: 'Author email',
        skip: () => useDefaultAuthor,
        result: (value) => value || undefined,
      },

      {
        type: 'input',
        name: 'script.cssPrefix',
        message: 'Prefix for css classes (e.g. "sv-")',
        skip: () => projectType !== ProjectType.WEBSITE,
        result: (value) => String(value).trim() || undefined,
      },

      {
        type: 'input',
        name: 'script.dir',
        message: 'Directory to place script modules in relative to project root (e.g. "files/modules")',
        skip: () => projectType !== ProjectType.WEBSITE,
        result: (value) => String(value).trim(),
      },

      {
        type: 'input',
        name: 'component.dir',
        message: 'Directory to place components in relative to app root (e.g. "src/components")',
        skip: () => projectType !== ProjectType.WEBAPP,
        result: (value) => String(value).trim(),
      },

      {
        type: 'select',
        name: 'component.structure',
        message: 'Do you want a separate directory for each component or all components together?',
        choices: [
          { message: 'Unspecified (Inherit from configuration)', name: ComponentStructureType.UNSPECIFIED },
          { message: 'Directory ([component.dir]/Component/Component.{js,css})', name: ComponentStructureType.DIRECTORY },
          { message: 'Flat ([component.dir]/Component.{js,css})', name: ComponentStructureType.FLAT },
        ],
        skip: () => projectType !== ProjectType.WEBAPP,
        initial: 1,
        result: (value) => value === ComponentStructureType.UNSPECIFIED ? '' : value,
      },

      {
        type: 'confirm',
        name: 'typescript',
        message: 'Do you use TypeScript?',
        skip: () => projectType !== ProjectType.WEBAPP && projectType !== ProjectType.RESTAPP,
        initial: tsConfigExists,
      },
    ])

    config.save(answers)

    newline()
    success(`Stored configuration in ${config.configPath()}`)
    info(answers)
  },
}
