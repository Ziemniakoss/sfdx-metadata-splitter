import MetadataSorter from "./MetadataSorter";
import CustomLabels from "../metadataTypes/CustomLabels";
import { sortObjectPropertiesAlphabetically } from "../utils/objectSorters";
import { compareByField } from "../utils/comparators";

export default class CustomLabelsSorter
	implements MetadataSorter<CustomLabels>
{
	sortMetadata(customLabels: CustomLabels): CustomLabels {
		const labels = customLabels?.labels
			?.map((label) => sortObjectPropertiesAlphabetically(label))
			.sort((label1, label2) => compareByField(label1, label2, "fullName"));
		if (labels == null) {
			return customLabels;
		}
		customLabels.labels = labels;
		return customLabels;
	}
}
