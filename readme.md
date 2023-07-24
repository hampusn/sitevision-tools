# Sitevision Tools

A command line interface with various utilities for Sitevision development.

> Currently in development (v0.x.x) and might have breaking changes in minors until v1.

## Commands

See [Command Reference for sitevision-tools](docs/commands.md).

## Usage

### Example 1: Initialize and create a React component in a Sitevision webapp directory

Initialize sitevision-tools in a Sitevision webapp directory root and create a new react component with a stylesheet.

```sh
cd ~/projects/some-webapp
sitevision-tools init
sitevision-tools generate component "Product carousel" --styles
```

This will create the following files (depending on project configuration):
```
~/projects/some-webapp/src/components/ProductCarousel/ProductCarousel.js
~/projects/some-webapp/src/components/ProductCarousel/index.js
~/projects/some-webapp/src/components/ProductCarousel/ProductCarousel.scss
```

### Example 2: Initialize Sitevision Tools for a Sitevision website project and create files for a script module

Initialize sitevision-tools in a directory containing source files for a Sitevision website project, and creates a directory with files for a script module. 

```sh
cd ~/projects/a-sitevision-site
sitevision-tools init
sitevision-tools generate script "Social links menu" --styles --js --vars "menuRootMeta,iconFileMeta,iconIdMeta"
```

This will create the following files (depending on project configuration):

```
~/projects/a-sitevision-site/social-links-menu/social-links-menu-server.js
~/projects/a-sitevision-site/social-links-menu/social-links-menu.vm
~/projects/a-sitevision-site/social-links-menu/social-links-menu-client.js
~/projects/a-sitevision-site/social-links-menu/social-links-menu.css
```
And `social-links-menu-server.js` will also contain the following configuration object for the script variables:

```js
/**
 * Contains configuration settings.
 * @type {Object}
 */
const settings = {
  menuRootMeta: (scriptVariables.menuRootMeta != null) ? scriptVariables.menuRootMeta : null,
  iconFileMeta: (scriptVariables.iconFileMeta != null) ? scriptVariables.iconFileMeta : null,
  iconIdMeta: (scriptVariables.iconIdMeta != null) ? scriptVariables.iconIdMeta : null,
};
```

## Configuration

A configuration file is created with the command `sitevision-tools init` and is placed in the current working directory as `.sitevision-toolsrc.json`. Sitevision Tools uses [`cosmiconfig`](https://github.com/cosmiconfig/cosmiconfig) to find configuration files and the first found will determine the project root. Configurations found further up the structure will be merged in with the most specific values (configuration closest to project root) taking precedence. In this way, you can place generic configuration such as author name/email in your dev/projects folder and have more project specific configuration in your project root.

Please note that `cosmiconfig` does not load multiple configuration files from the same directory. So do make sure that only one configuration file exists in your directory.


### Custom generators

Custom generators can easily be added through configuration. Simply add a generator in your configuration under the key path `sitevision-tools.generators`. The key used will be the name of the generator.

In most cases, your custom generators will most likely only generate files based of templates. When that is the case, you can use the signature for a `SimpleGenerator` (see [src/types.ts](https://github.com/hampusn/sitevision-tools/blob/main/src/types.ts)).

When you need to do more than a `SimpleGenerator` allows, you will have to create a `GeneratorWrapper`. A `GeneratorWrapper` is a function which takes the `GluegunToolbox` as an argument and returns a `Generator`. A basic example of a `GeneratorWrapper` and a `SimpleGenerator` is provided below.

```js
// ~/.sitevision-toolsrc.js

module.exports = {
  'sitevision-tools': {
    generators: {
      custom: (toolbox) => ({
        async run () {
          toolbox.print.info('This is a custom generator.')
          // Logic here
        },
        description: 'A description for the custom generator which will be shown in the list of available generators.',
        help: (toolbox) => {
          toolbox.print.info('Some helpful information about this custom generator.')
        },
      }),
      simple: {
        files: [
          {
            template: 'component.js.ejs',
            target: 'component/${name.pascal}/${name.pascal}.js',
            condition: (toolbox) => toolbox.parameters.options.include,
          },
        ],
        context: (data, toolbox) => ({ ...data, customOption: toolbox.parameters.options.foo }),
        dir: '~/.sitevision-tools/templates/simple',
        description: 'A simple custom generator.',
        help: 'Some helpful information about this generator.',
      }
    },
  }
}
```

The examples above will be available with: 
```sh
sitevision-tools generate custom <name>
sitevision-tools generate simple <name> --include --foo
```
