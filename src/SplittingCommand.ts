import { SfdxCommand } from "@salesforce/command";
import Splitter from "./splitters/Splitter";
import {
	findAllFilesWithExtension,
	getDefaultFolder,
} from "./utils/filesUtils";

export default abstract class SplittingCommand extends SfdxCommand {
	protected abstract getSplitter(): Splitter;

	async run() {
		const filesToSplit = await this.getFilesToSplit();
		const splitter = this.getSplitter();

		this.ux.startSpinner(this.getSpinnerText());
		const deleteAfterSplitting = this.deleteAfterSplitting();
		await Promise.all(
			filesToSplit.map((file) => splitter.split(file, deleteAfterSplitting))
		);
		this.ux.stopSpinner(this.getDoneMessage());
	}

	private async getFilesToSplit(): Promise<string[]> {
		if (this.flags.input) {
			return this.flags.input;
		}
		return findAllFilesWithExtension(
			getDefaultFolder(this.project),
			this.getFilesExtension()
		);
	}

	protected abstract getFilesExtension(): string;

	protected abstract getDoneMessage(): string;

	protected abstract getSpinnerText(): string;

	protected deleteAfterSplitting(): boolean {
		return this.flags.remove;
	}
}
