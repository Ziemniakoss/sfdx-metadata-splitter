import { basename, dirname, join } from "path";
import Merger from "./Merger";
import { METADATA_EXTENSIONS, ROOT_TAGS, SPLIT_EXTENSIONS } from "../constants";

export default class ProfilesMerger extends Merger {
	getRootTag(): string {
		return ROOT_TAGS.PROFILES;
	}

	getSplittedExtension(): string {
		return SPLIT_EXTENSIONS.PROFILES;
	}

	getOutputFile(inputDir: string): string {
		const dir = dirname(inputDir);
		const profileName = basename(inputDir);
		return join(dir, `${profileName}${METADATA_EXTENSIONS.PROFILES}`);
	}
}
