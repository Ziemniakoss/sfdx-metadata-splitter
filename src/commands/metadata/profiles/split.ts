import SplitProfiles from "../../splitter/profiles/split";

export default class OldSplitProfiles extends SplitProfiles {
	async run() {
		this.ux.warn(
			"This command was moved to splitter namespaces and will be deleted in the future"
		);
		return super.run();
	}
}
