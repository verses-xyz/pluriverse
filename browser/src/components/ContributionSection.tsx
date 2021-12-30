import { useState } from "react";
import { Pattern } from "../types";
import { Dropdown } from "./core/Dropdown";

enum Page {
  TermsOfUse,
  Sign,
  Share,
}

const ButtonClass =
  "hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";

enum Prompt {
  IWant = "I want ...",
}

// TODO: fill in
function TermsOfUse() {
  const [page, setPage] = useState(Page.TermsOfUse);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | undefined>(
    undefined
  );
  const [selectedPattern, setSelectedPattern] = useState<Pattern | undefined>(
    undefined
  );

  const PromptItems = Object.keys(Prompt).map((promptKey) => ({
    name: Prompt[promptKey as keyof typeof Prompt],
    onClick: setSelectedPrompt(promptKey as Prompt),
  }));
  const PatternItems = Object.keys(Pattern).map((patternKey) => ({
    name: Pattern[patternKey as keyof typeof Pattern],
    onClick: setSelectedPattern(patternKey as Pattern),
  }));
  const promptSelect = <Dropdown items={PromptItems} />;
  const patternSelect = <Dropdown items={PatternItems} />;

  function onSaveContribution() {
    // use prompt, pattern, contribution to save to ipfs
    // mint nft
  }

  function renderPage() {
    switch (page) {
      case Page.TermsOfUse:
        return (
          <div className="terms">
            <h1>TERMS OF USE AGREEMENT</h1>
            <p>
              PLEASE READ THE ABOVE ESSAY (“ESSAY”) CAREFULLY BEFORE USING THE
              TERM PLURIVERSE-BUILDING. THIS IS NOT A LEGAL AGREEMENT BETWEEN
              YOU AND ANY ENTITY, BUT RATHER AN ACKNOWLEDGEMENT THAT YOU
              RECOGNIZE THE IMPORTANCE OF UNDERSTAND THE HISTORY AND DEFINITION
              OF THE TERM “PLURIVERSE” AND HOW ITS ETHIC MIGHT BE EXTENDED TO
              THE DIGITAL REALM. BY GROWING THE PLURIVERSEUSING THE TERM
              PLURIVERSE IN [?] CONTEXTS, YOU ARE AGREEING TO [BE / ACT IN
              ACCORDANCE WITH / HELP EVOLVE / OPERATIONALIZE THE PRINCIPLES SET
              FORTH IN THIS ESSAY]. YOU EXPRESSLY ACKNOWLEDGE THAT THE ENTIRE
              RESPONSIBILITY / LIABILITY RISK AS TO THE REALIZATION OF THE
              PLURIVERSE LIES WITH [YOU?].{" "}
            </p>
            <button className={`bg-white ${ButtonClass}`}>Agree</button>
            <button className={`bg-white ${ButtonClass}`}>Disagree</button>
          </div>
        );
      case Page.Sign:
        return (
          <div className="">
            <ul className="list-disc list-inside">
              <li>
                I agree to using <em>pluriverse</em> appropriately
              </li>
              <li>...</li>
            </ul>
            {promptSelect}
            {patternSelect}
            {/* TODO: insert text area */}
            <textarea />
            <button
              onClick={onSaveContribution}
              className={`bg-blue ${ButtonClass}`}
            >
              Sign
            </button>
          </div>
        );

      case Page.Share:
        throw Error("nye");

      default:
        throw Error("unreachable");
    }
  }

  return <div className="termsOfUseContainer">{renderPage()}</div>;
}

export function ContributionSection() {
  return (
    <div className="contributionSection">
      <h2 className="text-2xl font-bold">Contributions</h2>
      <TermsOfUse />
    </div>
  );
}
