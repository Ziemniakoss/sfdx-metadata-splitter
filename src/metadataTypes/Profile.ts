import LoginFlow from "./LoginFlow";
import ProfileActionOverride from "./ProfileActionOverride";
import ProfileApexClassAccess from "./ProfileApexClassAccess";
import ProfileApexPageAccess from "./ProfileApexPageAccess";
import ProfileApplicationVisibility from "./ProfileApplicationVisibility";
import ProfileCategoryGroupVisibility from "./ProfileCategoryGroupVisibility";
import ProfileCustomMetadataTypeAccess from "./ProfileCustomMetadataTypeAccess";
import ProfileCustomPermissions from "./ProfileCustomPermissions";
import ProfileCustomSettingAccesses from "./ProfileCustomSettingAccesses";
import ProfileExternalDataSourceAccess from "./ProfileExternalDataSourceAccess";
import ProfileFieldLevelSecurity from "./ProfileFieldLevelSecurity";
import ProfileFlowAccess from "./ProfileFlowAccess";
import ProfileLayoutAssignments from "./ProfileLayoutAssignments";
import ProfileLoginHours from "./ProfileLoginHours";
import ProfileLoginIpRange from "./ProfileLoginIpRange";
import ProfileObjectPermissions from "./ProfileObjectPermissions";
import ProfileRecordTypeVisibility from "./ProfileRecordTypeVisibility";
import ProfileTabVisibility from "./ProfileTabVisibility";
import ProfileUserPermission from "./ProfileUserPermission";

export default interface Profile {
	applicationVisibilities?: ProfileApplicationVisibility[];
	categoryGroupVisibilities?: ProfileCategoryGroupVisibility[];
	classAccesses?: ProfileApexClassAccess[];
	custom?: boolean[];
	customMetadataTypeAccesses?: ProfileCustomMetadataTypeAccess[];
	customPermissions?: ProfileCustomPermissions[];
	customSettingAccesses?: ProfileCustomSettingAccesses[];
	description?: string;
	externalDataSourceAccesses?: ProfileExternalDataSourceAccess[];
	fieldLevelSecurities?: ProfileFieldLevelSecurity[];
	fieldPermissions?: ProfileFieldLevelSecurity[];
	flowAccesses?: ProfileFlowAccess[];
	fullName?: string[];
	layoutAssignments?: ProfileLayoutAssignments[];
	loginFlows?: LoginFlow[];
	loginHours?: ProfileLoginHours[];
	loginIpRanges?: ProfileLoginIpRange[];
	objectPermissions?: ProfileObjectPermissions[];
	pageAccesses?: ProfileApexPageAccess[];
	profileActionOverrides?: ProfileActionOverride[];
	recordTypeVisibilities?: ProfileRecordTypeVisibility[];
	tabVisibilities?: ProfileTabVisibility[];
	userLicense?: string[];
	userPermissions?: ProfileUserPermission[];
}