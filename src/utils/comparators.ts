/**
 * Compares two objects by field value.
 * Specified field should be string, but array is also accepted.
 * When specified field is array, first value in array will be used to define which value is greater
 *
 * @param a first object to compare
 * @param b second object to compare
 * @param fieldName name of field that will be used for comparison.
 * Field should be string or array of strings
 * @param caseInsensitive should comparison be insensitive
 * @param asc should values be sorted in ascending order
 */
export function compareByField(
	a,
	b,
	fieldName: string,
	caseInsensitive = true,
	asc = true
): number {
	let valueInA = a[fieldName];
	let valueInB = b[fieldName];
	if (Array.isArray(valueInA)) {
		valueInA = valueInA[0];
	}
	if (Array.isArray(valueInB)) {
		valueInB = valueInB[0];
	}
	return compare(valueInA, valueInB, caseInsensitive, asc);
}

export function compare(
	a: string,
	b: string,
	caseInsensitive = true,
	asc = true
): number {
	const orderModifier = asc ? 1 : -1;
	if (caseInsensitive) {
		a = a?.toLowerCase();
		b = b?.toLowerCase();
	}
	if (a == b) {
		return 0;
	}
	let comparationResult;
	if (a > b) {
		comparationResult = 1;
	} else {
		comparationResult = -1;
	}
	return comparationResult * orderModifier;
}
