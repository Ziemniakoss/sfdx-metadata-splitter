import { Builder } from "xml2js";
interface FormatterConfig {
	indent: string;
	skipFinalNewLine: boolean;
	newLineChar: string;
}

function repeat(str: string, times: number): string {
	let result = str;
	for (let i = 0; i < times; i++) {
		result += str;
	}
	return result;
}

export default class XmlFormatter {
	config: FormatterConfig;

	constructor(config: FormatterConfig) {
		this.config = {
			indent: "    ",
			skipFinalNewLine: false,
			newLineChar: "\n",
			...config,
		};
	}

	formatXml(data: any): string {
		const xmlBuilder = new Builder({
			renderOpts: {
				pretty: true,
				indent: this.config.indent,
				newLine: this.config.newLineChar,
			},
		});
		const xml = xmlBuilder.buildObject(data);
		if (this.config.skipFinalNewLine) {
			return xml;
		}
		return xml + this.config.newLineChar;
	}

	static fromFlags(flags): XmlFormatter {
		let indentChar = " ";
		if (flags["indent-style"]) {
			indentChar = flags["indent-style"] === "spaces" ? " " : "\t";
		}
		const indentSize = flags["indent-size"] ?? 4;
		return new XmlFormatter({
			indent: repeat(indentChar, Math.max(0, indentSize)),
			newLineChar: flags["new-line-cha"] == "windows" ? "\r\n" : "\n",
			skipFinalNewLine: flags["skip-final-new-line"],
		});
	}
}
