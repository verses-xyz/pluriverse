import React, { useState } from "react";
import Modal from "react-modal";

import { ButtonClass } from "src/types/styles";
import "./SampleModal.css";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  responseLength: number | undefined;
  setResponseLength: (value: number) => void;
  placeholder?: string;
}

Modal.setAppElement("#root");

export function SampleModal({}: Props) {
  const [displayLinkModal, setDisplayLinkModal] = useState<boolean>(false);

  const openModal = () => {
    setDisplayLinkModal(true);
    toggleBackgroundScrollingOnModal(false);
  };

  const closeModal = () => {
    setDisplayLinkModal(false);
    toggleBackgroundScrollingOnModal(true);
  };

  const toggleBackgroundScrollingOnModal = (scrollable: boolean) => {
    if (scrollable) {
      document.body.style.overflow = "scroll";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <Modal
        isOpen={displayLinkModal}
        onAfterOpen={() => null}
        className="modal"
        overlayClassName="overlay"
        onRequestClose={() => closeModal()}
        shouldCloseOnOverlayClick={true}
      ></Modal>
    </>
  );
}
