import React, { useState } from "react";
import { ContributionCard } from "src/components/ContributionCard";
import { Contribution } from "src/types/common/server-api";
import Modal from "react-modal";
import dayjs from "dayjs";
import { IoMdClose } from "react-icons/io";
import { Editor } from "@tiptap/react";
import isURL from "validator/lib/isURL";

import { ButtonClass } from "../../types/styles";
import {
  getMinuteTimeOfDayDateDisplay,
  getDisplayForAuthor,
} from "src/components/SignatureContent";

export interface ModalContextInfo {
  openContributionModal: (
    contribution: Contribution,
    previousUrl?: string
  ) => void;
  closeContributionModal: () => void;
  openContributionId: number | undefined;
  openLinkInputModal: (
    editor: Editor,
    previousLink?: string
  ) => void;
  closeLinkInputModal: () => void;
}

export const ModalContext = React.createContext<ModalContextInfo>({
  openContributionModal: () => { },
  openContributionId: undefined,
  closeContributionModal: () => { },
  openLinkInputModal: () => { },
  closeLinkInputModal: () => { },
});

export function ModalProvider({ children }) {
  // Contribution modal state
  const [contributionModalOpen, setContributionModalOpen] =
    useState<boolean>(false);
  const [contribution, setContribution] = useState<Contribution | undefined>(
    undefined
  );
  const [prevUrl, setPrevUrl] = useState<string | undefined>(undefined);

  // Link input modal state
  const [linkInputModalOpen, setLinkInputModalOpen] =
    useState<boolean>(false);
  const [linkInput, setLinkInput] = useState<string | null>(null);
  const [isInvalidLinkInput, setIsInvalidLinkInput] = useState<boolean>(false);
  const [editor, setEditor] = useState<Editor | undefined>(undefined);

  // TODO: replace window location in place to reflect the contribution id.
  const openContributionModal = (
    contribution: Contribution,
    previousUrl?: string
  ) => {
    setContribution(contribution);
    setContributionModalOpen(true);
    if (previousUrl) {
      setPrevUrl(previousUrl);
      window.history.replaceState({}, "", `/contributions/${contribution.id}`);
    }
  };

  const closeContributionModal = () => {
    setContributionModalOpen(false);
    setContribution(undefined);
    if (prevUrl) {
      window.history.replaceState({}, "", prevUrl);
      setPrevUrl(undefined);
    }
  };

  function getContributionModalContent(highlightedContribution: Contribution) {
    return (
      <div>
        <div className="flex flex-row w-full justify-between items-center">
          <h2 className="font-bold text-2xl">
            Pluriverse Contribution #{highlightedContribution.id}
          </h2>
          <button onClick={closeContributionModal}>
            <IoMdClose color="var(--foreground-default)" />
          </button>
        </div>
        <p className="pt-0 my-2 text-lg">
          On{" "}
          {getMinuteTimeOfDayDateDisplay(
            dayjs(highlightedContribution.createdAt, { utc: true })
          )}
          , <b>{getDisplayForAuthor(highlightedContribution.author)}</b>{" "}
          contributed:
        </p>
        <ContributionCard
          contribution={highlightedContribution}
          renderCanvas
          full
          className={`mx-auto `}
        />
      </div>
    );
  }

  // Link input modal functions
  const setLink = (save: boolean) => {
    setIsInvalidLinkInput(false);

    if (!editor) {
      return;
    }

    if (!save) {
      closeLinkInputModal();
    }

    var url = null;
    // If link is not null, check if it's valid and display error message otherwise.
    if (linkInput) {
      if (isURL(linkInput)) {
        url = linkInput;
      } else {
        setIsInvalidLinkInput(true);
        return;
      }
    } else {
      editor.chain().focus().unsetLink().run();
      closeLinkInputModal();
      return;
    }

    // Add so href doesn't point to pluriverse.world/{url}  
    if (
      url &&
      !(url.toLowerCase().startsWith("https://")
        || url.toLowerCase().startsWith("http://"))
    ) {
      url = "http://" + url;
    }

    // Set link.
    editor.chain().focus().setLink({ href: url }).run();

    closeLinkInputModal();
  };

  const openLinkInputModal = (
    newEditor: Editor,
    previousLink: string,
  ) => {
    setLinkInput(previousLink);
    if (editor != newEditor) {
      setEditor(newEditor);
    }
    setLinkInputModalOpen(true);
    toggleBackgroundScrollingOnModal(false);
  };

  const closeLinkInputModal = () => {
    setLinkInputModalOpen(false);
    toggleBackgroundScrollingOnModal(true);
    setLinkInput(null);
    if (editor) {
      // Unselect text
      editor.chain().focus().setTextSelection(
        editor.state.selection.to
      ).run()
    }
  };

  const handleLinkInputEnter = (event) => {
    // Enter key press
    if (event.key === "Enter") {
      setLink(true);
    }
  }

  const toggleBackgroundScrollingOnModal = (scrollable: boolean) => {
    if (scrollable) {
      document.body.style.overflow = "scroll";
    } else {
      document.body.style.overflow = "hidden";
    }
  }

  function getLinkInputModalContent() {
    return (
      <>
        <h3 className="text-3xl font-bold">
          Add Link
        </h3>
        <div>
          <input
            type="url"
            className={`linkInput ${isInvalidLinkInput && "invalidLink"}`}
            placeholder="https://interdependence.online/declaration"
            value={linkInput || ""}
            onInput={e => {
              setLinkInput((e.target.value) || "")
            }}
            onKeyPress={handleLinkInputEnter}
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
      </>
    );
  }

  const modalContext = {
    openContributionModal,
    openContributionId: contribution?.id,
    closeContributionModal,
    openLinkInputModal,
    closeLinkInputModal,
  };
  return (
    <ModalContext.Provider value={modalContext}>
      {children}
      <Modal
        isOpen={contributionModalOpen}
        onAfterOpen={() => null}
        className="modal"
        overlayClassName="overlay"
        onRequestClose={() => closeContributionModal()}
        shouldCloseOnOverlayClick={true}
      >
        {contribution && getContributionModalContent(contribution)}
      </Modal>
      <Modal
        isOpen={linkInputModalOpen}
        onAfterOpen={() => null}
        className="modal"
        overlayClassName="overlay"
        onRequestClose={() => closeLinkInputModal()}
        shouldCloseOnOverlayClick={true}
      >
        {editor && getLinkInputModalContent()}
      </Modal>
    </ModalContext.Provider>
  );
}
