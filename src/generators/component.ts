import { ComponentStructureType } from '../consts'
import { SimpleGenerator } from '../types'

export default <SimpleGenerator>{
  description: 'Generate a component for your webapp.',
  help: (toolbox) => {
    const { print: { info, newline } } = toolbox

    info('Creates files for a component to your webapp.')
    newline()
    toolbox.docs.printGeneratorUsage('component', [
      ['--styles', 'Creates a component stylesheet (Default: false)'],
    ])
  },
  files: [
    {
      template: 'generators/component/component.js.ejs',
      target: '${component.dir}${structureDir}${name.pascal}.js',
      condition: (toolbox, contextData) => !contextData.typescript
    },

    {
      template: 'generators/component/index.js.ejs',
      target: '${component.dir}${structureDir}index.js',
      condition: (toolbox, contextData) => !contextData.typescript && contextData.isDirectoryStructure
    },

    {
      template: 'generators/component/component.tsx.ejs',
      target: '${component.dir}${structureDir}${name.pascal}.tsx',
      condition: (toolbox, contextData) => contextData.typescript
    },

    {
      template: 'generators/component/index.tsx.ejs',
      target: '${component.dir}${structureDir}index.tsx',
      condition: (toolbox, contextData) => contextData.typescript && contextData.isDirectoryStructure
    },

    {
      template: 'generators/component/component.scss.ejs',
      target: '${component.dir}${structureDir}${name.pascal}.scss',
      condition: (toolbox, contextData) => contextData.styles
    },
  ],
  context: (context, toolbox) => {
    const conf = toolbox.config.get({
      typescript: false,
      component: {
        structure: ComponentStructureType.DIRECTORY,
        dir: '',
      },
      styles: false,
    })

    context.component = {
      dir: conf.component.dir ? conf.component.dir + '/' : '',
      structure: conf.component.structure,
    }
    context.isDirectoryStructure = conf.component.structure === ComponentStructureType.DIRECTORY
    // context.isFlatStructure = conf.component.structure === ComponentStructureType.FLAT
    context.structureDir = context.isDirectoryStructure ? context.name.pascal + '/' : ''
    context.typescript = conf.typescript
    context.styles = conf.styles

    return context
  },
}
