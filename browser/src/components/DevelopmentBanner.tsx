import "./DevelopmentBanner.css";

export function DevelopmentBanner() {
  return (
    <>
      <div className="bannerHolder"></div>
      <div className="banner">
        <p>
          If this has been shared with you, this link has been shared with you
          since we value your feedback and participation with this artifact. For
          more context on the work, please see our{" "}
          <a href="https://docs.google.com/document/d/1Tes7GTDx_cQNlTVwE6_jMFuLN1N3SQUzrA3dypYv3Nw/edit">
            running working document
          </a>
          . We are currently collecting signatures on the artifact, and{" "}
          <a href="https://docs.google.com/document/d/1cWbH_yCwsRHyt9pFgKwHujOylje9rZq-KbZwa1CAwEo/edit">
            workshopping contributions
          </a>
          with organizations to make sure that the pattern language is seeded in
          a high quality manner.
          <br />— the <a href="https://verses.xyz">verses</a> pluriverse team
        </p>
      </div>
    </>
  );
}
