import "./DevelopmentBanner.css";

export function DevelopmentBanner() {
  return (
    <>
      <div className="banner">
        <p>
          This artifact is currently a work in progress and should not be shared
          publicly on social media. If this link has been shared with you, we
          would highly treasure your feedback and participation with this
          artifact.
        </p>
        <p>
          For more context on the artifact, to leave feedback, and/or to
          schedule a call with one of the core stewards to see how you might
          contribute, please see our{" "}
          <a href="https://docs.google.com/document/d/1Tes7GTDx_cQNlTVwE6_jMFuLN1N3SQUzrA3dypYv3Nw/edit">
            running working document
          </a>
          , and/or join the conversation on our{" "}
          <a href="https://t.me/+3nysH7Ja6pszZWI5">Telegram</a>. We are happy to
          help workshop contributions with individuals who'd like to comment
          about a particular organization (e.g. about the place they work).
        </p>
        <p>
          We ask early readers to go through the artifact, and sign the artifact
          gaslessly with your wallet, and for you to share this forward with 2-5
          more people who you think might resonate with the spirit of this work.
        </p>
      </div>
    </>
  );
}
