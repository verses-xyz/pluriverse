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
export const Placeholder = "________";
export const replaceJSX = (
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
  return <ContributionCard contribution={contribution} />;
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
  onContinue(): void;
}

function getUserLabel(user: Author, text: string) {
  return (
    <div className="ml-auto">
      {text} <b>{getDisplayForAuthor(user, true)}</b>
    </div>
  );
}

function TermsOfUse({
  user,
  onSubmitWallet,
  handleErr,
  onContinue,
}: TermsOfUseProps) {
  const [name, setName] = useState<string | undefined>(undefined);
  const [twitterUsername, setTwitterUsername] = useState<string | undefined>(
    undefined
  );
  const { currentUserWalletAddress } = useContext(UserContext);
  const { latestEssayInfo } = useContext(ArweaveContext);
  const { version, transactionId = "" } = latestEssayInfo || {};
  const arweaveDocLink = transactionId ? getArweaveLink(transactionId) : "";

  async function onDisagree() {
    await onSubmitWallet({
      name,
      twitterUsername,
      isDisagreeing: true,
    });
  }

  return (
    <div className="terms">
      <div className="flex ">
        <h2 className="text-3xl font-bold">Terms of Support</h2>
        {(user || currentUserWalletAddress) &&
          getUserLabel(
            user || { walletId: currentUserWalletAddress },
            "signing as"
          )}
      </div>
      <p>
        Please read the above essay ("
        <b>essay</b>") and patterns ("
        <b>patterns</b>") carefully. To sign is to recognize the past, present,
        and future of the <b>pluriverse</b>, and its ethic, and an
        acknowledgement that the <b>responsibility</b> as to the realization of
        an evolving digital pluriverse <b>lies with all of us</b>.{" "}
      </p>
      {latestEssayInfo && (
        <p>
          Your signature will be associated with version {version} of the essay
          and stored on{" "}
          <a href={arweaveDocLink}>Arweave tx:{transactionId.slice(0, 20)}</a>.
        </p>
      )}
      <br />
      <hr />
      <p className="text-center">
        <b>
          "I want to help build the <b className="shimmer">pluriverse</b>{" "}
          together"
        </b>
      </p>
      {!user && currentUserWalletAddress && (
        <div className="inputs pt-2 flex-col gap-3 md:flex-row md:gap-6">
          <div>
            <label>
              <em>Name</em>
            </label>
            <input
              value={name}
              onChange={(evt) => setName(evt.target.value)}
              placeholder="verses"
              maxLength={60}
            />
          </div>
          <div>
            <label>
              <em>Twitter</em>
            </label>
            <input
              value={twitterUsername}
              onChange={(evt) =>
                setTwitterUsername(evt.target.value.replaceAll("@", ""))
              }
              placeholder="verses_xyz"
              maxLength={15}
            />
          </div>
        </div>
      )}

      <div className="actionsContainer">
        {user?.signature ? (
          <button className={ButtonClass()} onClick={onContinue}>
            Continue
          </button>
        ) : currentUserWalletAddress ? (
          <>
            <AsyncButton onSubmit={onDisagree} onError={handleErr}>
              Disagree
            </AsyncButton>
            <AsyncButton
              onSubmit={() => onSubmitWallet({ name, twitterUsername })}
              onError={handleErr}
            >
              Agree
            </AsyncButton>
          </>
        ) : (
          <ConnectWalletButton onError={handleErr}>Connect</ConnectWalletButton>
        )}
      </div>

      {/* TODO: fill in help guide */}
      <p className="metaText">
        To sign your agreement or dissent, you need a compatible web3 wallet.
        Need help? Check out this <a href="">guide</a>.
      </p>
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
  const { latestEssayTxId } = useContext(ArweaveContext);
  const { fetchSignatures } = useContext(SignaturesContext);
  const { fetchContribution, contributions } = useContext(ContributionsContext);

  // TODO: add unmount effect to have "alert unsaved changes" if response is filled in and on contribution page

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(
    Prompt.LooksLike
  );
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(
    Pattern.Pluriverse
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
    <Dropdown
      items={PromptItems}
      defaultOption="Select a prompt..."
      selectedItemName={
        selectedPrompt
          ? (PromptDescriptionsToDisplay[selectedPrompt] as any)
          : undefined
      }
      className="patternSelect"
    />
  );
  const patternSelect = (
    <Dropdown
      items={PatternItems}
      selectedItemName={selectedPattern && PatternToDisplay[selectedPattern]}
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
      // TODO: incoroprate this into the context so it updates everywhere
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
    twitterUsername,
    isDisagreeing = false,
  }: {
    name?: string;
    twitterUsername?: string;
    isDisagreeing?: boolean;
  } = {}) {
    if (!currentUserWalletAddress) {
      throw new Error("Submitting signature without connected wallet.");
    }

    console.log("connected wallet address: " + currentUserWalletAddress);
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
        getAgreementToSign(isDisagreeing, latestEssayTxId)
      );
      // add user after successful
      userToUpdate = await addUser({
        walletId: currentUserWalletAddress,
        name,
        twitterUsername,
        signature,
        // TODO: fill in with arweave essay ref.
        essayRef: "",
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
      let nextPage: Page;
      if (user && user.twitterUsername && !user.twitterVerified) {
        nextPage = Page.TwitterVerify;
      } else {
        nextPage = Page.Contribute;
      }
      setPage(nextPage);
    },
    [currentUser]
  );

  function onClickTweetProof() {
    const tweetText = `${TweetTemplate}${currentUser!.signature}`;
    window.open(getTweetIntentLink(tweetText), "_blank");
  }

  async function onClickVerifyTwitter() {
    setIsLoading(true);
    try {
      if (!currentUser?.twitterVerified) {
        await verifyTwitter({ walletId: currentUser!.walletId });
        setCurrentUser({ ...currentUser!, twitterVerified: true });
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
          />
        );

      case Page.TwitterVerify:
        return (
          <div>
            <div className="flex mb-6">
              <h2 className="text-3xl font-bold">Terms of Verification</h2>
              {currentUser && getUserLabel(currentUser, "verifying for")}
            </div>
            <div className="verifyContainer ">
              <p>
                <em>(this is optional)</em>
              </p>
              <ol className="list-decimal list-inside	">
                <div className="grid twitterSteps">
                  <p className="pt-0">
                    <li>
                      <span>
                        Tweet a message to prove that you control your wallet
                        address. Make sure to keep the "sig:0x123..." part at
                        the end, but feel free to add your own spin on the
                        message that comes before. Come back after to verify the
                        tweet.
                      </span>
                    </li>
                  </p>
                  <div className="ml-auto">
                    <button
                      // className="twitter-share-button"
                      className={`${ButtonClass()}`}
                      onClick={onClickTweetProof}
                    >
                      Tweet proof
                    </button>
                  </div>
                  <p className="pt-0 mt-4">
                    <li>
                      <span>
                        After your tweet is sent, press the Verify button. If
                        successful, your twitter handle and contribution will be
                        linked.
                      </span>
                    </li>
                  </p>
                  <div className="ml-auto">
                    <button
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                      }}
                      className={`${ButtonClass()}`}
                      onClick={onClickVerifyTwitter}
                      disabled={isLoading}
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
                <h2 className="text-3xl font-bold">Terms of Contribution</h2>
                {currentUser && getUserLabel(currentUser, "contributing as")}
              </div>
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
                        {promptStarter} <br />
                        {
                          <AutoGrowInput
                            value={response}
                            onChange={setResponse}
                            className="responseInput"
                            // TODO: make this populate an actual live preview from an example?? and shuffle?
                            extraProps={{
                              placeholder: "free gardens",
                              maxLength: ResponseCharacterLimit,
                            }}
                          />
                        }
                      </div>
                      <p className={descriptionText}>
                        {response?.length || 0} / {ResponseCharacterLimit}
                      </p>
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
              <div className="actionsContainer">
                <button
                  onClick={onSaveContribution}
                  className={ButtonClass("blue")}
                  disabled={!response}
                >
                  Add to Pluriverse
                </button>
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
        const contributionLink = getContributionLink(selectedContribution!);
        const contributionShareText = `My contribution to the pluriverse, a world where many worlds may fit\n\n${contributionLink}`;

        return (
          <div className="signContainer">
            <div className="flex ">
              <h2 className="text-3xl font-bold">Terms of Sharing</h2>
              {currentUser && getUserLabel(currentUser, "sharing from")}
            </div>
            <p>
              Thank you for contributing to the Pluriverse! Your contribution in
              all its glorious plurality is below:
            </p>
            {/* TODO: if not verified, add verify link */}
            <ContributionCard
              contribution={selectedContribution!}
              renderCanvas={true}
            ></ContributionCard>
            <p>
              You can share your specific contribution with others using this
              link: <a href={contributionLink}>{contributionLink}</a>
            </p>
            <br />
            <div className="flex gap-2">
              <button
                // className="twitter-share-button"
                className={ButtonClass()}
                onClick={() => {
                  window.open(
                    getTweetIntentLink(contributionShareText),
                    "_blank"
                  );
                }}
              >
                Share on Twitter
              </button>
              <button
                className={ButtonClass()}
                onClick={() => {
                  navigator.clipboard.writeText(contributionLink);
                }}
              >
                Copy Link
              </button>
            </div>
            <div>
              <button
                onClick={() => setPage(Page.Contribute)}
                className={ButtonClass("blue")}
              >
                Add more contributions
              </button>

              <p className={descriptionText}>
                or explore <Link to="/contributions">other contributions</Link>
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

  function renderPageProgress() {
    return (
      <div className="pageProgressContainer mb-8">
        {Object.values(Page).map((p) => (
          <div
            className={`pageProgress ${
              page === p ? "selectedPageProgress" : ""
            }`}
          />
        ))}
      </div>
    );
  }

  function getPreviousPage() {
    let pageIndex = Object.values(Page).indexOf(page);
    if (
      page === Page.Contribute &&
      (currentUser?.twitterVerified || !currentUser?.twitterUsername)
    ) {
      pageIndex--;
    }
    return pageIndex - 1 >= 0
      ? (Object.values(Page)[pageIndex - 1] as Page)
      : undefined;
  }

  function getNextPage() {
    const pageIndex = Object.values(Page).indexOf(page);
    return pageIndex + 1 < Object.keys(Page).length
      ? (Object.values(Page)[pageIndex + 1] as Page)
      : undefined;
  }

  function renderPageNavigation() {
    if (page === Page.TermsOfUse) {
      return;
    }

    const pageIndex = Object.values(Page).indexOf(page);
    const previousPage = getPreviousPage();
    const nextPage = page === Page.Contribute ? undefined : getNextPage();

    return (
      <div className="flex mt-8">
        {previousPage && (
          <button
            className={`${ButtonClass()} mr-auto bg-gray-600 rounded-full inline-flex gap-1 items-center`}
            onClick={() => setPage(previousPage)}
          >
            <MdArrowBack /> {PageNames[previousPage]}
          </button>
        )}
        {nextPage && (
          <button
            className={`${ButtonClass()} ml-auto bg-gray-600 rounded-full inline-flex gap-1 items-center`}
            onClick={() => setPage(nextPage)}
          >
            {PageNames[nextPage]} <MdArrowForward />
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div id="contribute" className="contributionSection text-base">
        {renderPageProgress()}
        {renderPage()}
        {error && (
          <div className="errorContainer text-red-500">Error: {error}</div>
        )}
        {renderPageNavigation()}
      </div>
      {renderPageExtra()}
    </>
  );
}
