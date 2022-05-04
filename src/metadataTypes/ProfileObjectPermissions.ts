export default interface ProfileObjectPermissions {
	allowCreate?: boolean[];
	allowDelete?: boolean[];
	allowEdit?: boolean[];
	allowRead?: boolean[];
	modifyAllRecords?: boolean[];
	object?: string[];
	viewAllRecords?: boolean[];
}
