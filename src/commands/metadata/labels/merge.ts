import { flags, SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import {
	findAllFilesWithExtension,
	getDefaultFolder,
	readXmlFromFile,
	writeXmlToFile,
} from "../../../utils/filesUtils";
import { compareByField } from "../../../utils/comparators";
import { join } from "path";
import { promises } from "fs";
import { XML_NAMESPACE } from "../../../constants";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(
	"sfdx-metadata-splitter",
	"labels_merge"
);

export default class MergeLabels extends SfdxCommand {
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

	public async run() {
		const filesToMerge = await findAllFilesWithExtension(
			this.project.getPath(),
			"labels-meta.xml"
		);
		const outputPath = await this.getOutputPath();
		console.log(getDefaultFolder(this.project));

		const labels = await Promise.all(
			filesToMerge.map((fileName) => this.readLabelsFromFile(fileName))
		).then((results) => results.flat());
		const sortedLabels = labels.sort((a, b) =>
			compareByField(a, b, "fullName")
		);
		const labelsXml = {
			CustomLabels: {
				$: {
					xmlns: XML_NAMESPACE,
				},
				labels: sortedLabels,
			},
		};
		if (this.flags.remove) {
			await this.removeSourceFiles(filesToMerge);
		}
		return writeXmlToFile(outputPath, labelsXml);
	}

	private async removeSourceFiles(files) {
		return Promise.all(files.map((file) => promises.rm(file)));
	}

	private async getOutputPath(): Promise<string> {
		if (this.flags.output != null) {
			return this.flags.output;
		}
		return join(
			getDefaultFolder(this.project),
			"main",
			"default",
			"labels",
			"CustomLabels.labels-meta.xml"
		);
	}

	private async readLabelsFromFile(filePath: string): Promise<unknown> {
		return readXmlFromFile(filePath).then((parsedXml) => {
			// @ts-ignore
			const labels = parsedXml.CustomLabels?.labels;
			return labels ?? [];
		});
	}
}
