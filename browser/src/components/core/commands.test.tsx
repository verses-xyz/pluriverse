import { Editor } from "@tiptap/react"
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";

import { selectFullWordCommand } from "./commands";

var editor: Editor | null = null

beforeEach(() => {
    // Setup tiptap text schema
    const content = {
        type: "doc",
        content: [
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: "012345678 012345678 ",
                    },
                ],
            },
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: "012355678    345678 123 !!22$#",
                    },
                ],
            },
        ],
    };

    editor = new Editor({
        content,
        extensions: [
            Document,
            Paragraph,
            Text,
            Bold,
            Italic,
            Link,
        ],
    });
});

interface TestParams {
    selectedFrom: number,
    selectedTo: number,
    expectedFrom: number,
    expectedTo: number,
    expectedContent: string,
}

const testCommand = ({
    selectedFrom,
    selectedTo,
    expectedFrom,
    expectedTo,
    expectedContent,
}: TestParams) => {
    editor!!
        .chain()
        .setTextSelection({ from: selectedFrom, to: selectedTo })
        .command(({ tr, commands }) => {
            return selectFullWordCommand({ tr, commands })
        })
        .run()

    const { from, to } = editor!!.state.selection

    const slice = editor!!.state.selection.content().content
    const content = slice.textBetween(0, slice.size)

    expect(content).toBe(expectedContent)
    expect(from).toBe(expectedFrom);
    expect(to).toBe(expectedTo);
}

test("hightlighting middle of word", () => {
    testCommand({
        selectedFrom: 2,
        selectedTo: 5,
        expectedFrom: 1,
        expectedTo: 10,
        expectedContent: "012345678",
    })
});

test("hightlighting middle of two words", () => {
    testCommand({
        selectedFrom: 3,
        selectedTo: 15,
        expectedFrom: 1,
        expectedTo: 20,
        expectedContent: "012345678 012345678",
    })
});

test("hightlighting across paragraphs", () => {
    testCommand({
        selectedFrom: 15,
        selectedTo: 25,
        expectedFrom: 11,
        expectedTo: 32,
        expectedContent: "012345678 012355678",
    })
});

test("hightlighting full word already", () => {
    testCommand({
        selectedFrom: 1,
        selectedTo: 10,
        expectedFrom: 1,
        expectedTo: 10,
        expectedContent: "012345678",
    })
});

test("nothing selected", () => {
    testCommand({
        selectedFrom: 3,
        selectedTo: 3,
        expectedFrom: 1,
        expectedTo: 10,
        expectedContent: "012345678",
    })
});

test("left half of word selected", () => {
    testCommand({
        selectedFrom: 1,
        selectedTo: 5,
        expectedFrom: 1,
        expectedTo: 10,
        expectedContent: "012345678",
    })
});

test("right half of word selected", () => {
    testCommand({
        selectedFrom: 5,
        selectedTo: 10,
        expectedFrom: 1,
        expectedTo: 10,
        expectedContent: "012345678",
    })
});

test("word and surrounding spaces selected", () => {
    testCommand({
        selectedFrom: 10,
        selectedTo: 21,
        expectedFrom: 11,
        expectedTo: 20,
        expectedContent: "012345678",
    })
});

test("two words and surrounding spaces selected", () => {
    testCommand({
        selectedFrom: 35,
        selectedTo: 47,
        expectedFrom: 36,
        expectedTo: 46,
        expectedContent: "345678 123",
    })
});

test("punctuation stuff", () => {
    testCommand({
        selectedFrom: 47,
        selectedTo: 50,
        expectedFrom: 49,
        expectedTo: 51,
        expectedContent: "22",
    })
});

test("in the middle of multiple spaces", () => {
    testCommand({
        selectedFrom: 33,
        selectedTo: 35,
        expectedFrom: 34,
        expectedTo: 34,
        expectedContent: "",
    })
});

test("in the middle of multiple spaces with nothing selected", () => {
    testCommand({
        selectedFrom: 34,
        selectedTo: 34,
        expectedFrom: 34,
        expectedTo: 34,
        expectedContent: "",
    })
});

