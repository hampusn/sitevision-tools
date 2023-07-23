# Sitevision Tools

A command line interface with various utilities for Sitevision development.


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
