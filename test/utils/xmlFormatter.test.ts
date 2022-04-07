import * as assert from "assert";
import XmlFormatter from "../../src/utils/xmlFormatter";

const expected = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<rootTag atrrr="attr-value">
  <childTag>
    <prop>Value</prop>
  </childTag>
</rootTag>
`;
describe("utils/xmlFormatter", () => {
	describe("spaces", () => {
		it("Should indent with 2 spaces", () => {
			const xmlFormatter = new XmlFormatter({
				indent: "  ",
				newLineChar: "\n",
				skipFinalNewLine: false,
			});
			const xml = {
				rootTag: {
					$: {
						atrrr: "attr-value",
					},
					childTag: {
						prop: "Value",
					},
				},
			};
			const result = xmlFormatter.formatXml(xml);
			assert.equal(result, expected);
		});
	});

	describe("fromFlags", () => {
		describe("no flags defined", () => {
			const result = XmlFormatter.fromFlags({});
			it("Should use 4 spaces as indent", () => {
				assert.equal(result.config.indent, "    ");
			});
			it("Should use normal new line char", () => {
				assert.equal(result.config.newLineChar, "\n");
			});
			it("Should add new line at end", () => {
				assert.equal(result.config.skipFinalNewLine, false);
			});
		});
		describe("Flags specified", () => {
			const result = XmlFormatter.fromFlags({
				"indent-style": "tabs",
				"skip-final-new-line": true,
				"new-line-char": "windows",
				"indent-size": 2,
			});
			it("Should use 2 tabs as indent", () => {
				assert.equal(result.config.indent, "\t\t");
			});
			it("Should use normal wInDoWs new line char", () => {
				assert.equal(result.config.newLineChar, "\r\n");
			});
			it("Shouldn't add new line at end", () => {
				assert.equal(result.config.skipFinalNewLine, true);
			});
		});
	});
});
