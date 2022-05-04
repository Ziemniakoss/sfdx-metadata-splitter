import MetadataSorter from "./MetadataSorter";
import Translations from "../metadataTypes/Translations";

export default class TranslationsSorter
	implements MetadataSorter<Translations>
{
	sortMetadata(metadata: Translations): Translations {
		//TODO
		return metadata;
	}
}
