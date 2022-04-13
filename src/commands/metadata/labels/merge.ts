import { flags, } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { PLUGIN_NAME, } from "../../../constants";
import MergingCommand from "../../../MergingCommand";
import Merger from "../../../mergers/Merger";
import LabelsMerger from "../../../mergers/LabelsMerger";
import XmlFormatter from "../../../utils/xmlFormatter";
import { basename, join } from "path";
import { getDefaultFolder } from "../../../utils/filesUtils";
import { existsSync } from "fs";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(PLUGIN_NAME, "labels_merge");

export default class MergeLabels extends MergingCommand{
	public static description = messages.getMessage("description");

	protected static requiresProject = true;
	public static flagsConfig = {
		output: flags.string({
			description: messages.getMessage("flag_output"),
			char: "o",
		}),
		remove: flags.boolean({
			description: messages.getMessage("flag_remove"),
			char: "r",
		}),
	};

	async run(){
		this.ux.warn(messages.getMessage("deprecation_notice"))
		const merger = this.getMerger();
		const dirsToMerge = await this.getInputDirs();

		this.ux.startSpinner(this.getSpinnerText())
		for(const dir of dirsToMerge) {
			this.ux.setSpinnerStatus(basename(dir))
			await merger.join(dir, this.deleteAfterSplitting())
			this.ux.log(dir)
		}
		this.ux.stopSpinner(this.getDoneMessage())
	}

	async getInputDirs():Promise<string[]> {
		if(this.flags.input != null){
			return super.getInputDirs()
		}
		const defaultPath = getDefaultFolder(this.project)
		const labelsDir = join(
			defaultPath,
			"main",
			"default",
			this.getFolderName()
		)
		if(existsSync(labelsDir)) {
			return [labelsDir]
		}
		return []
	}
	getDoneMessage(): string {
		return messages.getMessage("done");
	}

	getFolderName(): string {
		return "labels";
	}

	getMerger(): Merger {
		return new LabelsMerger(XmlFormatter.fromFlags(this.flags));
	}

	getSpinnerText(): string {
		return messages.getMessage("spinnerText");
	}
}
