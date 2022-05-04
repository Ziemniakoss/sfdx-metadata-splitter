import { basename, dirname, join } from "path";
import Merger from "./Merger";
import {
	PROFILES_EXTENSION,
	PROFILES_ROOT_TAG,
	SPLITTED_PROFILES_EXTENSION,
} from "../constants";
import Profile from "../metadataTypes/Profile";

export default class ProfilesMerger extends Merger<Profile> {
	getRootTag = () => PROFILES_ROOT_TAG;

	getSplittedExtension = () => SPLITTED_PROFILES_EXTENSION;

	getOutputFile(inputDir: string): string {
		const dir = dirname(inputDir);
		const profileName = basename(inputDir);
		return join(dir, `${profileName}${PROFILES_EXTENSION}`);
	}

	protected sortElements(xml) {
		const profileProperties: Profile = xml[this.getRootTag()];
		return {
			...xml,
			[this.getRootTag()]: {
				...xml[this.getRootTag()],
				...this.metadataSorter.sortMetadata(profileProperties),
			},
		};
	}
}
