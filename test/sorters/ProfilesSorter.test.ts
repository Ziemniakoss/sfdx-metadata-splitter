import Profile from "../../src/metadataTypes/Profile";
import ProfilesSorter from "../../src/sorters/ProfilesSorter";
import * as assert from "assert";
import { equal } from "assert";
import ProfileFieldLevelSecurity from "../../src/metadataTypes/ProfileFieldLevelSecurity";
import ProfileApplicationVisibility from "../../src/metadataTypes/ProfileApplicationVisibility";

describe("sorters/ProfilesSorter", () => {
	describe("applicationVisibilities", testApplicationVisibilities);
	describe("categoryGroupVisibilities", () => {});
	describe("classAccesses", testClassAccesses);
	describe("customMetadataTypeAccesses", () => {});
	describe("customPermissions", () => {});
	describe("customSettingAccesses", () => {});
	describe("externalDataSourceAccesses", () => {});
	describe("fieldLevelSecurities", testFieldLevelSecurities);
	describe("fieldPermissions", testFieldPermissions);
	describe("flowAccesses", () => {});
	describe("layoutAssignments", () => {}); //TODO
	describe("loginFlows", () => {});
	describe("loginHours", () => {});
	describe("loginIpRanges", () => {});
	describe("objectPermissions", testObjectPermissions);
	describe("pageAccesses", testPageAccesses);
	describe("profileActionOverrides", () => {});
	describe("recordTypeVisibilities", () => {});
	describe("tabVisibilities", testTabVisibilities);
	describe("userPermissions", testUserPermissions);
});

function testFieldLevelSecurities() {
	const profileWithFieldLevelSecurities: Profile = {
		fieldLevelSecurities: [
			{
				field: ["Account.Name"],
			},
			{
				readable: [false],
				field: ["Account.AccId__c"],
				editable: [true],
				hidden: [true],
			},
		],
	};

	const result = new ProfilesSorter().sortMetadata(
		JSON.parse(JSON.stringify(profileWithFieldLevelSecurities))
	);
	it("should be sorted", () => {
		const fieldLevelSecurities = result.fieldLevelSecurities;
		equal(fieldLevelSecurities[0].field[0], "Account.AccId__c");
		equal(fieldLevelSecurities[1].field[0], "Account.Name");
	});
	it("should sort properties", () => {
		const actualOrder = Object.keys(result.fieldLevelSecurities[0]);
		const expectedOrder: (keyof ProfileFieldLevelSecurity)[] = [
			"editable",
			"field",
			"hidden",
			"readable",
		];
		assert.deepStrictEqual(actualOrder, expectedOrder);
	});
}

function testApplicationVisibilities() {
	const profileWithApplicationVisibilities: Profile = {
		applicationVisibilities: [
			{
				application: ["Application 2"],
			},
			{
				application: ["Application 1"],
			},
			{
				visible: [true],
				default: [false],
				application: ["Application 3"],
			},
		],
	};
	const result = new ProfilesSorter().sortMetadata(
		JSON.parse(JSON.stringify(profileWithApplicationVisibilities))
	);
	it("should be sorted", () => {
		const applicationVisibilities = result.applicationVisibilities;
		equal(applicationVisibilities[0].application[0], "Application 1");
		equal(applicationVisibilities[1].application[0], "Application 2");
		equal(applicationVisibilities[2].application[0], "Application 3");
	});
	it("should sort properties 2", () => {
		const actualOrder = Object.keys(result.applicationVisibilities[2]);
		const expectedOrder: (keyof ProfileApplicationVisibility)[] = [
			"application",
			"default",
			"visible",
		];
		assert.deepStrictEqual(actualOrder, expectedOrder);
	});
}

function testUserPermissions() {
	const profileWithUserPermissions: Profile = {
		userPermissions: [
			{
				name: ["Permission2"],
			},
			{
				name: ["Permission1"],
				enabled: [true],
			},
		],
	};
	const result = new ProfilesSorter().sortMetadata(
		JSON.parse(JSON.stringify(profileWithUserPermissions))
	);
	it("should be sorted", () => {
		equal(result.userPermissions[0].name[0], "Permission1");
		equal(result.userPermissions[1].name[0], "Permission2");
	});
}

function testPageAccesses() {
	const profileWithPageAccesses: Profile = {
		pageAccesses: [
			{
				apexPage: ["Page 2"],
			},
			{
				enabled: [true],
				apexPage: ["Page 1"],
			},
		],
	};
	const result = new ProfilesSorter().sortMetadata(
		JSON.parse(JSON.stringify(profileWithPageAccesses))
	);
	it("should sort accesses", () => {
		assert.equal(result.pageAccesses[0].apexPage[0], "Page 1");
		assert.equal(result.pageAccesses[1].apexPage[0], "Page 2");
	});
	it("should sort properties 2", () => {
		const actualOrder = Object.keys(result.pageAccesses[0]);
		assert.deepStrictEqual(actualOrder, ["apexPage", "enabled"]);
	});
}

