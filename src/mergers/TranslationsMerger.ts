import { basename, dirname, join } from "path";
import Merger from "./Merger";
import { METADATA_EXTENSIONS, ROOT_TAGS, SPLIT_EXTENSIONS } from "../constants";

export default class TranslationsMerger extends Merger {
	getRootTag(): string {
		return ROOT_TAGS.TRANSLATIONS;
	}

	getSplittedExtension(): string {
		return SPLIT_EXTENSIONS.TRANSLATIONS;
	}

	getOutputFile(inputDir: string): string {
		const dir = dirname(inputDir);
		const language = basename(inputDir);
		return join(dir, `${language}${METADATA_EXTENSIONS.TRANSLATIONS}`);
	}
}
