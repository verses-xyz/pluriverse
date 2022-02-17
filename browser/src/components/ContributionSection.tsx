import "./ContributionSection.css";
import { useCallback, useContext, useState } from "react";
import { descriptionText } from "../classNameConstants";
import {
  Author,
  Contribution,
  Pattern,
  PatternToDisplay,
  Prompt,
  TweetTemplate,
} from "../types/common/server-api";
import { Dropdown, DropdownItem } from "./core/Dropdown";
import { addContribution, addUser, verifyTwitter } from "src/helpers/api";
import { AutoGrowInput } from "./core/AutoGrowInput";
import React from "react";
import { ButtonClass } from "src/types/styles";
import { ConnectWalletButton } from "./core/WalletButton";
import {
  ContributionCard,
  CopyLink,
  getFullContributionResponse,
} from "./ContributionCard";
import { getUser } from "src/helpers/api";
import { Link } from "react-router-dom";
import {
  getDisplayForAuthor,
  getMinuteTimeOfDayDateDisplay,
} from "./SignatureContent";
import { LoadingIndicator } from "./core/LoadingIndicator";
import { Checkmark } from "./core/Checkmark";
import ContributionsCarousel from "./ContributionsCarousel";
import { SignaturesContext } from "src/pages/Main";
import { ContributionsContext } from "src/helpers/contexts/ContributionsContext";
import { getArweaveLink, getContributionLink } from "src/helpers/contributions";
import { UserContext } from "src/helpers/user";
import { AsyncButton } from "./core/AsyncButton";
import dayjs from "dayjs";
import { ArweaveContext } from "src/helpers/contexts/ArweaveContext";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";

enum Page {
  TermsOfUse = "TermsOfUse",
  TwitterVerify = "TwitterVerify",
  Contribute = "Contribute",
  Share = "Share",
}

const PageNames: { [key in Page]: string } = {
  [Page.TermsOfUse]: "Signing",
  [Page.TwitterVerify]: "Verification",
  [Page.Contribute]: "Contribution",
  [Page.Share]: "Sharing",
};

function getAgreementToSign(
  isDisagreeing: boolean,
  transactionId: string
): string {
  const date = getMinuteTimeOfDayDateDisplay(dayjs());
  const PluriverseAgreement = `I have read and agree to the principles of the pluriverse, and I acknowledge that the entire responsibility / liability as to the realization of the pluriverse lies with all of us.

I want to help build the pluriverse together.

I am signing the document on ${date}, which lives on the permaweb on Arweave tx:${transactionId}`;
  const PluriverseDissent = `I have read and understand the pluriverse, but disagree. Plural worlds are made possible when each of us consistently prepares space for disagreement and dissent. 

This considered refusal is a signed gift which guarantees that I will continue to attend to reality as I see it, while acknowledging that even disobedience is a kind of participation. I will use my divergent perspective to inspire curious and creative work and strive to keep surprising others with courageous choices.

I am signing the document on ${date}, which lives on the permaweb on Arweave tx:${transactionId}`;

  return isDisagreeing ? PluriverseDissent : PluriverseAgreement;
}

const ResponseCharacterLimit = 900;
export const Placeholder = "...";
export const replaceJSX = (
  str: string,
  replacement: { [x: string]: any; pattern?: JSX.Element },
  {
    includePlaceholder = true,
    ignoreCase = false,
  }: { includePlaceholder?: boolean; ignoreCase?: boolean } = {}
): React.ReactNode => {
  const result: any[] = [];
  const keys = Object.keys(replacement);
  const getRegExp = () => {
    const regexp: any[] = [];
    keys.forEach((key) => regexp.push(includePlaceholder ? `{${key}}` : key));
    return new RegExp(regexp.join("|"), ignoreCase ? "ig" : "g");
  };
  str.split(getRegExp()).forEach((item, i) => {
    result.push(
      item,
      <React.Fragment key={i}>{replacement[keys[i]]}</React.Fragment>
    );
  });
  return result;
};

export const replaceAllJSX = (
  str: string,
  replacementStr: string,
  pattern?: JSX.Element,
  {
    includePlaceholder = true,
    ignoreCase = false,
  }: { includePlaceholder?: boolean; ignoreCase?: boolean } = {}
): React.ReactNode => {
  const result: any[] = [];
  const getRegExp = () => {
    return new RegExp(
      includePlaceholder ? `{${replacementStr}}` : replacementStr,
      ignoreCase ? "ig" : "g"
    );
  };
  const results = str.split(getRegExp());
  if (results.length === 1) {
    return results[0];
  }
  results.forEach((item, i) => {
    if (i === results.length - 1) {
      result.push(item);
    } else {
      result.push(item, <React.Fragment key={i}>{pattern}</React.Fragment>);
    }
  });
  return result;
};

