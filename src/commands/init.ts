import { GluegunToolbox } from 'gluegun'
import { parseJson } from '../lib/utils'
import { ProjectType } from '../consts'
/* import { cosmiconfigSync } from 'cosmiconfig'
import { basename, dirname } from 'path' */

module.exports = {
  name: 'init',
  description: 'Initializes a project with a configuration file marking the project root.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      /* pluginName, */
      /* parameters, */
      config,
      filesystem,
      print: { info },
      prompt,
    } = toolbox

    /*
    const explorer = cosmiconfigSync(pluginName)

    info(explorer.search())

    const dir = dirname(explorer.search()?.filepath || '')
    const base = basename(dir)

    info('dir: ' + dir)
    info('base: ' + base)
    */
  /* 
    toolbox.projectDir = 
  
  
    const rootPath = findUpSync(YEOMAN_CONFIG_FILE_NAME, {
      cwd: instance.destinationRoot()
    }) */

    /* const tsConfigExists = filesystem.exists('tsconfig.json') */
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
      { message: 'Other', name: ProjectType.OTHER },
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
          return value
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
      },
      {
        type: 'input',
        name: 'author.email',
        message: 'Author email',
        skip: () => useDefaultAuthor,
      },

      {
        type: 'input',
        name: 'script.cssPrefix',
        message: 'Prefix for css classes (e.g. "sv-")',
        skip: () => projectType !== ProjectType.WEBSITE,
        result: (value) => String(value).trim(),
      },
      {
        type: 'input',
        name: 'script.dir',
        message: 'Directory to place script modules in relative to project root (e.g. "files/modules")',
        skip: () => projectType !== ProjectType.WEBSITE,
        result: (value) => String(value).trim(),
      },
    ])


    config.save(answers)
    


    info(`ANSWERS:`)
    info(answers)
    // info(parameters)

    // const myConfig = loadConfig(pluginName, process.cwd())

    /* info(config) */

  },
}



/*


async initializing () {
    await injectConf(this);

    this.tsConfigExists = this.fs.exists(this.destinationPath('tsconfig.json'));
    const manifestContents = await fileContents(this.destinationPath('manifest.json'));
    if (manifestContents) {
      this.defaultType = parseJson(manifestContents).type;
    }
  }

  async prompting () {
    const stored = this.config.getAll();
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Select the kind of project you are working on',
        choices: [
          { name: 'WebApp', value: PROJECT_TYPE_WEBAPP },
          { name: 'RESTApp', value: PROJECT_TYPE_RESTAPP },
          { name: 'Website (Sitevision files archive)', value: PROJECT_TYPE_WEBSITE },
          { name: 'Other', value: PROJECT_TYPE_OTHER },
        ],
        default: typeof stored.type === 'string' ? stored.type : (this.defaultType || PROJECT_TYPE_WEBSITE),
      },
      {
        type: 'confirm',
        name: 'useDefaultAuthor',
        message: 'Use default author (resolved from .yo-sitevision.json)?',
      },
      {
        type: 'input',
        name: 'author.name',
        message: 'Author name',
        when: ({ useDefaultAuthor }) => !useDefaultAuthor,
      },
      {
        type: 'input',
        name: 'author.email',
        message: 'Author email',
        when: ({ useDefaultAuthor }) => !useDefaultAuthor,
      },

      // Website specific questions
      {
        type: 'input',
        name: 'sm.cssPrefix',
        message: 'Prefix for css classes (e.g. "sv-")',
        when: ({ type }) => type === PROJECT_TYPE_WEBSITE,
        filter: (v) => String(v).trim(),
        default: stored.sm?.cssPrefix,
      },
      {
        type: 'input',
        name: 'sm.dir',
        message: 'Directory to place script modules in relative to project root (e.g. "files/modules")',
        when: ({ type }) => type === PROJECT_TYPE_WEBSITE,
        filter: (v) => String(v).trim(),
        default: stored.sm?.dir,
      },

      // WebApp specific questions
      {
        type: 'input',
        name: 'app.componentDir',
        message: 'Directory to place components in relative to app root (e.g. "src/components")',
        when: ({ type }) => type === PROJECT_TYPE_WEBAPP,
        filter: (v) => String(v).trim(),
        default: stored.app?.componentDir,
      },
      {
        type: 'list',
        name: 'app.componentStructure',
        message: 'Do you want a separate directory for each component or all components together?',
        choices: [
          { name: 'Directory (components/Component/Component.{js,css})', value: COMPONENT_STRUCTURE_TYPE_DIRECTORY },
          { name: 'Flat (components/Component.{js,css})', value: COMPONENT_STRUCTURE_TYPE_FLAT },
        ],
        when: ({ type }) => type === PROJECT_TYPE_WEBAPP,
        filter: (v) => String(v).trim(),
        default: stored.app?.componentStructure,
      },

      // App specific questions
      {
        type: 'confirm',
        name: 'app.useTs',
        message: 'Do you use TypeScript?',
        when: ({ type }) => type === PROJECT_TYPE_WEBAPP || type === PROJECT_TYPE_RESTAPP,
        default: typeof stored.app?.useTs === 'boolean' ? stored.app?.useTs : this.tsConfigExists,
      },
    ]);
  }

*/
