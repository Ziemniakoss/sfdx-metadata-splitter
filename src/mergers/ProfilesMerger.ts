import Merger from "./Merger";
import { SPLITTED_PROFILES_EXTENSION } from "../constants";

export default class ProfilesMerger extends Merger {
	getRootTag(): string {
		return "Profile";
	}

	getSplittedExtension(): string {
		return SPLITTED_PROFILES_EXTENSION;
	}
}
