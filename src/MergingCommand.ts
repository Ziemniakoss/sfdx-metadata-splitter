import { SfdxCommand } from "@salesforce/command";
import Merger from "./mergers/Merger";
import { getAllDirs } from "./utils/filesUtils";
import { join } from "path";

export default abstract class MergingCommand extends SfdxCommand {
	abstract getMerger(): Merger;

	async run() {
		const merger = this.getMerger();
		const foldersToMerge = await this.getInputDirs();

		this.ux.startSpinner(this.getSpinnerText());
		const deleteAfterSplitting = this.deleteAfterSplitting();
		await Promise.all(
			foldersToMerge.map((folder) => merger.join(folder, deleteAfterSplitting))
		);
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
			return this.flags.input;
		}
		const folderSearchingPromises = this.project
			.getPackageDirectories()
			.map((packageDir) =>
				join(packageDir.path, "main", "default", this.getFolderName())
			)
			.map((folder) => getAllDirs(folder));
		return Promise.all(folderSearchingPromises).then((folders) =>
			folders.flat()
		);
	}
}
