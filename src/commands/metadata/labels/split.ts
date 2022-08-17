import SplitLabels from "../../splitter/labels/split";

export default class OldSplitLabels extends SplitLabels {
	public async run() {
		this.ux.warn(
			"This command was moved to splitter namespaces and will be deleted in the future"
		);
		return super.run();
	}
}
