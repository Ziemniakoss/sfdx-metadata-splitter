import MergeTranslations from "../../splitter/translations/merge";

export default class OldMergeTranslations extends MergeTranslations{
	public async run() {
		this.ux.warn("This command was moved to splitter namespaces and will be deleted in the future")
		return super.run();
	}
}
