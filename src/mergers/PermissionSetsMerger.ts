import Merger from "./Merger";
import { METADATA_EXTENSIONS, ROOT_TAGS, SPLIT_EXTENSIONS } from "../constants";

export default class PermissionSetsMerger extends Merger {
	getOutputFile(inputDir: string): string {
		return `${inputDir}${METADATA_EXTENSIONS.PERMISSION_SETS}`;
	}

	getRootTag(): string {
		return ROOT_TAGS.PERMISSION_SETS;
	}

	getSplittedExtension(): string {
		return SPLIT_EXTENSIONS.PERMISSION_SETS;
	}
}
