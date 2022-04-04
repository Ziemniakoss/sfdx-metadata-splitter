# Split metadata files into separate files

Unofficial plugin for splitting metadata files into smaller ones.

## Supported metadata types

- Custom Labels
- Translations
- Profiles

## How to use

Each command will print help to console if you add

```
--help
```

flag to command invocation.

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

### Profiles support

Profiles have to be merged before converting metadata or deployment.

To split profiles, use

```
sfdx metadata:profiles:split
```

You can add flag -r to remove divided file.

To merge profile back, use

```
sfdx metadata:profiles:merge
```

with optional -r flag.

#### Warning!!

Tags:

- loginFlows
- loginIpRanges
- profileActionOverrides

are not fully divided in this version of plugin (all elements with this tags will be grouped in files with tag in its name) as I don't know how to efficiently divide them.
If you have an idea, please submit pull request or issue.
