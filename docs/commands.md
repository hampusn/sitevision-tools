# Command Reference for sitevision-tools

## sitevision-tools

`sitevision-tools`

Prints information about the version and available updates.

## init|i

```
sitevision-tools init
sitevision-tools i
```

Creates a new project configuration file (`.sitevision-toolsrc.json`) in the current working directory. Multiple calls will overwrite the current configuration file. This file will be used to determine the project root when using other commands such as `generate`.

## generate|g

```
sitevision-tools generate <generator> <name>
sitevision-tools g <generator> <name>
```

Quickly create project files for things like script modules or webapp components.

A list of available generators can be obtained by running `sitevision-tools generate --help`.
The `<name>` argument will be used for the file names and/or exports but does not need to be in a specific format. That is handled automatically.

To get more detailed information about a specific generator, run the generator with the help flag. For example: `sitevision-tools generate script --help`.

## config|c

```
sitevision-tools config
sitevision-tools c
```

Prints paths to the found and merged config files and also the resulting configuration.

## store|s

> TODO

```
sitevision-tools store
sitevision-tools s
```
 
Credentials store. Main command prints information about the store. See sub commands below for specific usage.

### store add-site|add

```
sitevision-tools store add-site --title
```

Store credentials for a site.

### store empty-trash|empty|et

Empty trash in store.

### store list-sites|list|ls

Lists all sites in store.

### store remove-site|remove|rm

Remove a site from store.

### store show-site|show

Show credentials for a stored site.

### store update-site (update, up)
Update stored data for a site.