// TODO: need to handle replacing with JSX but also providing match...
// export const replaceJSXWithMatch = (
//   str: string,
//   replacementStr: string,
//   pattern: (match: string) => JSX.Element,
//   {
//     includePlaceholder = true,
//     ignoreCase = false,
//   }: { includePlaceholder?: boolean; ignoreCase?: boolean } = {}
// ): React.ReactNode => {
//   const result: any[] = [];
//   const getRegExp = () => {
//     return new RegExp(
//       includePlaceholder ? `{${replacementStr}}` : replacementStr,
//       ignoreCase ? "i" : ""
//     );
//   };
//   const SpecialMatchDelimeterStart = "{{{{";
//   const SpecialMatchDelimeterEnd = "}}}}";
//   str.replaceAll(
//     getRegExp(),
//     (match) =>
//       `${SpecialMatchDelimeterStart}${pattern(
//         match
//       )}${SpecialMatchDelimeterEnd}`
//   );

//   const getDelimetedRegExp = () => {
//     const mainRegex = includePlaceholder
//       ? `{${replacementStr}}`
//       : replacementStr;
//     return new RegExp(
//       SpecialMatchDelimeterStart + mainRegex + SpecialMatchDelimeterEnd,
//       ignoreCase ? "i" : ""
//     );
//   };

//   str.split(getDelimetedRegExp()).forEach((item, i) => {
//     result.push(
//       item,
//       <React.Fragment key={i}>{replacement[keys[i]]}</React.Fragment>
//     );
//   });
//   return result;
// };

export const PromptDescriptions: Record<Prompt, string> = {
  [Prompt.LooksLike]: `{${Placeholder}} looks like`,
  [Prompt.WeNeed]: `We need {${Placeholder}} because`,
  [Prompt.Example]: `An example of {${Placeholder}} is`,
  [Prompt.FreeForm]: ``,
};

const PromptDescriptionsToDisplay: Record<Prompt, string> = Object.entries(
  PromptDescriptions
).reduce<Record<Prompt, string>>((acc, [prompt, placeholder]) => {
  switch (prompt) {
    case Prompt.FreeForm:
      acc[prompt] = Placeholder + " (free form)";
      break;

    case Prompt.LooksLike:
    case Prompt.WeNeed:
    case Prompt.Example:
      acc[prompt] = placeholder.replaceAll(/\{|\}/g, "");
      break;
  }

  return acc;
}, {} as Record<Prompt, string>);

