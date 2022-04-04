/**
 * Creates new object with properties added in alphabetical order.
 * Normally this doesn't change anything for program logic but xml serializer uses
 * properties creation order to determine order of properties in serialized xml.
 *
 * @param obj object to sort
 * @param asc should properties be sorted in ascending order
 * @returns copy with sorted properties or null if input was null
 */
import { compare } from "./comparators";

export function sortObjectPropertiesAlphabetically(obj?: any, asc = true): any {
	if (obj == null) {
		return null;
	}
	const properties = Object.keys(obj);
	properties.sort((a, b) => compare(a, b, true, asc));
	const sortedObject = {};
	for (const prop of properties) {
		sortedObject[prop] = obj[prop];
	}
	return sortedObject;
}
