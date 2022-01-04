import "./ContributionSection.css";
import { useEffect, useState } from "react";
import { descriptionText } from "../classNameConstants";
import {
  Contribution,
  Pattern,
  Prompt,
} from "../types/common/server-api/index";
import { Dropdown, DropdownItem } from "./core/Dropdown";
import { addContribution, getContribution } from "src/helpers/api";
import { AutoGrowInput } from "./core/AutoGrowInput";
import React from "react";
import { ButtonClass } from "src/types/styles";
import { ConnectWalletButton } from "./core/WalletButton";
import { getWalletAddress, signAndValidate } from "src/helpers/wallet";
import { ContributionCard } from "./ContributionCard";

enum Page {
  TermsOfUse,
  Sign,
  Share,
}

export const PluriverseAgreement = "I agree to...";
const Placeholder = "________";
const replaceJSX = (
  str: string,
  replacement: { [x: string]: any; pattern?: JSX.Element }
): React.ReactNode => {
  const result: any[] = [];
  const keys = Object.keys(replacement);
  const getRegExp = () => {
    const regexp: any[] = [];
    keys.forEach((key) => regexp.push(`{${key}}`));
    return new RegExp(regexp.join("|"));
  };
  str.split(getRegExp()).forEach((item, i) => {
    result.push(item, replacement[keys[i]]);
  });
  return result;
};

const PromptDescriptions: Record<Prompt, string> = {
  [Prompt.LooksLike]: `{${Placeholder}} looks like`,
  [Prompt.WeNeed]: `We need {${Placeholder}} because`,
  [Prompt.Example]: `An example of {${Placeholder}} is`,
};

