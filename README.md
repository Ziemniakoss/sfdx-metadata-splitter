# Split metadata files into separate files

Unofficial plugin for splitting metadata files into smaller ones.

## Supported metadata types

- Custom Labels

## How to use

### Installation

```
sfdx plugins:install sfdx-metadata-splitter
```

### Split and merge labels

To split labels into multiple files and remove source file, use

```
sfdx metadata:labels:split -r
```

To merge them back and remove source files, use:

```
sfdx metadata:labels:merge -r
```
