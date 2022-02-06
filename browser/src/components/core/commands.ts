import { EditorState, Transaction, SingleCommands } from "@tiptap/react";

interface EditorAttributes {
    tr: Transaction,
    commands: SingleCommands,
    state?: EditorState,
}

export const selectFullWordCommand = ({ tr, commands }: EditorAttributes) => {
    var doc = tr.doc
    var { from, to } = tr.selection
    var fullWordSelected = false;

    const markableChars = /[a-zA-Z0-9-_\@]/

    var boundsMarkable = false;

    while (from < to && !boundsMarkable) {

        if (from + 1 === to) {
            // If from and two are one char apart, get the char
            // and see if it is markable.
            var char = doc.textBetween(from, to);
            if (!char.match(markableChars)) {
                from++;
                boundsMarkable = false;
            } else {
                boundsMarkable = true;
            }
        } else {
            // Otherwise get pointers and close them in until they 
            // meet markable chars
            var firstChar = doc.textBetween(from, from + 1);
            var lastChar = doc.textBetween(to - 1, to);

            if (!markableChars.test(firstChar)) {
                from++;
            }
            if (!markableChars.test(lastChar)) {
                to--;
            }

            boundsMarkable = markableChars.test(firstChar) && markableChars.test(lastChar);
        }
    }

    while (!fullWordSelected) {
        var charBeforeSelection = doc.textBetween(from - 1, from);
        var charAfterSelection = doc.textBetween(to, to + 1);

        if (markableChars.test(charBeforeSelection) && from > 1) {
            from--;
        }
        if (markableChars.test(charAfterSelection)) {
            to++;
        }

        fullWordSelected = (
            (
                !markableChars.test(charBeforeSelection) || from === 1
            ) && (
                !markableChars.test(charAfterSelection) || to === 1
            )
        );
    }

    return commands.setTextSelection({ from, to });
};

export const unsetWhitespaceMarksCommand = ({ tr, state }: EditorAttributes) => {
    var doc = tr.doc
    var { selection } = tr
    const { from, to } = selection

    for (var i = from; i < to; i++) {
        const char = doc.textBetween(i, i + 1);
        const marks = doc.nodeAt(i).marks

        if (char == " ") {
            marks.forEach(mark => {
                if (mark.type.name === "bold" || mark.type.name === "italic") {
                    tr.removeMark(i, i + 1, mark)
                    tr.removeStoredMark(mark)
                }
                console.log(mark)
            });
        }
    }

    return true;
}
