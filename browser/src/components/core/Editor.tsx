import React, { useCallback, useContext, useState } from "react";
import Modal from "react-modal";
import { MdDock, MdLink } from "react-icons/md";

// Tiptap + extensions
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import History from "@tiptap/extension-history";
import CharacterCount from "@tiptap/extension-character-count";

import { ButtonClass } from "../../types/styles";
import { ResponseCharacterLimit } from "../ContributionSection";
import { ModalContext } from "src/helpers/contexts/ModalContext";
import "./Editor.css";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  responseLength: number | undefined;
  setResponseLength: (value: number) => void;
}

export function Editor({
  value,
  onChange,
  responseLength,
  setResponseLength,
}: Props) {
  const [linkInput, setLinkInput] = useState<string | null>(null);
  const { openLinkInputModal, closeLinkInputModal } = useContext(ModalContext);

  // Set Cmd/Ctrl-k shortcut
  const CustomLink = Link.extend({
    addKeyboardShortcuts() {
      return {
        "Mod-k": () => {
          openLinkInputModal(this.editor, getPreviousLink())
        },
      }
    },
  });

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      History,
      CustomLink,
      CharacterCount.configure({
        limit: ResponseCharacterLimit,
      }),
    ],
    onUpdate: ({ editor }) => {
      onChange(
        editor.getHTML()
      );
      setResponseLength(editor.storage.characterCount.characters());
    },
  })

  const getPreviousLink = () => {
    return editor.getAttributes("link").href;
  }

  return (
    <>
      {editor &&
        <BubbleMenu
          editor={editor}
          tippyOptions={{
            placement: "bottom",
          }}
        >
          <div
            onClick={(event) => {
              openLinkInputModal(editor, getPreviousLink());
            }}
            className={"menu"}
          >
            <div className="menuItem">Add link</div>
            <MdLink className={"menuItem linkIcon white"} />
          </div>
        </BubbleMenu>
      }
      <EditorContent
        className="form-textarea block w-full"
        editor={editor}
        id="editor"
      />
    </>
  )
}