// TODO: fill in
function TermsOfUse() {
  const [page, setPage] = useState(Page.TermsOfUse);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(
    Prompt.LooksLike
  );
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(
    Pattern.Pluriverse
  );
  const [response, setResponse] = useState<string | undefined>(undefined);
  const [walletAddress, setWalletAddress] = useState<string | undefined>();

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      className="patternSelect"
    />
  );

  let promptStarter: React.ReactNode = "";
  let promptStarterUneditable = "";
  if (selectedPrompt) {
    promptStarter = PromptDescriptions[selectedPrompt];
    promptStarterUneditable = PromptDescriptions[selectedPrompt];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    promptStarter = replaceJSX(promptStarter, {
      [Placeholder]: patternSelect,
    });
    promptStarterUneditable = promptStarterUneditable.replace(
      `{${Placeholder}}`,
      selectedPattern
    );
  }

  const [error, setError] = useState<string | undefined>(undefined);
  const handleErr = (err: Error) => {
    setError(err.message);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<
    Contribution | undefined
  >(undefined);

  async function fetchContribution(id: number) {
    const contribution = await getContribution({ id });
    setSelectedContribution(contribution);
  }

  async function onSaveContribution() {
    if (!selectedPrompt || !selectedPattern || !response) {
      return;
    }

    setIsLoading(true);
    try {
      await signAndValidate(response);
      const newContributionId = await addContribution({
        prompt: selectedPrompt,
        pattern: selectedPattern,
        response,
        walletId: walletAddress!,
      });
      // TODO: eliminate this and just return th actual contribution data with the response above.
      await fetchContribution(newContributionId);
      setPage(Page.Share);
      setError(undefined);
    } catch (err) {
      handleErr(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  function renderPreviewCard({
    walletAddress,
    response,
    prompt,
    pattern,
  }: {
    walletAddress?: string;
    response?: string;
    prompt: Prompt;
    pattern: Pattern;
  }) {
    const formattedResponse = `${promptStarterUneditable} ${response || "..."}`;

    const contribution: Contribution = {
      author: { walletId: walletAddress || "...", twitterVerified: false },
      response: formattedResponse,
      prompt,
      pattern,
      createdAt: new Date().toLocaleDateString(),
    };
    return <ContributionCard contribution={contribution}></ContributionCard>;
  }

  function renderPage() {
    switch (page) {
      case Page.TermsOfUse:
        return (
          <div className="terms">
            <h2 className="text-3xl font-bold">TERMS OF USE AGREEMENT</h2>
            <p>
              PLEASE READ THE ABOVE ESSAY (“ESSAY”) CAREFULLY BEFORE{" "}
              <b className="shimmer">PLURIVERSE</b>-BUILDING. THIS IS NOT A
              LEGAL AGREEMENT BETWEEN YOU AND ANY ENTITY, BUT RATHER AN
              ACKNOWLEDGEMENT THAT YOU RECOGNIZE THE IMPORTANCE OF THE HISTORY,
              DECOLONIAL ORIGINS, AND DEFINITION OF THE TERM{" "}
              <b className="shimmer">“PLURIVERSE”</b> AND HOW ITS ETHIC MIGHT BE
              EXTENDED TO THE DIGITAL REALM. BY INVOKING THE TERM{" "}
              <b className="shimmer">PLURIVERSE</b>, YOU ARE RECOGNIZING THE
              PATH SET OUT BY THE ABOVE PATTERNS (“PATTERNS”) IN BRINGING THE
              DIGITAL <b className="shimmer">PLURIVERSE</b> ABOUT. YOU EXPRESSLY
              ACKNOWLEDGE THAT THE ENTIRE RESPONSIBILITY / LIABILITY AS TO THE
              REALIZATION OF THE PLURIVERSE LIES WITH US.
            </p>
            <div className="actionsContainer">
              <button className={ButtonClass("white")}>Disagree</button>
              <ConnectWalletButton
                onSubmit={(connectedWalletAddress) => {
                  setWalletAddress(connectedWalletAddress);
                  setError(undefined);
                  setPage(Page.Sign);
                }}
                onError={handleErr}
              >
                Agree (connect wallet)
              </ConnectWalletButton>
            </div>
          </div>
        );
      case Page.Sign:
        return (
          <div className="signContainer">
            <h2 className="text-4xl font-bold">Signing</h2>
            <p style={{ paddingTop: "0px" }}>
              <ul className="list-disc list-inside">
                <li>
                  I understand the history of the term{" "}
                  <b className="shimmer">pluriverse</b> and how we intend to use
                  it moving forward
                </li>
                <li>
                  I understand how a <b className="shimmer">pluriversal</b>{" "}
                  world is different from our current world and how we get there
                  via the “Patterns.”
                </li>
                <li>
                  I want to help build the <b className="shimmer">pluriverse</b>{" "}
                  together
                </li>
              </ul>
            </p>
            <p>
              We've provided some sentence starters to get you going. Please
              select a prompt and contribute to the{" "}
              <b className="shimmer"> Pluriverse</b>.
            </p>
            <div className="contributionContainer">
              <div className="selects">
                {promptSelect}
                {selectedPrompt && (
                  <>
                    <div className="responseContainer">
                      {promptStarter}{" "}
                      {
                        <AutoGrowInput
                          value={response}
                          onChange={setResponse}
                          className="responseInput"
                          // TODO: make this populate an actual live preview from an example??
                          extraProps={{
                            placeholder: "free gardens",
                          }}
                        />
                      }
                    </div>
                    <p className={descriptionText}></p>
                  </>
                )}
                {/* TODO: add twitter username */}
              </div>
              {renderPreviewCard({
                walletAddress,
                pattern: selectedPattern,
                response,
                prompt: selectedPrompt,
              })}
            </div>

            <div className="actionsContainer">
              <button
                onClick={() => setPage(Page.TermsOfUse)}
                className={ButtonClass("white")}
              >
                Back
              </button>
              <button
                onClick={onSaveContribution}
                className={ButtonClass("blue")}
              >
                Add to Pluriverse
              </button>
            </div>
            {/* TODO: fun loading animation */}
            {isLoading && (
              <div className="loadingContainer">Creating Pluriverse...</div>
            )}
          </div>
        );

      case Page.Share:
        return (
          <div className="share">
            <h2 className="text-4xl font-bold">Share</h2>
            <p>
              Thank you for contributing to the Pluriverse! You can see your
              contribution below
            </p>
            {/* TODO: add verify twitter post */}
            <ContributionCard
              contribution={selectedContribution!}
            ></ContributionCard>
          </div>
        );

      default:
        throw Error("unreachable");
    }
  }

  return (
    <div className="termsOfUseContainer">
      {renderPage()}
      {error && (
        <div className="errorContainer text-red-500">Error: {error}</div>
      )}
    </div>
  );
}

export function ContributionSection() {
  return (
    <div className="contributionSection text-base">
      <TermsOfUse />
    </div>
  );
}
