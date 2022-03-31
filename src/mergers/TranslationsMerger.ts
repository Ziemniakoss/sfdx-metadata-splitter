import Merger from "./Merger";
import { SPLITTED_TRANSLATIONS_EXTENSION } from "../constants";

export default class TranslationsMerger extends Merger {
	getRootTag(): string {
		return "Translations";
	}

	getSplittedExtension(): string {
		return SPLITTED_TRANSLATIONS_EXTENSION;
	}
}
