import React, { useCallback, useContext, useState } from "react";
import Modal from "react-modal";
import { MdDock, MdLink } from "react-icons/md";

// Tiptap + extensions
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import History from "@tiptap/extension-history";
import CharacterCount from "@tiptap/extension-character-count";

import sanitizeHtml from "sanitize-html";

import { ButtonClass } from "../../types/styles";
import { ResponseCharacterLimit } from "../ContributionSection";
import { ModalContext } from "src/helpers/contexts/ModalContext";
import "./Editor.css";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  responseLength: number | undefined;
  setResponseLength: (value: number) => void;
  placeholder?: string;
}

export function Editor({
  value,
  onChange,
  responseLength,
  setResponseLength,
  placeholder,
}: Props) {
  const [linkInput, setLinkInput] = useState<string | null>(null);
  const [displayLinkModal, setDisplayLinkModal] = useState<boolean>(false);
  const { openLinkInputModal, closeLinkInputModal } = useContext(ModalContext);

  // Set Cmd/Ctrl-k shortcut
  const CustomLink = Link.extend({
    addKeyboardShortcuts() {
      return {
        "Mod-k": () => openLinkInputModal(this.editor, getPreviousLink()),
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
      Placeholder.configure({
        placeholder: `${placeholder}`,
      }),
    ],
    onUpdate: ({ editor }) => {
      onChange(
        sanitizeHtml(editor.getHTML())
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
            onClickOutside: () => { console.log("clicked outside") },
            content: (reference) => {
              console.log(reference);
              return reference.getAttribute("title");
            }
          }}
        >
          <div className="menu">
            <button
              onClick={(event) => {
                console.log("tippy clicky")
                //openLinkInputModal(editor, getPreviousLink());
              }}
              className={`menuItem linkIcon ${displayLinkModal ? "shimmer" : "white"}`}
            >
              <div className={`addLinkTooltip ${displayLinkModal ? "iconShimmer" : "white"}`}>
                Add link
                <MdLink className={`${displayLinkModal ? "iconShimmer" : "white"}`} />
              </div>
            </button>
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
