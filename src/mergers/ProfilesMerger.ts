import Merger from "./Merger";
import { PROFILES_EXTENSION, SPLITTED_PROFILES_EXTENSION } from "../constants";
import { basename, dirname, join } from "path";

export default class ProfilesMerger extends Merger {
	getRootTag(): string {
		return "Profile";
	}

	getSplittedExtension(): string {
		return SPLITTED_PROFILES_EXTENSION;
	}

	getOutputFile(inputDir: string): string {
		const dir = dirname(inputDir);
		const profileName = basename(inputDir);
		return join(dir, `${profileName}${PROFILES_EXTENSION}`);
	}
}
