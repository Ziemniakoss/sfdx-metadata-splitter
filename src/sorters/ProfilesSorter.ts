import MetadataSorter from "./MetadataSorter";
import Profile from "../metadataTypes/Profile";
import ProfileApplicationVisibility from "../metadataTypes/ProfileApplicationVisibility";
import { sortObjectPropertiesAlphabetically } from "../utils/objectSorters";
import { compare, compareByField } from "../utils/comparators";
import ProfileCategoryGroupVisibility from "../metadataTypes/ProfileCategoryGroupVisibility";
import ProfileApexClassAccess from "../metadataTypes/ProfileApexClassAccess";
import ProfileCustomMetadataTypeAccess from "../metadataTypes/ProfileCustomMetadataTypeAccess";
import ProfileCustomPermissions from "../metadataTypes/ProfileCustomPermissions";
import ProfileExternalDataSourceAccess from "../metadataTypes/ProfileExternalDataSourceAccess";
import ProfileFieldLevelSecurity from "../metadataTypes/ProfileFieldLevelSecurity";
import ProfileFlowAccess from "../metadataTypes/ProfileFlowAccess";
import ProfileLayoutAssignments from "../metadataTypes/ProfileLayoutAssignments";
import LoginFlow from "../metadataTypes/LoginFlow";
import ProfileLoginHours from "../metadataTypes/ProfileLoginHours";
import ProfileLoginIpRange from "../metadataTypes/ProfileLoginIpRange";
import ProfileObjectPermissions from "../metadataTypes/ProfileObjectPermissions";
import ProfileApexPageAccess from "../metadataTypes/ProfileApexPageAccess";
import ProfileActionOverride from "../metadataTypes/ProfileActionOverride";
import ProfileRecordTypeVisibility from "../metadataTypes/ProfileRecordTypeVisibility";
import ProfileTabVisibility from "../metadataTypes/ProfileTabVisibility";
import ProfileUserPermission from "../metadataTypes/ProfileUserPermission";

export default class ProfilesSorter implements MetadataSorter<Profile> {
	sortMetadata(profile: Profile | null): Profile {
		if(profile == null) {
			return profile
		}
		if(profile.applicationVisibilities != null) {
			profile.applicationVisibilities = this.sortApplicationVisibilities(profile.applicationVisibilities)
		}
		if(profile.categoryGroupVisibilities != null) {
			profile.categoryGroupVisibilities = this.sortCategoryGroupVisibilities(profile.categoryGroupVisibilities)
		}
		if(profile.classAccesses != null) {
			profile.classAccesses = this.sortClassAccesses(profile.classAccesses)
		}
		if(profile.customMetadataTypeAccesses != null) {
			profile.customMetadataTypeAccesses = this.sortCustomMetadataTypeAccesses(profile.customMetadataTypeAccesses)
		}
		if(profile.customPermissions != null) {
			profile.customPermissions = this.sortCustomPermissions(profile.customPermissions)
		}
		if(profile.externalDataSourceAccesses != null) {
			profile.externalDataSourceAccesses = this.sortExternalDataSourceAccesses(profile.externalDataSourceAccesses)
		}
		if(profile.fieldLevelSecurities != null) {
			profile.fieldLevelSecurities = this.sortFieldLevelSecurities(profile.fieldLevelSecurities)
		}
		if(profile.fieldPermissions != null) {
			profile.fieldPermissions = this.sortFieldPermissions(profile.fieldPermissions)
		}
		if(profile.flowAccesses != null) {
			profile.flowAccesses = this.sortFlowAccesses(profile.flowAccesses)
		}
		if(profile.layoutAssignments != null) {
			profile.layoutAssignments = this.sortLayoutAssignments(profile.layoutAssignments)
		}
		if(profile.loginFlows != null) {
			profile.loginFlows= this.sortLoginFlows(profile.loginFlows)
		}
		if(profile.loginHours !=null) {
			profile.loginHours = this.sortLoginHours(profile.loginHours)
		}
		if(profile.loginIpRanges != null) {
			profile.loginIpRanges = this.sortLoginIpRanges(profile.loginIpRanges)
		}
		if(profile.objectPermissions != null) {
			profile.objectPermissions = this.sortObjectPermissions(profile.objectPermissions)
		}
		if(profile.pageAccesses != null) {
			profile.pageAccesses = this.sortPageAccesses(profile.pageAccesses)
		}
		if(profile.profileActionOverrides != null) {
			profile.profileActionOverrides = this.sortProfileActionOverrides(profile.profileActionOverrides)
		}
		if(profile.recordTypeVisibilities != null) {
			profile.recordTypeVisibilities = this.sortRecordTypeVisibilities(profile.recordTypeVisibilities)
		}
		if(profile.tabVisibilities != null) {
			profile.tabVisibilities = this.sortTabVisibilities(profile.tabVisibilities)
		}
		if(profile.userPermissions != null) {
			profile.userPermissions = this.sortUserPermissions(profile.userPermissions)
		}
		return sortObjectPropertiesAlphabetically(profile)
	}

	private sortApplicationVisibilities(applicationVisibilities: ProfileApplicationVisibility[]): ProfileApplicationVisibility[] {
		return applicationVisibilities
			.map(a => sortObjectPropertiesAlphabetically(a))
			.sort((a, b) => compareByField(a, b, "application"))
	}

