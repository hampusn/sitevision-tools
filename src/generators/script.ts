import { SimpleGenerator } from '../types'

export default <SimpleGenerator>{
  files: [
    {
      template: 'generators/script/server.js.ejs',
      target: '${name.hyphend}/${name.hyphend}-server.js',
    },
    {
      template: 'generators/script/template.vm.ejs',
      target: '${name.hyphend}/${name.hyphend}.vm',
    },
    {
      template: 'generators/script/client.js.ejs',
      target: '${name.hyphend}/${name.hyphend}-client.js',
      condition: (toolbox) => toolbox.parameters.options.js,
    },
    {
      template: 'generators/script/styles.css.ejs',
      target: '${name.hyphend}/${name.hyphend}.css',
      condition: (toolbox) => toolbox.parameters.options.styles,
    },
  ],
  context: (context, toolbox) => {
    // ...context, styles: toolbox.parameters.options.styles
    
    // context.styles = toolbox.parameters.options.styles
    // context.js = toolbox.parameters.options.js
    context.author = false
    context.vars = false
    context.cssClass = context.name.hyphend

    // vars: vars !== 'false' ? vars.split(',').map(v => camelCase(v || '')).filter(v => !!v) : false,
    
    return context
  },
  description: 'Generate files for a script module.',
  help: 'You can use this however you want.',
}

/*

writing () {
    const { name, vars } = this.options;
    const { author, sm } = this.conf;
    const camelName = camelCase(name);
    const hyphendName = decamelize(camelName, { separator: '-' });
    const context = {
      name,
      camelName,
      hyphendName,
      cssClass: `${sm.cssPrefix}${hyphendName}`,
      author,
    };

    const dirParts = [
      sm.dir,
      hyphendName,
    ];

    this.fs.copyTpl(this.templatePath('server.js.ejs'), this.destinationPath(...dirParts, `${hyphendName}.js`), {
      ...context,
      vars: vars !== 'false' ? vars.split(',').map(v => camelCase(v || '')).filter(v => !!v) : false,
    });

    this.fs.copyTpl(this.templatePath('template.vm.ejs'), this.destinationPath(...dirParts, `${hyphendName}.vm`), context);

    if (this.options.styles) {
      this.fs.copyTpl(this.templatePath('styles.css.ejs'), this.destinationPath(...dirParts, `${hyphendName}.css`), context);
    }

    if (this.options.js) {
      this.fs.copyTpl(this.templatePath('client.js.ejs'), this.destinationPath(...dirParts, `${hyphendName}-client.js`), context);
    }
  }

  */
