import { Messages } from "@salesforce/core";
import { PLUGIN_NAME } from "@constants";
import { flags } from "@salesforce/command";

Messages.importMessagesDirectory(__dirname);
const FORMATTING_MESSAGES = Messages.loadMessages(
	PLUGIN_NAME,
	"formatting_flags"
);
const FORMATTING_FLAGS = {
	"skip-final-new-line": flags.boolean({
		description: FORMATTING_MESSAGES.getMessage("skipFinalNewLine"),
	}),
	"indent-size": flags.integer({
		description: FORMATTING_MESSAGES.getMessage("indentSize"),
		default: 4,
	}),
	"indent-style": flags.option({
		description: FORMATTING_MESSAGES.getMessage("indentStyle"),
		options: ["spaces", "tabs"],
		default: "spaces",
		parse: (val) => val,
	}),
	"new-line-char": flags.option({
		description: FORMATTING_MESSAGES.getMessage("newLineChar"),
		options: ["normal", "windows"],
		default: "normal",
		parse: (val) => val,
	}),
};
export default FORMATTING_FLAGS;
