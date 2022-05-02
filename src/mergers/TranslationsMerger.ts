import { basename, dirname, join } from "path";
import Merger from "./Merger";
import {
	SPLITTED_TRANSLATIONS_EXTENSION,
	TRANSLATIONS_EXTENSION,
} from "../constants";

export default class TranslationsMerger extends Merger {
	getRootTag(): string {
		return "Translations";
	}

	getSplittedExtension(): string {
		return SPLITTED_TRANSLATIONS_EXTENSION;
	}

	getOutputFile(inputDir: string): string {
		const dir = dirname(inputDir);
		const language = basename(inputDir);
		return join(dir, `${language}${TRANSLATIONS_EXTENSION}`);
	}
}
