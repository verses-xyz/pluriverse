import "./ContributionSection.css";
import { useState } from "react";
import { descriptionText } from "../classNameConstants";
import { ContributionMetadata, Pattern, Prompt, TraitType } from "../types";
import { Dropdown, DropdownItem } from "./core/Dropdown";
import { ipfs } from "../types/ipfs";
import { createBlobAnimation } from "../helpers/blobs";

enum Page {
  TermsOfUse,
  Sign,
  Share,
}

const ButtonClass =
  "hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
const Placeholder = "_____";

const PromptDescriptions: Record<Prompt, string> = {
  [Prompt.LooksLike]: `${Placeholder} looks like`,
  [Prompt.WeNeed]: `We need ${Placeholder} because`,
  [Prompt.Example]: `An example of ${Placeholder} is`,
};

// TODO: fill in
function TermsOfUse() {
  const [page, setPage] = useState(Page.TermsOfUse);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | undefined>(
    undefined
  );
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(
    Pattern.Pluriverse
  );
  const [response, setResponse] = useState<string | undefined>(undefined);

  const PromptItems: DropdownItem[] = Object.keys(Prompt).map((promptKey) => ({
    name: PromptDescriptions[Prompt[promptKey as keyof typeof Prompt]],
    onClick: () => setSelectedPrompt(promptKey as unknown as Prompt),
  }));
  const PatternItems: DropdownItem[] = Object.keys(Pattern).map(
    (patternKey) => ({
      name: Pattern[patternKey as keyof typeof Pattern] as string,
      onClick: () => setSelectedPattern(patternKey as Pattern),
    })
  );

  const promptSelect = (
    <Dropdown
      items={PromptItems}
      defaultOption="Select a prompt..."
      selectedItemName={
        selectedPrompt ? (PromptDescriptions[selectedPrompt] as any) : undefined
      }
    />
  );
  const patternSelect = (
    <Dropdown
      items={PatternItems}
      defaultOption="pluriverse"
      selectedItemName={
        selectedPattern &&
        (Pattern[selectedPattern as keyof typeof Pattern] as string)
      }
    />
  );

  let promptStarter = "";
  if (selectedPrompt) {
    promptStarter = PromptDescriptions[selectedPrompt];
    if (selectedPattern) {
      promptStarter = promptStarter.replace(Placeholder, selectedPattern);
    }
  }

  async function onSaveContribution() {
    if (!selectedPrompt || !selectedPattern || !response) {
      return;
    }
    // use prompt, pattern, contribution to save to ipfs
    const animation = createBlobAnimation(
      selectedPrompt,
      selectedPattern,
      response
    );
    const { cid: animationCid, path: animationPath } = await ipfs.add(
      animation
    );
    console.log(animationCid);
    const animationUrl = `ipfs://${animationPath}`;
    // TODO: move to helper.
    const contributionMetadata: ContributionMetadata = {
      name: "Pluriverse",
      description: `_${response}_\n\nPluriverses are tokens representing contributions to the [Towards a Pluriverse essay](https://pluriverse.world).`,
      animation_url: animationUrl,
      external_url: "https://pluriverse.world",
      background_color: "#000000",
      attributes: [
        { trait_type: TraitType.Prompt, value: selectedPrompt },
        { trait_type: TraitType.Pattern, value: selectedPattern },
      ],
    };
    console.log(contributionMetadata);
    // await ipfs.add(contributionMetadata)
    // TODO: mint nft
  }

  function renderPage() {
    switch (page) {
      case Page.TermsOfUse:
        return (
          <div className="terms">
            <h1 className="text-3xl font-bold">TERMS OF USE AGREEMENT</h1>
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
            <div className="actionsContainer">
              <button className={`bg-white ${ButtonClass}`}>Disagree</button>
              <button
                className={`bg-blue-200 ${ButtonClass}`}
                onClick={() => setPage(Page.Sign)}
              >
                Agree
              </button>
            </div>
          </div>
        );
      case Page.Sign:
        return (
          <div className="">
            <ul className="list-disc list-inside">
              <li>
                I agree to using <em>pluriverse</em> appropriately
              </li>
              <li>I agree that we need a world with the pluriverse</li>
              <li>I agree...</li>
            </ul>
            <div className="selects">
              {promptSelect}
              {patternSelect}
            </div>
            {/* TODO: insert text area */}
            <div>
              {promptStarter}...
              <br />
              <textarea
                className="form-textarea mt-1 block w-full"
                placeholder="Enter your response to the prompt..."
                value={response}
                onChange={(evt) => setResponse(evt.target.value)}
              ></textarea>
            </div>
            <p className={descriptionText}></p>
            <div className="actionsContainer">
              <button
                onClick={() => setPage(Page.TermsOfUse)}
                className={`bg-white ${ButtonClass}`}
              >
                Back
              </button>
              <button
                onClick={onSaveContribution}
                className={`bg-blue ${ButtonClass}`}
              >
                Sign
              </button>
            </div>
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
    <div className="contributionSection text-base">
      <TermsOfUse />
    </div>
  );
}
