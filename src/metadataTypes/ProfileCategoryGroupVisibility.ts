type Visibility = "All" | "CUSTOM" | "NONE";
export default interface ProfileCategoryGroupVisibility {
	dataCategories: string[];
	dataCategoryGroup: string[];
	visibility: Visibility[];
}
