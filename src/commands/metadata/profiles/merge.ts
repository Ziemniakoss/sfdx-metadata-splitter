import MergeProfiles from "../../splitter/profiles/merge";

export default class OldMergeProfiles extends MergeProfiles{
	async run() {
		this.ux.warn("This command was moved to splitter namespaces and will be deleted in the future")
		return super.run()
	}
}
