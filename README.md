# Split metadata files into separate files

Unofficial plugin for splitting metadata files into smaller ones.

## Supported metadata types

- Custom Labels
- Translations

## How to use

### Installation

```
sfdx plugins:install sfdx-metadata-splitter
```

### Formatting

You can change how output is formatted by using flags:
- indent-size
- indent-style
- new-line-char
- skip-final-new-line

By default, this plugin uses 4 spaces as indent and \n as new line character.

### Custom Labels support

You don't have to merge labels before deployment or converting metadata.

To split labels into multiple files and remove source file, use

```
sfdx metadata:labels:split -r
```

To merge them back and remove source files, use:

```
sfdx metadata:labels:merge -r
```

### Translations support

Translations have to be merged before converting metadata or deployment.

To split all translations and remove source file
```
sfdx metadata:translations:split -r
```

To merge them back and remvoe splitted files, use:
```
sfdx metadata:translations:merge -r
```
