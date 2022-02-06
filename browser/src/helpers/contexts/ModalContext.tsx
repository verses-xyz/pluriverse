import React, { useState } from "react";
import { ContributionCard } from "src/components/ContributionCard";
import { Contribution } from "src/types/common/server-api";
import Modal from "react-modal";
import dayjs from "dayjs";

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
}

export const ModalContext = React.createContext<ModalContextInfo>({
  openContributionModal: () => {},
  openContributionId: undefined,
  closeContributionModal: () => {},
});

export function ModalProvider({ children }) {
  const [contributionModalOpen, setContributionModalOpen] =
    useState<boolean>(false);
  const [contribution, setContribution] = useState<Contribution | undefined>(
    undefined
  );
  const [prevUrl, setPrevUrl] = useState<string | undefined>(undefined);

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

  // TODO: reset to old link, need to take that in too in openContributionModal and store in state.
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
        <h2 className="font-bold text-3xl mb-4">
          Pluriverse Contribution #{highlightedContribution.id}
        </h2>
        <p className="pt-0 my-2">
          On{" "}
          {getMinuteTimeOfDayDateDisplay(
            dayjs(highlightedContribution.createdAt, { utc: true })
          )}
          , <b>{getDisplayForAuthor(highlightedContribution.author)}</b>{" "}
          contributed:
        </p>
        <ContributionCard
          contribution={highlightedContribution}
          full
          renderCanvas
          className={`mx-auto `}
        />
        {/* TODO: insert copy link and other actions */}
      </div>
    );
  }

  const modalContext = {
    openContributionModal,
    openContributionId: contribution?.id,
    closeContributionModal,
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
    </ModalContext.Provider>
  );
}
