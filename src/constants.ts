export const XML_NAMESPACE = "http://soap.sforce.com/2006/04/metadata";

export const ROOT_TAGS = {
	TRANSLATIONS: "Translations",
	PROFILES: "Profile",
	LABELS: "CustomLabels",
	PERMISSION_SETS: "PermissionSet",
} as const;

/**
 * Extensions of split metadata files
 */
export const SPLIT_EXTENSIONS = {
	TRANSLATIONS: ".translation-part.xml",
	PROFILES: ".profile-part.xml",
	PERMISSION_SETS: ".permissionset-part.xml",
} as const;

/**
 * Extensions of standard metadata files
 */
export const METADATA_EXTENSIONS = {
	TRANSLATIONS: ".translation-meta.xml",
	PROFILES: ".profile-meta.xml",
	LABELS: ".labels-meta.xml",
	PERMISSION_SETS: ".permissionset-meta.xml",
} as const;

export const PLUGIN_NAME = "sfdx-metadata-splitter";
