import { join, sep } from "path";
import { existsSync, mkdirSync, promises } from "fs";
import Splitter from "./Splitter";
import { ROOT_TAGS, SPLIT_EXTENSIONS } from "../constants";
import { readXmlFromFile } from "../utils/filesUtils";

export default class TranslationsSplitter extends Splitter {
	async split(inputFile: string, deleteSourceFiles: boolean) {
		const baseOutputDir = this.getBaseDir(inputFile);
		const splittedPathToInputFile = inputFile.split(sep);
		const fileName =
			splittedPathToInputFile[splittedPathToInputFile.length - 1];
		const splittedFileName = fileName.split(".");
		if (splittedFileName.length != 3) {
			throw new Error("unsupported translation name"); //TODO better message
		}
		const outputDir = join(baseOutputDir, splittedFileName[0]);
		if (!existsSync(outputDir)) {
			mkdirSync(outputDir);
		}

		const translations = (await readXmlFromFile(inputFile)).Translations ?? {};
		const splittingPromise = Promise.all([
			this.writeBotsTranslations(translations, outputDir),
			this.writeApplicationsTranslations(translations, outputDir),
			this.writeCustomLabelsTranslations(translations, outputDir),
			this.writeCustomPageWebLinksTranslations(translations, outputDir),
			this.writeCustomTabsTranslations(translations, outputDir),
			this.writeFlowDefinitionsTranslations(translations, outputDir),
			this.writeGlobalPicklistsTranslations(translations, outputDir),
			this.writePromptsTranslations(translations, outputDir),
			this.writeQuickActionsTranslations(translations, outputDir),
			this.writeReportTypesTranslations(translations, outputDir),
			this.writeScontrolsTranslations(translations, outputDir),
		]);
		if (deleteSourceFiles) {
			return Promise.all([splittingPromise, promises.rm(inputFile)]);
		}
		return splittingPromise;
	}

	private async writeBotsTranslations(translations, outputDir: string) {
		return this.writeSplittedToFiles(
			translations,
			["fullName"],
			outputDir,
			SPLIT_EXTENSIONS.TRANSLATIONS,
			"bots"
		);
	}

	private async writeApplicationsTranslations(translations, outputDir: string) {
		return this.writeSplittedToFiles(
			translations,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.TRANSLATIONS,
			"customApplications"
		);
	}

	private async writeCustomLabelsTranslations(translations, outputDir: string) {
		return this.writeSplittedToFiles(
			translations,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.TRANSLATIONS,
			"customLabels"
		);
	}

	private async writeCustomPageWebLinksTranslations(
		translations,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			translations,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.TRANSLATIONS,
			"customPageWebLinks"
		);
	}

	private async writeCustomTabsTranslations(translations, outputDir: string) {
		return this.writeSplittedToFiles(
			translations,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.TRANSLATIONS,
			"customTabs"
		);
	}

	private async writeFlowDefinitionsTranslations(
		translations,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			translations,
			["fullName"],
			outputDir,
			SPLIT_EXTENSIONS.TRANSLATIONS,
			"flowDefinitions"
		);
	}

	private async writeGlobalPicklistsTranslations(
		translations,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			translations,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.TRANSLATIONS,
			"globalPicklists"
		);
	}

	private async writePromptsTranslations(translations, outputDir: string) {
		return this.writeSplittedToFiles(
			translations,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.TRANSLATIONS,
			"prompts"
		);
	}

	private async writeQuickActionsTranslations(translations, outputDir: string) {
		return this.writeSplittedToFiles(
			translations,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.TRANSLATIONS,
			"quickActions"
		);
	}

	private async writeReportTypesTranslations(translations, outputDir: string) {
		return this.writeSplittedToFiles(
			translations,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.TRANSLATIONS,
			"reportTypes"
		);
	}

	private async writeScontrolsTranslations(translations, outputDir: string) {
		return this.writeSplittedToFiles(
			translations,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.TRANSLATIONS,
			"scontrols"
		);
	}
	getRootTag(): string {
		return ROOT_TAGS.TRANSLATIONS;
	}
}
