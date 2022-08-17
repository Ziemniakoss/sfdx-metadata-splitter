import MergeLabels from "../../splitter/labels/merge";

export default class OldMergeLabels extends MergeLabels{
	async run() {
		this.ux.warn("This command was moved to splitter namespace")
		return super.run()
	}
}
