import React, { useCallback, useState } from "react";
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
import isURL from "validator/lib/isURL";

import { ButtonClass } from "../../types/styles";
import { ResponseCharacterLimit } from "../ContributionSection";
import "./Editor.css";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  responseLength: number | undefined;
  setResponseLength: (value: number) => void;
  placeholder?: string;
}

Modal.setAppElement("#root");
export function Editor({
  value,
  onChange,
  responseLength,
  setResponseLength,
  placeholder,
}: Props) {
  const [linkInput, setLinkInput] = useState<string | null>(null);
  const [displayLinkModal, setDisplayLinkModal] = useState<boolean>(false);
  const [isInvalidInput, setIsInvalidInput] = useState<boolean>(false);

  const openModal = () => {
    setDisplayLinkModal(true)
    toggleBackgroundScrollingOnModal(false);
  }

  const closeModal = () => {
    setDisplayLinkModal(false);
    setLinkInput(null);
    toggleBackgroundScrollingOnModal(true)
  }

  // Set Cmd/Ctrl-k shortcut
  const CustomLink = Link.extend({
    addKeyboardShortcuts() {
      return {
        "Mod-k": () => openModal(),
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

  const setLink = (save: boolean) => {
    setIsInvalidInput(false);
    if (!save) {
      closeModal();
    }

    var url = null;
    // If link is not null, check if it's valid and display error message otherwise.
    if (!linkInput) {
      if (isURL(linkInput)) {
        url = linkInput;
      } else {
        setIsInvalidInput(true);
        return;
      }
    } else {
      editor.chain().focus().unsetLink().run();
      closeModal();
      return;
    }

    // Add so href doesn't point to pluriverse.world/{url}  
    if (
      !(url.toLowerCase().startsWith("https://")
        || url.toLowerCase().startsWith("http://"))
    ) {
      url = "http://" + url;
    }

    // Set link.
    editor.chain().focus().setLink({ href: url }).run();

    closeModal();
  };

  const getPreviousLink = () => {
    const prevUrl = editor.getAttributes("link").href;
    setLinkInput(prevUrl);
  }

  const toggleBackgroundScrollingOnModal = (scrollable: boolean) => {
    if (scrollable) {
      document.body.style.overflow = "scroll";
    } else {
      document.body.style.overflow = "hidden";
    }
  }

  const handleKeyPress = (event) => {
    // Enter key press
    if (event.key === "Enter") {
      setLink(true);
    }
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
          <div className="menu">
            <button
              onClick={() => {
                openModal();
              }}
              className={`menuItem linkIcon ${displayLinkModal ? "shimmer" : "white"}`}
            >
              <MdLink className={`${displayLinkModal ? "iconShimmer" : "white"}`} />
            </button>
          </div>
        </BubbleMenu>
      }
      <Modal
        isOpen={displayLinkModal}
        onAfterOpen={getPreviousLink}
        className="modal"
        overlayClassName="overlay"
        onRequestClose={() => closeModal()}
        shouldCloseOnOverlayClick={true}
      >
        <h3 className="text-3xl font-bold">
          Add Link
        </h3>
        <div>
          <input
            type="url"
            className={`linkInput ${isInvalidInput && "invalidLink"}`}
            placeholder="https://interdependence.online/declaration"
            value={linkInput || ""}
            onInput={e => {
              setLinkInput((e.target.value) || "")
            }}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        </div>
        <div className="modalButtons">
          <div className="cancelButton">
            <button
              className={`${ButtonClass("blue")}`}
              onClick={() => setLink(false)}
            >
              Cancel
            </button>
          </div>
          <div className="addButton">
            <button
              className={`${ButtonClass("blue")}`}
              onClick={() => setLink(true)}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <EditorContent
        className="form-textarea block w-full"
        editor={editor}
      />
    </>
  )
}