function getTweetIntentLink(text: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURI(text)}`;
}

function PreviewCard({
  author,
  response,
  prompt,
  pattern,
}: {
  author: Author;
  response?: string;
  prompt: Prompt;
  pattern: Pattern;
}) {
  const contribution: Contribution = {
    author,
    response: response || "...",
    prompt,
    pattern,
    createdAt: new Date(),
  };
  return (
    <ContributionCard
      contribution={contribution}
      className={`preview-card !w-auto mx-auto md:ml-auto md:!w-full`}
    />
  );
}

interface TermsOfUseProps {
  user?: Author;
  handleErr(err: Error): void;
  onSubmitWallet({
    name,
    twitterUsername,
    isDisagreeing,
  }?: {
    name?: string;
    twitterUsername?: string;
    isDisagreeing?: boolean;
  }): Promise<void>;
  onSuccess(): void;
  onContinue(): void;
  nextPage?: Page;
}

function getUserLabel(user: Author, text: string) {
  return (
    <div className="ml-auto">
      {text} <b>{getDisplayForAuthor(user, true, true)}</b>
    </div>
  );
}

function TermsOfUse({
  user,
  onSubmitWallet,
  handleErr,
  onContinue,
  onSuccess,
  nextPage,
}: TermsOfUseProps) {
  const [name, setName] = useState<string | undefined>(undefined);
  const { currentUserWalletAddress } = useContext(UserContext);
  const { latestEssayInfo } = useContext(ArweaveContext);
  const { version, transactionId = "" } = latestEssayInfo || {};
  const arweaveDocLink = transactionId ? getArweaveLink(transactionId) : "";

  return (
    <div className="terms">
      <div className="flex mb-6">
        <h2 className="text-3xl font-bold">Terms of Support</h2>
        {(user || currentUserWalletAddress) &&
          getUserLabel(
            user || { walletId: currentUserWalletAddress },
            "signing as"
          )}
      </div>
      <p className="text-xl">
        Please read the above essay ("
        <b>essay</b>") and patterns ("
        <b>patterns</b>") carefully. Your signature is a recognition of the
        ethic of the pluriverse, a belief in the potential of pluriversality,
        and an acknowledgement that the responsibility as to the realization of
        an evolving digital pluriverse lies with all of us.
      </p>
      {latestEssayInfo && (
        <p className="text-xl">
          Your signature will be associated with{" "}
          <a href={arweaveDocLink}>version {version}</a> of the essay. The
          patterns are manually input in the code and remain open and evolving.
        </p>
      )}
      <p className="metaText">
        <b>
          There is not and will never be a financial token associated with
          signing or contributing to this artifact.
        </b>
      </p>
      <p className="metaText">
        To sign, you need a compatible web3 wallet. Need help? Check out this{" "}
        <a
          target="_blank"
          href="https://scribehow.com/shared/Sign_and_contribute_to_A_Pattern_Language_for_the_Pluriverse__8hyPAlzVR6-K2_AXEog6-w"
        >
          guide
        </a>
        . If you would prefer not to, you can instead submit a signature via{" "}
        <a href="https://forms.gle/2sUAMmQ9amQo8du4A">this form</a>.
      </p>
      <hr />
      <div className="text-center">
        <p className="text-xl py-1">
          <b>
            "I want to help build the <b className="shimmer">pluriverse</b>{" "}
            together"
          </b>
        </p>
      </div>

      {/* TODO: show the signature arweave link */}
      <div className="actionsContainer mb-4">
        {user?.signature ? (
          <button className={ButtonClass("wide")} onClick={onContinue}>
            Continue{nextPage && " to " + PageNames[nextPage]}
          </button>
        ) : currentUserWalletAddress ? (
          <div className="text-center w-full">
            <div className="mb-8">
              <label className="text-lg pr-2">Your name: </label>
              <input
                value={name}
                onChange={(evt) => setName(evt.target.value)}
                placeholder="verses"
                maxLength={60}
              />
            </div>
            <AsyncButton
              onSubmit={() => onSubmitWallet({ name })}
              onError={handleErr}
              className="glass-button-cta"
            >
              Sign
            </AsyncButton>
          </div>
        ) : (
          <ConnectWalletButton
            onSubmit={onSuccess}
            onError={handleErr}
            className={"!w-full"}
          >
            Connect to Sign
          </ConnectWalletButton>
        )}
      </div>
    </div>
  );
}

export function ContributionSection() {
  const [page, setPage] = useState(Page.TermsOfUse);
  const {
    currentUser,
    setCurrentUser,
    signAndValidate,
    currentUserWalletAddress,
  } = useContext(UserContext);
  const { latestEssayInfo } = useContext(ArweaveContext);
  const { version, transactionId = "" } = latestEssayInfo || {};
  const { fetchSignatures } = useContext(SignaturesContext);
  const { fetchContribution, contributions } = useContext(ContributionsContext);

  // TODO: add unmount effect to have "alert unsaved changes" if response is filled in and on contribution page

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(
    Prompt.LooksLike
  );
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(
    Pattern.Pluriverse
  );
  const [twitterUsername, setTwitterUsername] = useState<string | undefined>(
    undefined
  );
  const [response, setResponse] = useState<string | undefined>(undefined);

  const PromptItems: DropdownItem[] = Object.keys(Prompt).map((promptKey) => ({
    name: PromptDescriptions[Prompt[promptKey as keyof typeof Prompt]],
    displayName: PromptDescriptionsToDisplay[promptKey as keyof typeof Prompt],
    onClick: () => setSelectedPrompt(promptKey as unknown as Prompt),
  }));
  const PatternItems: DropdownItem[] = Object.keys(Pattern).map(
    (patternKey) => ({
      name: Pattern[patternKey as keyof typeof Pattern] as string,
      displayName: PatternToDisplay[patternKey as keyof typeof Pattern],
      onClick: () => setSelectedPattern(patternKey as Pattern),
    })
  );

  const promptSelect = (
    <label className="block">
      <p className="text-xl">Prompt</p>
      <Dropdown
        items={PromptItems}
        defaultOption="Select a prompt..."
        selectedItemName={
          selectedPrompt
            ? PromptDescriptionsToDisplay[selectedPrompt].replace(
                "...",
                PatternToDisplay[selectedPattern]
              )
            : undefined
        }
        className="patternSelect w-full"
      />
    </label>
  );
  const patternSelect = (
    <label className="block">
      <p className="text-xl pt-0">Pattern</p>
      <Dropdown
        items={PatternItems}
        selectedItemName={selectedPattern && PatternToDisplay[selectedPattern]}
        className="patternSelect w-full"
      />
    </label>
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

  const [error, setError] = useState<string | undefined>();
  const handleErr = (err: Error) => {
    setError(err.message);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<
    Contribution | undefined
  >(undefined);

  async function updateContribution(id: number) {
    const contribution = await fetchContribution(id);
    setSelectedContribution(contribution);
  }

  async function onSaveContribution() {
    if (!selectedPrompt || !selectedPattern || !response) {
      return;
    }

    setIsLoading(true);
    try {
      await signAndValidate(
        getFullContributionResponse({
          response,
          prompt: selectedPrompt,
          pattern: selectedPattern,
        } as any)
      );
      const newContributionId = await addContribution({
        prompt: selectedPrompt,
        pattern: selectedPattern,
        response,
        walletId: currentUser!.walletId,
      });
      // TODO: eliminate this and just return th actual contribution data with the response above.
      await updateContribution(newContributionId);
      setResponse(undefined);
      setPage(Page.Share);
      setError(undefined);
    } catch (err) {
      handleErr(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  // TODO: this should be able to use the wallet address dervied
  // from context.
  async function onSubmitWallet({
    name,
    isDisagreeing = false,
  }: {
    name?: string;
    isDisagreeing?: boolean;
  } = {}) {
    if (!currentUserWalletAddress) {
      throw new Error("Submitting signature without connected wallet.");
    }

    // Validate user
    let userToUpdate: Author | undefined = currentUser;
    if (!userToUpdate) {
      userToUpdate = await getUser({
        id: currentUserWalletAddress,
      });
    }
    // TODO: upsert user if the data does not match.
    let signature: string | undefined = userToUpdate?.signature;

    if (!userToUpdate) {
      signature = await signAndValidate(
        getAgreementToSign(isDisagreeing, transactionId)
      );
      // add user after successful
      userToUpdate = await addUser({
        walletId: currentUserWalletAddress,
        name,
        signature,
        essayTransactionId: transactionId,
        disagrees: isDisagreeing,
      });
    }

    // finish
    setError(undefined);
    setCurrentUser(userToUpdate);
    navigateFromTerms(userToUpdate);
    // trigger signatures to refetch
    fetchSignatures(userToUpdate);
  }

  const navigateFromTerms = useCallback(
    (user: Author | undefined = currentUser) => {
      // if twitter username is populated and not verified, redirect to verify flow.
      const nextPage: Page = getNextPage();
      setPage(nextPage);
    },
    [currentUser]
  );

  function onClickTweetProof() {
    const tweetText = `${TweetTemplate}${currentUser!.signature}`;
    window.open(getTweetIntentLink(tweetText), "_blank");
  }

  function isResponseValid() {
    if (!response || !response.trim().length) {
      return false;
    }

    return (
      selectedPrompt !== Prompt.FreeForm ||
      response
        .toLocaleLowerCase()
        .includes(PatternToDisplay[selectedPattern].toLocaleLowerCase())
    );
  }

  async function onClickVerifyTwitter() {
    setIsLoading(true);
    try {
      if (!currentUser?.twitterVerified) {
        if (!twitterUsername) {
          throw new Error("Twitter username is not set.");
        }

        await verifyTwitter({
          walletId: currentUser!.walletId,
          twitterUsername,
          signature: currentUser!.signature,
        });
        setCurrentUser({
          ...currentUser!,
          twitterUsername,
          twitterVerified: true,
        });
      }
      setError(undefined);
      // switch page after showing success
      setTimeout(() => {
        setPage(Page.Contribute);
      }, 750);
    } catch (err) {
      handleErr(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  function renderPage() {
    switch (page) {
      case Page.TermsOfUse:
        return (
          <TermsOfUse
            user={currentUser}
            onSubmitWallet={onSubmitWallet}
            handleErr={handleErr}
            onContinue={() => navigateFromTerms()}
            onSuccess={() => setError(undefined)}
            nextPage={getNextPage()}
          />
        );

      case Page.TwitterVerify:
        return (
          <div>
            <div className="flex mb-6">
              <h2 className="text-2xl font-bold">Terms of Verification</h2>
              {currentUser && getUserLabel(currentUser, "verifying for")}
            </div>
            <div className="verifyContainer ">
              <p className="text-lg py-1">
                <em>(this is optional)</em>
              </p>
              <ol className="list-decimal list-inside	">
                <div className="flex flex-col md:grid twitterSteps">
                  <p className="pt-0 text-xl">
                    <li>
                      <span>
                        Fill in your Twitter username. This will help us find
                        your verification tweet!
                      </span>
                    </li>
                  </p>
                  <div className="ml-auto pl-1">
                    <input
                      value={twitterUsername}
                      onChange={(evt) =>
                        setTwitterUsername(evt.target.value.replaceAll("@", ""))
                      }
                      placeholder="verses_xyz"
                      maxLength={15}
                      style={{ maxWidth: "170px" }}
                    />
                  </div>
                  <p className="pt-0 mt-2 text-xl">
                    <li>
                      <span>
                        Tweet a message to prove that you control your wallet
                        address. Keep the "sig:0x123..." at the end, but feel
                        free to add your own spin on the message that comes
                        before.
                      </span>
                    </li>
                  </p>
                  <div className="ml-auto mt-3">
                    <button
                      // className="twitter-share-button"
                      className={`${ButtonClass()}`}
                      onClick={onClickTweetProof}
                    >
                      Tweet proof
                    </button>
                  </div>
                  <p className="pt-0 mt-2 text-xl">
                    <li>
                      <span>
                        Press the Verify button. If successful, your twitter
                        handle and contribution will be linked.
                      </span>
                    </li>
                  </p>
                  <div className="ml-auto mt-3">
                    <button
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                      }}
                      className={`${ButtonClass()}`}
                      onClick={onClickVerifyTwitter}
                      disabled={isLoading || !twitterUsername}
                    >
                      {isLoading ? (
                        <>
                          Verifying{" "}
                          <LoadingIndicator style={{ marginLeft: "6px" }} />
                        </>
                      ) : currentUser?.twitterVerified ? (
                        <>
                          Verified! <Checkmark />
                        </>
                      ) : (
                        "Verify twitter"
                      )}
                    </button>
                  </div>
                </div>
              </ol>
            </div>
          </div>
        );

      case Page.Contribute:
        return (
          <div>
            <div className="signContainer">
              <div className="flex">
                <h2 className="text-2xl font-bold">Terms of Contribution</h2>
                {currentUser && getUserLabel(currentUser, "contributing as")}
              </div>
              <p className="text-xl py-0">
                Please select a prompt and contribute to the pattern language
                for the <b className="shimmer">pluriverse</b>. We are looking
                for relevant poems, technologies, institutions, historical
                parallels—pieces that you think will contribute to building a
                meaningful foundation of patterns.
              </p>
              <p className="text-xl py-0">
                We've provided some sentence starters to help get you going;
                otherwise, if you use the free-form option, you must include the
                chosen pattern in your response. Examples of others'
                contributions to the pattern you've chosen are displayed below.
              </p>
              <div className="md:grid contributionContainer flex flex-col items-stretch justify-center">
                <div className="selects">
                  {selectedPrompt && (
                    <>
                      <div className="responseContainer w-full">
                        {patternSelect}
                        {promptSelect}
                        <label>
                          <div className="flex">
                            <p className="text-xl">Contribution</p>
                            <span className="flex-grow" />
                            <p className="text-lg opacity-50">
                              {response?.length || 0} / {ResponseCharacterLimit}
                            </p>
                          </div>
                          <AutoGrowInput
                            value={response}
                            onChange={setResponse}
                            className="responseInput"
                            extraProps={{
                              // placeholder: "free gardens",
                              maxLength: ResponseCharacterLimit,
                            }}
                          />
                        </label>
                      </div>
                    </>
                  )}
                </div>
                <PreviewCard
                  author={currentUser!}
                  pattern={selectedPattern}
                  response={response}
                  prompt={selectedPrompt}
                />
              </div>
              {/* TODO: fun loading animation */}
              {isLoading && (
                <div className="loadingContainer">
                  Creating Pluriverse... <LoadingIndicator />
                </div>
              )}
            </div>
          </div>
        );

      case Page.Share: {
        return (
          <div className="signContainer">
            <div className="flex ">
              <h2 className="text-2xl font-bold">Terms of Sharing</h2>
              {currentUser && getUserLabel(currentUser, "sharing from")}
            </div>
            <p className="text-xl">
              Thank you for contributing to the Pluriverse! Your contribution in
              all its glorious plurality is below:
            </p>
            <div className="flex items-center flex-col">
              <ContributionCard
                contribution={selectedContribution!}
                renderCanvas={true}
                className={`!w-auto mx-auto md:ml-auto md:!w-full`}
              />
              <p className={descriptionText}>
                <Link to="/contributions">Explore other contributions</Link>
              </p>
            </div>
          </div>
        );
      }

      default:
        throw Error("unreachable");
    }
  }

  function renderPageExtra() {
    switch (page) {
      case Page.Contribute: {
        const filteredContributions = contributions.filter(
          (c) => c.pattern === selectedPattern && c.prompt === selectedPrompt
        );
        return (
          <div className="contributionsPreview">
            <ContributionsCarousel contributions={filteredContributions} />
          </div>
        );
      }

      case Page.TermsOfUse:
      case Page.TwitterVerify:
      case Page.Share:
      default:
        return null;
    }
  }

  const maybeFilteredPages = Object.values(Page).filter(
    (p) =>
      !currentUser ||
      !currentUser.twitterUsername ||
      (currentUser &&
        currentUser.twitterUsername &&
        !currentUser.twitterVerified) ||
      p !== Page.TwitterVerify
  );

  function renderPageProgress() {
    return (
      <div className="pageProgressContainer mb-8">
        {maybeFilteredPages.map((p) => (
          <div
            key={p}
            className={`pageProgress ${
              page === p ? "selectedPageProgress" : ""
            }`}
          />
        ))}
      </div>
    );
  }

  function getPreviousPage() {
    const pageIndex = maybeFilteredPages.indexOf(page);
    return pageIndex - 1 >= 0
      ? (maybeFilteredPages[pageIndex - 1] as Page)
      : undefined;
  }

  function getNextPage() {
    const pageIndex = maybeFilteredPages.indexOf(page);
    return pageIndex + 1 < maybeFilteredPages.length
      ? (maybeFilteredPages[pageIndex + 1] as Page)
      : undefined;
  }

  function renderPageNavigation() {
    if (page === Page.TermsOfUse) {
      return;
    }

    const previousPage = getPreviousPage();
    const nextPage = page === Page.Contribute ? undefined : getNextPage();
    let contributionLink;
    let contributionShareText: string | undefined;
    if (selectedContribution) {
      contributionLink = getContributionLink(selectedContribution!);
      contributionShareText = `My contribution to the pluriverse, a world where many worlds may fit\n\n${contributionLink}`;
    }

    return (
      (previousPage || nextPage) && (
        <div className="flex flex-col md:flex-row mt-8 contributionNavigation mb-4">
          {previousPage && (
            <button
              className={`${ButtonClass()} md:mr-auto bg-gray-600 rounded-full inline-flex gap-1 items-center`}
              onClick={() => setPage(previousPage)}
            >
              <MdArrowBack /> {PageNames[previousPage]}
            </button>
          )}
          {nextPage && (
            <button
              className={`${ButtonClass()} md:ml-auto bg-gray-600 rounded-full inline-flex gap-1 items-center mt-2 md:mt-0`}
              onClick={() => setPage(nextPage)}
            >
              {PageNames[nextPage]} <MdArrowForward />
            </button>
          )}
          {page === Page.Contribute && (
            <button
              onClick={onSaveContribution}
              className={ButtonClass("glass-button-cta mt-2 md:mt-0")}
              disabled={!isResponseValid()}
            >
              Add to Pluriverse
            </button>
          )}
          {page === Page.Share && contributionLink && contributionShareText && (
            <button
              // className="twitter-share-button"
              className={ButtonClass("glass-button-cta mt-2 md:mt-0")}
              onClick={() => {
                window.open(
                  getTweetIntentLink(contributionShareText),
                  "_blank"
                );
              }}
            >
              Share on Twitter
            </button>
          )}
        </div>
      )
    );
  }

  return (
    <>
      <div id="contribute" className="contributionSection text-base">
        {renderPageProgress()}
        {renderPage()}
        {error && (
          <div className="errorContainer text-red-500 flex items-center gap-1 justify-center">
            <BiErrorCircle /> {error}
          </div>
        )}
        {renderPageNavigation()}
      </div>
      {renderPageExtra()}
    </>
  );
}
