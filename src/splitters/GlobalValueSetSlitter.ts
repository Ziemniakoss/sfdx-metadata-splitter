import Splitter from "./Splitter";
import { readXmlFromFile } from "../utils/filesUtils";

export default class GlobalValueSetSlitter extends Splitter {
	getRootTag(): string {
		return "GlobalValueSet";
	}

	async split(inputFile: string, outputDir: string): Promise<unknown> {
		const rawGlobalValueSet = await readXmlFromFile(inputFile);
		return;
	}
}
