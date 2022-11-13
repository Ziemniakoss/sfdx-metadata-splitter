# Split metadata files into separate files

[![npm version](https://img.shields.io/npm/v/sfdx-metadata-splitter)](https://www.npmjs.com/package/sfdx-metadata-splitter)

Unofficial plugin for splitting metadata files into smaller ones with only one configuration (label, permission to entity and so on) per file.
Thanks to that:

- git conflicts in metadata files are almost non existent
- git diffs are clearer
- IDEs don't have to load 1gb file to display profile configuration

Example folder with configuration after splitting metadata files can be seen on picture bellow.

![Image showing folder structure after splitting metadata](./docs/images/exampleFolder.png)

## Supported metadata types

- [Custom Labels](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_customlabels.htm#!)
- [Profiles](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_profile.htm)
- [Translations](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_translations.htm)
- [Permission Sets](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_permissionset.htm)

### Custom Labels

After splitting, each label will be written to separate file, like this:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<CustomLabels xmlns="http://soap.sforce.com/2006/04/metadata">
	<labels>
		<fullName>autoGeneated</fullName>
		<language>en_US</language>
		<protected>false</protected>
		<shortDescription>Auto Quote</shortDescription>
		<value>This is a auto label.</value>
	</labels>
</CustomLabels>
```

Custom labels are the only metadata type supported by this plugin that can be deployed in split format.

### Other types

Translations, profiles and permission sets will be split into files with just one permission or translation.
Generated files will be grouped by xml tag name, for example all apex class accesses for given profile will be placed in "classAccesses" sub folder.

![image showing profile folder structure after splitting](./docs/images/splitProfile.png)

## How to use

All commands included in this plugin are in "splitter" namespace.
To see all commands available, type

```shell
sfdx splitter --help
```

Every command in this plugin has help page available by adding "--help" flag to command invocation.

### Installation

```shell
sfdx plugins:install sfdx-metadata-splitter
```

In automations systems, I highly recomend locking version of plugin by using

```shell
sfdx plugins:install sfdx-metadata-splitter@your.version.number
```

## Contributing

Contributions, both issues and pull requests, are welcome.
