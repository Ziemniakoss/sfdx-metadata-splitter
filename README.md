# Split metadata files into separate files

[![npm version](https://img.shields.io/npm/v/sfdx-metadata-splitter)](https://www.npmjs.com/package/sfdx-metadata-splitter)
[![labels sre supporters](https://img.shields.io/badge/labels-supported-green)](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_customlabels.htm#!)
[![profiles are supported](https://img.shields.io/badge/profiles-supported-green)](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_profile.htm)
[![translations are supported](https://img.shields.io/badge/translations-supported-green)](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_translations.htm)
[![permission sets support is in progress](https://img.shields.io/badge/permission%20sets-in%20progress-blue)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

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
sfdx splitter:labels:split -r
```

To merge them back and remove source files, use:

```
sfdx metadata:labels:merge -r
```

### Translations support

Translations have to be merged before converting metadata or deployment.

To split all translations and remove source file

```
sfdx splitter:translations:split -r
```

To merge them back and remvoe splitted files, use:

```
sfdx splitter:translations:merge -r
```

### Profiles support

Profiles have to be merged before converting metadata or deployment.

To split profiles, use

```
sfdx splitter:profiles:split
```

You can add flag -r to remove divided file.

To merge profile back, use

```
sfdx splitter:profiles:merge
```

with optional -r flag.

#### Warning!!

Tags:

- loginFlows
- loginIpRanges
- profileActionOverrides

are not fully divided in this version of plugin (all elements with this tags will be grouped in files with tag in its name) as I don't know how to efficiently divide them.
If you have an idea, please submit pull request or issue.

#### Partial profile

There is option to create partial profile from splitted files using simmilar syntax to the one used by
```sh
sfdx force:source:deploy
```
command for "m" flag.
To create such file, use command
```shell
sfdx splitter:profile:partial-merge
```
