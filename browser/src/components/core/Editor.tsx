import React, { useCallback, useState } from "react";
import Modal from "react-modal";

// Tiptap + extensions
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import History from "@tiptap/extension-history";
import CharacterCount from "@tiptap/extension-character-count";

import { ButtonClass } from "src/types/styles";
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

  const sanitize = (inputHtml: string): string => {
    // Remove first p tag to prevent text going to next line
    return inputHtml.replace(
      /<p[^>]*>|<\/p[^>]*>/,
      ""
    );
  };

  const openModal = () => {
    setDisplayLinkModal(true)
    toggleBackgroundScrollingOnModal(false);
  }

  // Set Cmd/Ctrl-k shortcut
  const CustomLink = Link.extend({
    addKeyboardShortcuts() {
      return {
        'Mod-k': () => openModal(),
      }
    },
  })

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      History,
      Bold,
      Italic,
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
        sanitize(
          editor.getHTML()
        )
      );
      setResponseLength(editor.storage.characterCount.characters());
    },
  })

  const setLink = (cancel: boolean) => {
    if (cancel) {
      // Previous url
      return editor.getAttributes('link').href;
    }
    var url = linkInput;

    // TODO: Add Link validation

    if (url === "" || url === null || url === undefined) {
      //editor.chain().focus().extendMarkRange('link').unsetLink().run()
      editor.chain().focus().unsetLink().run()
      return
    }

    // Add so href doesn't point to pluriverse.world/{url}  
    if (
      !(url.toLowerCase().startsWith("https://")
        || url.toLowerCase().startsWith("http://"))
    ) {
      url = "http://" + url;
    }

    // Update link
    editor.chain().focus().setLink({ href: url }).run()
  };

  const onClickAddLink = () => {
    setLink(false);
    setDisplayLinkModal(false);
    setLinkInput(null);
    toggleBackgroundScrollingOnModal(true)
  };

  const onCloseModal = () => {
    setLink(true);
    setDisplayLinkModal(false);
    setLinkInput(null);
    toggleBackgroundScrollingOnModal(true);
  };

  const getPreviousLink = () => {
    const prevUrl = editor.getAttributes('link').href;
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
      onClickAddLink();
    }
  }

  return (
    <>
      {editor &&
        <>
          <div className="menu">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`menuItem ${editor.isActive('bold') ? 'shimmer' : ''}`}
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`menuItem ${editor.isActive('italic') ? 'shimmer' : ''}`}
            >
              <em>I</em>
            </button>
            <button
              onClick={() => {
                openModal();
              }}
              className={`menuItem linkIcon ${displayLinkModal ? 'shimmer' : 'white'}`}
            >
              <strong>🔗</strong> 
            </button>
          </div>
        </>
      }
      <Modal 
        isOpen={displayLinkModal} 
        onAfterOpen={getPreviousLink}
        className="modal" 
        overlayClassName="overlay"
        onRequestClose={() => onCloseModal()}
        shouldCloseOnOverlayClick={true}
      >
        <h3 className="text-3xl font-bold">
          Add Link 
        </h3>
        <div>
          <input 
            type="url" 
            className="linkInput"
            placeholder="https://interdependence.online/declaration"
            value={linkInput}
            onInput={e => {
              setLinkInput(e.target.value)
            }}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        </div>
        <div className="modalButtons">
          <div className="cancelButton">
            <button
              className={`${ButtonClass("blue")}`}
              onClick={onCloseModal}
            >
              Cancel 
            </button>
          </div>
          <div className="addButton">
            <button
              className={`${ButtonClass("blue")}`}
              onClick={onClickAddLink}
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