function testFieldPermissions() {
	const profileWithFieldPermissions: Profile = {
		fieldPermissions: [
			{
				field: ["Account.AccId"],
			},
			{
				field: ["Task.Name"],
			},
			{
				field: ["Account.Name"],
				editable: [true],
				hidden: [false],
				readable: [true],
			},
		],
	};
	const result = new ProfilesSorter().sortMetadata(
		JSON.parse(JSON.stringify(profileWithFieldPermissions))
	);
	it("should sort by field name", () => {
		const sortedFieldPermissions = result.fieldPermissions;
		equal(sortedFieldPermissions[0].field[0], "Account.AccId");
		equal(sortedFieldPermissions[1].field[0], "Account.Name");
		equal(sortedFieldPermissions[2].field[0], "Task.Name");
	});
	it("should sort properties 2", () => {
		const expectedOrder: (keyof ProfileFieldLevelSecurity)[] = [
			"editable",
			"field",
			"hidden",
			"readable",
		];
		const actualOrder = Object.keys(result.fieldPermissions[1]);
		assert.deepStrictEqual(actualOrder, expectedOrder);
	});
}

function testObjectPermissions() {
	const profileWithObjectPermissions: Profile = {
		objectPermissions: [
			{
				object: ["Contact"],
			},
			{
				object: ["Account"],
				allowEdit: [true],
				allowCreate: [false],
				allowDelete: [false],
				allowRead: [true],
				viewAllRecords: [true],
				modifyAllRecords: [false],
			},
		],
	};
	const result = new ProfilesSorter().sortMetadata(
		JSON.parse(JSON.stringify(profileWithObjectPermissions))
	);
	it("should be sorted", () => {
		const objectPermissions = result.objectPermissions;
		equal(objectPermissions[0].object, "Account");
		equal(objectPermissions[1].object, "Contact");
	});
	it("should sort properties", () => {
		const keys = Object.keys(result.objectPermissions[0]);
		const expectedOrder = [
			"allowCreate",
			"allowDelete",
			"allowEdit",
			"allowRead",
			"modifyAllRecords",
			"object",
			"viewAllRecords",
		];
		assert.deepStrictEqual(keys, expectedOrder);
	});
}

function testClassAccesses() {
	const profileWithClassesAccesses: Profile = {
		classAccesses: [
			{
				apexClass: ["ApexClass"],
			},
			{
				apexClass: ["TestClass"],
				enabled: [true],
			},
			{
				enabled: [false],
				apexClass: ["CacheTest"],
			},
		],
	};
	const result = new ProfilesSorter().sortMetadata(
		JSON.parse(JSON.stringify(profileWithClassesAccesses))
	);
	it("should be sorted", () => {
		const classesAccesses = result.classAccesses;
		equal(classesAccesses[0].apexClass[0], "ApexClass");
		equal(classesAccesses[1].apexClass[0], "CacheTest");
		equal(classesAccesses[2].apexClass[0], "TestClass");
	});
}

function testTabVisibilities() {
	const profileWithTabVisibilities: Profile = {
		tabVisibilities: [
			{
				tab: ["tab c"],
			},
			{
				tab: ["tab a"],
				visibility: ["DefaultOff"],
			},
			{
				visibility: ["DefaultOn"],
				tab: ["tab B"],
			},
		],
	};
	const result = new ProfilesSorter().sortMetadata(
		JSON.parse(JSON.stringify(profileWithTabVisibilities))
	);
	it("should be sorted", () => {
		const tabVisibilities = result.tabVisibilities;
		equal(tabVisibilities[0].tab[0], "tab a");
		equal(tabVisibilities[1].tab[0], "tab B");
		equal(tabVisibilities[2].tab[0], "tab c");
	});
	it("should have equal content", () => {
		const expectedTabVisibilities = profileWithTabVisibilities.tabVisibilities;
		const actualTabVisibilities = result.tabVisibilities;
		assert.deepStrictEqual(
			actualTabVisibilities[0],
			expectedTabVisibilities[1]
		);
		assert.deepStrictEqual(
			actualTabVisibilities[1],
			expectedTabVisibilities[2]
		);
		assert.deepStrictEqual(
			actualTabVisibilities[2],
			expectedTabVisibilities[0]
		);
	});
	it("properties should be shorted 2", () => {
		equal("tab", Object.keys(result.tabVisibilities[1])[0]);
	});
}
