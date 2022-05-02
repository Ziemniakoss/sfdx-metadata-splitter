import { basename, dirname, join } from "path";
import Merger from "./Merger";
import {
	PROFILES_EXTENSION,
	PROFILES_ROOT_TAG,
	SPLITTED_PROFILES_EXTENSION,
} from "../constants";

export default class ProfilesMerger extends Merger {
	getRootTag(): string {
		return PROFILES_ROOT_TAG;
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
