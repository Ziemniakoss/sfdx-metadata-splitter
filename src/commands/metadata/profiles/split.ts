import { flags } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { PLUGIN_NAME, PROFILES_EXTENSION } from "@constants";
import FORMATTING_FLAGS from "@utils/formattingFlags";
import ProfilesSplitter from "@splitters/ProfilesSplitter";
import XmlFormatter from "@utils/xmlFormatter";

import SplittingCommand from "../../../SplittingCommand";
import Splitter from "@splitters/Splitter";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(PLUGIN_NAME, "profiles_split");

export default class SplitProfiles extends SplittingCommand {
	public static description = messages.getMessage("description");
	protected static requiresProject = true;
	public static flagsConfig = {
		remove: flags.boolean({
			description: messages.getMessage("flag_remove"),
			char: "r",
		}),
		input: flags.string({
			description: messages.getMessage("flag_input"),
			char: "i",
		}),
		...FORMATTING_FLAGS,
	};

	public static examples = [
		messages.getMessage("example_splitAll"),
		messages.getMessage("example_splitAllAndRemoveSource"),
		messages.getMessage("example_splitOnlyOneProfile"),
	];

	protected getDoneMessage(): string {
		return messages.getMessage("done");
	}

	protected getFilesExtension(): string {
		return PROFILES_EXTENSION;
	}

	protected getSpinnerText(): string {
		return messages.getMessage("splitting");
	}

	protected getSplitter(): Splitter {
		return new ProfilesSplitter(XmlFormatter.fromFlags(this.flags));
	}
}
