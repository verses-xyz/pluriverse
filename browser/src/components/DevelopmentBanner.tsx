import "./DevelopmentBanner.css";

export function DevelopmentBanner() {
  return (
    <>
      <div className="banner">
        <p>
          This artifact is currently scheduled for release on February 9, and
          should not be shared publicly on social media.
        </p>
        <p>
          The text is undergoing a significant revision, mostly to acknowledge
          our positionality as a collective, as well as to add significant
          caveats, clarifications, and acknowledgements. If you'd like to see a
          tweet thread about this work with contextualization, please see this{" "}
          <a href="https://docs.google.com/document/d/1UpG7mOYExdWnk0XBwwWGaCoa5ITD-xo7qQDU5HquW04/edit">
            document.
          </a>{" "}
          If you'd like to view the draft in progress,{" "}
          <a href="https://docs.google.com/document/d/1a1FEBgIboRXBTVCpxal7QtS0kVltXN2KU9zDVMkqaC4/edit#">
            please see here
          </a>
        </p>
        <p>
          We ask early readers to go through the artifact, sign the artifact
          gaslessly with your wallet, and contribute example cards to our
          pattern seed set. We would also love for you to share this forward
          with 2-5 more people who you think might resonate with the spirit of
          this work. Thank you for being here, and for engaging with this work!"
        </p>
      </div>
    </>
  );
}