	private sortCategoryGroupVisibilities(categoryGroupVisibilities:ProfileCategoryGroupVisibility[]):ProfileCategoryGroupVisibility[] {
		return categoryGroupVisibilities
			.map(category => sortObjectPropertiesAlphabetically(category))
	}

	private sortClassAccesses(classesAccesses:ProfileApexClassAccess[]):ProfileApexClassAccess[] {
		return classesAccesses
			.map(classAccess => sortObjectPropertiesAlphabetically(classAccess))
			.sort((a, b) => compareByField(a, b, "apexClass"))

	}

	private sortCustomMetadataTypeAccesses(customMetadataTypeAccesses:ProfileCustomMetadataTypeAccess[]) :ProfileCustomMetadataTypeAccess[] {
		return customMetadataTypeAccesses
			.map(customMetadataTypeAccess => sortObjectPropertiesAlphabetically(customMetadataTypeAccess))
			.sort((a, b) => compareByField(a, b, "name"))
	}

	private sortCustomPermissions(customPermissions:ProfileCustomPermissions[]) :ProfileCustomPermissions[] {
		return customPermissions
			.map(customPermission => sortObjectPropertiesAlphabetically(customPermission))
			.sort((a, b) => compareByField<ProfileCustomPermissions>(a,b,"name"))
	}

	private sortExternalDataSourceAccesses(externalDataSourceAccesses:ProfileExternalDataSourceAccess[]):ProfileExternalDataSourceAccess[] {
		return externalDataSourceAccesses
			.map(a => sortObjectPropertiesAlphabetically(a))
			.sort((a,b) => compareByField(a,b,"externalDataSource"))
	}

	private sortFieldLevelSecurities(fieldLevelSecurities:ProfileFieldLevelSecurity[]):ProfileFieldLevelSecurity[] {
		return fieldLevelSecurities
			.map(fieldLevelSecurity => sortObjectPropertiesAlphabetically(fieldLevelSecurity))
			.sort((a,b) => compareByField(a,b,"field"))
	}

	private sortFieldPermissions(fieldPermissions:ProfileFieldLevelSecurity[]) :ProfileFieldLevelSecurity[] {
		return fieldPermissions
			.map(fieldPermission => sortObjectPropertiesAlphabetically(fieldPermission))
			.sort((a,b) => compareByField(a,b, "field"))
	}

	private sortFlowAccesses(flowAccesses:ProfileFlowAccess[]) :ProfileFlowAccess[] {
		return  flowAccesses
			.map(flowAccess => sortObjectPropertiesAlphabetically(flowAccess))
			.sort((a,b) => compareByField(a,b,"flow"))
	}

	private sortLayoutAssignments(layoutAssignments:ProfileLayoutAssignments[]):ProfileLayoutAssignments[] {
		return layoutAssignments
			.map(layoutAssigment => sortObjectPropertiesAlphabetically(layoutAssigment))
			.sort((a,b) => {
				const firstSObject = a.layout[0].split("-",2)[0]
				const secondSObject = b.layout[0].split("-",2)[0]
				const sObjectComparationResult  = compare(firstSObject, secondSObject)
				if(sObjectComparationResult == 0) {
					return compare(
						a.recordType.length ? a.recordType[0] : null,
						b.recordType.length ? b.recordType[0]:null
					)
				}
				return 0
			})
	}

	private sortLoginFlows(loginFlows:LoginFlow[]):LoginFlow[]  {
		return loginFlows
	}

	private sortLoginHours(loginHours:ProfileLoginHours[]) :ProfileLoginHours[] {
		return loginHours;
	}

	private sortLoginIpRanges(loginIpRanges:ProfileLoginIpRange[]) :ProfileLoginIpRange[] {
		return loginIpRanges;
	}

	private sortObjectPermissions(objectPermissions:ProfileObjectPermissions[]) :ProfileObjectPermissions[] {
		return objectPermissions
			.map(objectPermission => sortObjectPropertiesAlphabetically(objectPermission))
			.sort((a,b) => compareByField(a,b,"object"))
	}

	private sortPageAccesses(pageAccesses:ProfileApexPageAccess[]):ProfileApexPageAccess[] {
		return pageAccesses
			.map(pageAccesses => sortObjectPropertiesAlphabetically(pageAccesses))
			.sort((a,b) => compareByField(a,b,"apexPage"))
	}

	private sortProfileActionOverrides(profileActionOverrides:ProfileActionOverride[]):ProfileActionOverride[] {
		return profileActionOverrides
			.map(profileActionOverride => sortObjectPropertiesAlphabetically(profileActionOverride))
	}

	private sortRecordTypeVisibilities(recordTypeVisibilities:ProfileRecordTypeVisibility[]) :ProfileRecordTypeVisibility[] {
		return  recordTypeVisibilities
			.map(recordTypeVisibility => sortObjectPropertiesAlphabetically(recordTypeVisibility))
			.sort((a,b) => compareByField(a,b,"recordType"))
	}

	private sortTabVisibilities(tabVisibilities:ProfileTabVisibility[]) :ProfileTabVisibility[] {
		return tabVisibilities
			.map(tabVisibility => sortObjectPropertiesAlphabetically(tabVisibility))
			.sort((a,b) => compareByField(a,b,"tab"))
	}

	private sortUserPermissions(userPermissions:ProfileUserPermission[]) :ProfileUserPermission[] {
		return userPermissions
			.map(userPermission => sortObjectPropertiesAlphabetically(userPermission))
			.sort((a,b) => compareByField(a,b,"name"))
	}
}
