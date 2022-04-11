import { flags, SfdxCommand } from "@salesforce/command";
import { existsSync, rmSync } from "fs";
import { join } from "path";
import { Messages, SfdxError } from "@salesforce/core";
import { XML_NAMESPACE } from "../../../constants";
import {
	getDefaultFolder,
	readXmlFromFile,
	writeXmlToFile,
} from "../../../utils/filesUtils";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import XmlFormatter from "../../../utils/xmlFormatter";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(
	"sfdx-metadata-splitter",
	"labels_split"
);

export default class SplitLabels extends SfdxCommand {
	public static description = messages.getMessage("description");
	protected static requiresProject = true;

	public static flagsConfig = {
		"output-folder": flags.string({
			description: messages.getMessage("flag_output"),
			char: "o",
		}),
		input: flags.string({
			description: messages.getMessage("flag_input"),
			char: "i",
		}),
		"remove-input-file": flags.boolean({
			description: messages.getMessage("flag_remove"),
			char: "r",
		}),
		...FORMATTING_FLAGS,
	};

	public async run() {
		this.ux.warn("In future major release, command will delete source files by default. New flag will be introduced, keep, that will allow to keep source files")
		const [inputFileName, outputFolder] = await Promise.all([
			this.getInputFile(),
			this.getOutputFolder(),
		]);
		const labelsMap = await this.readLabelsFromFile(inputFileName);
		const labels = Array.from(labelsMap.values());

		await Promise.all(
			labels.map((label) => this.createLabelFile(outputFolder, label))
		);
		if (this.flags["remove-input-file"]) {
			rmSync(inputFileName);
		}
	}

	private async createLabelFile(outputFolder: string, label) {
		const fileName = join(outputFolder, `${label.fullName[0]}.labels-meta.xml`);
		const xmlLabelStructure = {
			CustomLabels: {
				$: {
					xmlns: XML_NAMESPACE,
				},
				labels: [label],
			},
		};
		return writeXmlToFile(
			fileName,
			xmlLabelStructure,
			XmlFormatter.fromFlags(this.flags)
		);
	}

	/**
	 * Reads labels from file and organises them in map with lower case full name of label as key
	 * @param filePath file to read
	 * @private
	 * @return map lower case full name -> custom label
	 */
	private async readLabelsFromFile(
		filePath: string
	): Promise<Map<string, unknown>> {
		return readXmlFromFile(filePath).then((parsedLabelsXml) => {
			const labelsMap = new Map<string, unknown>();
			// @ts-ignore
			for (const label of parsedLabelsXml.CustomLabels?.labels ?? []) {
				const key = label.fullName[0].toLowerCase();
				if (labelsMap.has(key)) {
					this.ux.warn(`Duplicate label key: ${label.fullName[0]}`);
				}
				labelsMap.set(key, label);
			}
			return labelsMap;
		});
	}

	public async getOutputFolder(): Promise<string> {
		//TODO error when foler does not exist
		if (this.flags["output-folder"]) {
			return this.flags["output-folder"];
		}
		return join(getDefaultFolder(this.project), "main", "default", "labels");
	}

	public async getInputFile(): Promise<string> {
		let inputPath;
		if (this.flags.input != null) {
			inputPath = this.flags.input;
		} else {
			let baseDir = getDefaultFolder(this.project);
			inputPath = join(
				baseDir,
				"main",
				"default",
				"labels",
				"CustomLabels.labels-meta.xml"
			);
		}
		if (existsSync(inputPath)) {
			return inputPath;
		}

		throw new SfdxError(
			messages.getMessage("error_fileDoesNotExist"),
			"INPUT_FILE_DOESNT_EXIST",
			[
				messages.getMessage("action_specifyInput"),
				messages.getMessage("action_createCustomLabelsFile"),
				messages.getMessage("action_fetchLabels"),
			],
			2
		);
	}
}
