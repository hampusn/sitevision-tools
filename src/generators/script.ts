import { GeneratorUsageHelp, SimpleGenerator } from '../types'

export default <SimpleGenerator>{
  description: 'Generate files for a script module.',
  help: <GeneratorUsageHelp>{
    description: 'Creates a script (js) and template (velocity) file for a script module in your project.',
    args: [
      [ 'name', 'The name of the script module. Will be hyphenated for filename and css class.' ],
    ],
    options: [
      ['styles', 'Include a stylesheet (css) (Default: false)'],
      ['js', 'Include a client script (js) (Default: false)'],
      ['vars', 'A comma separated list with variable names to create a settings object with in the server script (Default: "")'],
    ],
  },
  files: [
    {
      template: 'generators/script/server.js.ejs',
      target: '${script.dir}${name.hyphend}/${name.hyphend}-server.js',
    },
    {
      template: 'generators/script/template.vm.ejs',
      target: '${script.dir}${name.hyphend}/${name.hyphend}.vm',
    },
    {
      template: 'generators/script/client.js.ejs',
      target: '${script.dir}${name.hyphend}/${name.hyphend}-client.js',
      condition: (toolbox, contextData) => contextData.js,
    },
    {
      template: 'generators/script/styles.css.ejs',
      target: '${script.dir}${name.hyphend}/${name.hyphend}.css',
      condition: (toolbox, contextData) => contextData.styles,
    },
  ],
  context: (context, toolbox) => {
    const conf = toolbox.config.get({
      script: {
        cssPrefix: '',
        dir: '',
      },
      author: {
        name: '',
        email: '',
      },
      styles: false,
      js: false,
      vars: '',
    })

    context.script = {
      ...conf.script,
      dir: conf.script.dir ? conf.script.dir + '/' : '',
    }
    context.author = conf.author?.name || conf.author?.email ? conf.author : false
    context.vars = conf.vars !== 'false' ? conf.vars.split(',').map(v => toolbox.strings.camelCase(v || '')).filter(v => !!v) : false
    context.cssClass = context.name.hyphend
    context.styles = conf.styles
    context.js = conf.js
    
    return context
  },
}
