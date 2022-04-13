import { SfdxCommand } from "@salesforce/command";
import Merger from "./mergers/Merger";
import { getAllDirs, getDefaultFolder } from "./utils/filesUtils";
import { basename, join } from "path";

export default abstract class MergingCommand extends SfdxCommand {
	abstract getMerger(): Merger;

	async run() {
		const merger = this.getMerger();
		const foldersToMerge = await this.getInputDirs();

		this.ux.startSpinner(this.getSpinnerText());
		for (const dir of foldersToMerge) {
			this.ux.setSpinnerStatus(basename(dir));
			await merger.join(dir, this.deleteAfterSplitting());
			this.ux.log(dir);
		}
		this.ux.stopSpinner(this.getDoneMessage());
	}

	protected deleteAfterSplitting(): boolean {
		return this.flags.remove;
	}

	/**
	 * Folder name holding data in standard source project.
	 * For example for labels, this should return "labels"
	 */
	abstract getFolderName(): string;

	abstract getDoneMessage(): string;

	abstract getSpinnerText(): string;

	protected async getInputDirs(): Promise<string[]> {
		if (this.flags.input != null) {
			return this.flags.input.split(",").map((dir) => dir.trim());
		}
		const defaultPath = getDefaultFolder(this.project);
		const translationsFolder = join(
			defaultPath,
			"main",
			"default",
			this.getFolderName()
		);
		return getAllDirs(translationsFolder);
	}
}
