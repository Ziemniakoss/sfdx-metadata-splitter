import SplitTranslations from "../../splitter/translations/split";

export default class OldSplitTranslations extends SplitTranslations {
	public async run() {
		this.ux.warn(
			"This command was moved to splitter namespaces and will be deleted in the future"
		);
		return super.run();
	}
}
