import "./ContributionSection.css";
import { useContext, useEffect, useState } from "react";
import { descriptionText } from "../classNameConstants";
import {
  Author,
  Contribution,
  Pattern,
  PatternToDisplay,
  Prompt,
  TweetTemplate,
} from "../types/common/server-api/index";
import { Dropdown, DropdownItem } from "./core/Dropdown";
import {
  addContribution,
  addUser,
  getContribution,
  verifyTwitter,
} from "src/helpers/api";
import { AutoGrowInput } from "./core/AutoGrowInput";
import React from "react";
import { ButtonClass, ButtonLinkStyling } from "src/types/styles";
import { ConnectWalletButton } from "./core/WalletButton";
import {
  connectWithWalletConnect,
  getWalletAddress,
  signAndValidate,
} from "src/helpers/wallet";
import {
  ContributionCard,
  getFullContributionResponse,
} from "./ContributionCard";
import { getUser } from "src/helpers/api";
import { Link } from "react-router-dom";
import { getDisplayForAuthor } from "./SignatureContent";
import { ethers } from "ethers";
import { LoadingIndicator } from "./core/LoadingIndicator";
import { Checkmark } from "./core/Checkmark";
import ContributionsCarousel from "./ContributionsCarousel";
import getMockContributions from "src/utils/getMockContributions";
import { ContributionsContext } from "src/pages/Main";

enum Page {
  TermsOfUse,
  Contribute,
  Share,
  TwitterVerify,
}

export const PluriverseAgreement = `I have read and agree to the principles of the pluriverse, and I acknowledge that the entire responsibility / liability as to the realization of the pluriverse lies with all of us. 

I want to help build the pluriverse together.`;
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
};

const PromptDescriptionsToDisplay: Record<Prompt, string> = Object.entries(
  PromptDescriptions
).reduce((acc, cur) => {
  acc[cur[0]] = cur[1].replaceAll(/\{|\}/g, "");
  return acc;
}, {});

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
  onConnectWalletConnect(): void;
  onAgree(
    walletAddress: string,
    { name, twitterUsername }?: { name?: string; twitterUsername?: string }
  ): void;
}

function TermsOfUse({
  user,
  onAgree,
  handleErr,
  onConnectWalletConnect,
}: TermsOfUseProps) {
  const [name, setName] = useState<string | undefined>(undefined);
  const [twitterUsername, setTwitterUsername] = useState<string | undefined>(
    undefined
  );

  return (
    <div className="terms">
      <div className="flex ">
        <h2 className="text-3xl font-bold">Terms of Use</h2>
        {user && (
          <div className="inputs ml-auto">
            signing as <b>{getDisplayForAuthor(user)}</b>
          </div>
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
      <p>
        <b>
          I want to help build the <b className="shimmer">pluriverse</b>{" "}
          together:
        </b>
      </p>
      {/* TODO: maybe don't show any of this if user is already defined */}
      {!user && (
        <div className="inputs">
          <div>
            <label>
              <em>Name:</em>
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
              <em>Twitter:</em>
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
        {/* TODO: link to github forking or form */}
        <button className={ButtonClass("white")}>Disagree</button>
        <ConnectWalletButton
          onSubmit={(walletAddress) =>
            onAgree(walletAddress, { name, twitterUsername })
          }
          onError={handleErr}
        >
          {`Agree${!user ? " (sign with wallet)" : ""}`}
        </ConnectWalletButton>
      </div>
      <div className="text-center mt-2">
        Don't have Metamask? Agree{" "}
        <button className={ButtonLinkStyling} onClick={onConnectWalletConnect}>
          with WalletConnect instead.
        </button>
      </div>

      <p className="metaText">
        A copy of the Essay will live on the permaweb and can be found at{" "}
        <a href="">Arweave</a>. It also lives on the web on{" "}
        <a href="#">pluriverse.world</a>.
        <br />
        To agree and sign, you need a Metamask wallet. Need help? Check out this{" "}
        <a href="">guide</a>.
      </p>
    </div>
  );
}

export function ContributionSection() {
  const [page, setPage] = useState(Page.TermsOfUse);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(
    Prompt.LooksLike
  );
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(
    Pattern.Pluriverse
  );
  const [response, setResponse] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<Author | undefined>();
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();

  async function fetchUserFromWalletAddress() {
    const addr = await getWalletAddress(provider);
    if (addr) {
      const maybeUser = await getUser({
        id: addr,
      });
      if (maybeUser) {
        setUser(maybeUser);
      }
    }
  }

  useEffect(async () => {
    try {
      await fetchUserFromWalletAddress();
      // eslint-disable-next-line no-empty
    } catch {}
  }, []);

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
        walletId: user!.walletId,
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

  async function onAgree(
    connectedWalletAddress: string,
    { name, twitterUsername }: { name?: string; twitterUsername?: string } = {}
  ) {
    // Validate user
    let userToUpdate: Author | undefined = user;
    if (!userToUpdate) {
      userToUpdate = await getUser({
        id: connectedWalletAddress,
      });
    }
    // TODO: upsert user if the data does not match.
    let nextPage: Page;
    let signature: string | undefined = userToUpdate?.signature;

    if (!userToUpdate) {
      signature = await signAndValidate(PluriverseAgreement);
      // add user after successful
      userToUpdate = await addUser({
        walletId: connectedWalletAddress,
        name,
        twitterUsername,
        signature,
      });
    }

    // if twitter username is populated and not verified, redirect to verify flow.
    if (userToUpdate.twitterUsername && !userToUpdate.twitterVerified) {
      nextPage = Page.TwitterVerify;
    } else {
      nextPage = Page.Contribute;
    }

    // finish
    setError(undefined);
    setSig(signature);
    setUser(userToUpdate);
    setPage(nextPage);
    // trigger signatures to refetch
  }

  async function onConnectWalletConnect() {
    const walletConnectProvider = await connectWithWalletConnect();
    setProvider(walletConnectProvider);
    // Update the user now that we have connected a diff account.
    await fetchUserFromWalletAddress();

    const connectedWalletAddress = await getWalletAddress(provider);
    await onAgree(connectedWalletAddress);
  }

  const [lastPage, setLastPage] = useState<Page>(Page.TermsOfUse);
  const [sig, setSig] = useState<string | undefined>();

  function onClickTweetProof() {
    const str = `${TweetTemplate}${sig}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURI(str)}`,
      "_blank"
    );
  }

  async function onClickVerifyTwitter() {
    setIsLoading(true);
    try {
      if (!user?.twitterVerified) {
        await verifyTwitter({ walletId: user!.walletId });
        setUser({ ...user!, twitterVerified: true });
      }
      setError(undefined);
      // switch page after showing success
      setTimeout(() => {
        setLastPage(Page.TermsOfUse);
        setPage(Page.Contribute);
      }, 750);
    } catch (err) {
      handleErr(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  function onClickSkipVerification() {
    setLastPage(Page.TwitterVerify);
    setPage(Page.Contribute);
  }

  function renderPage() {
    switch (page) {
      case Page.TermsOfUse:
        return (
          <TermsOfUse
            user={user}
            onAgree={onAgree}
            handleErr={handleErr}
            onConnectWalletConnect={onConnectWalletConnect}
          />
        );

      case Page.TwitterVerify:
        return (
          <div className="verifyContainer">
            <p>
              Tweet a message to prove that you control this address. Return to
              this page afterwards to complete verification.
            </p>
            <button className={ButtonClass()} onClick={onClickTweetProof}>
              Tweet proof
            </button>
            <p>
              After sending your tweet, click the button below to complete
              verification. If successful, you'll proceed to contributing to the{" "}
              <b className="shimmer">Pluriverse</b>.
            </p>
            <div className="verifyActions">
              <button
                style={{ display: "inline-flex", justifyContent: "center" }}
                className={ButtonClass()}
                onClick={onClickVerifyTwitter}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Verifying <LoadingIndicator style={{ marginLeft: "6px" }} />
                  </>
                ) : user?.twitterVerified ? (
                  <>
                    Verified! <Checkmark />
                  </>
                ) : (
                  "Verify twitter"
                )}
              </button>
              <button
                className={ButtonLinkStyling}
                onClick={onClickSkipVerification}
              >
                Skip verification to contributing
              </button>
            </div>
          </div>
        );

      case Page.Contribute:
        return (
          <div>
            <div className="signContainer">
              {/* <div className="signAttribution py-2 px-2">
                Logged in as {getDisplayForAuthor(user!)}
              </div> */}
              <h2 className="text-4xl font-bold">Contribute</h2>
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
                            }}
                          />
                        }
                      </div>
                      <p className={descriptionText}></p>
                    </>
                  )}
                  {/* TODO: add twitter username */}
                </div>
                <PreviewCard
                  author={user!}
                  pattern={selectedPattern}
                  response={response}
                  prompt={selectedPrompt}
                />
              </div>
              <div className="actionsContainer">
                <button
                  onClick={() => setPage(lastPage)}
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
                <div className="loadingContainer">
                  Creating Pluriverse... <LoadingIndicator />
                </div>
              )}
            </div>
          </div>
        );

      case Page.Share:
        return (
          <div className="signContainer">
            <h2 className="text-4xl font-bold">Share</h2>
            <p>
              Thank you for contributing to the Pluriverse! You can see your
              contribution below
            </p>
            {/* TODO: if not verified, add verify link */}
            <ContributionCard
              contribution={selectedContribution!}
            ></ContributionCard>
            <br />
            {/* TODO: add share on X,Y,Z CTAs */}
            <button
              onClick={() => setPage(Page.Contribute)}
              className={ButtonClass("blue")}
            >
              Add more
            </button>

            <p>
              See <Link to="/contributions">all contributions</Link>
            </p>
          </div>
        );

      default:
        throw Error("unreachable");
    }
  }

  const { contributions } = useContext(ContributionsContext);
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

  return (
    <>
      <div id="contribute" className="contributionSection text-base">
        {renderPage()}
        {error && (
          <div className="errorContainer text-red-500">Error: {error}</div>
        )}
      </div>
      {renderPageExtra()}
    </>
  );
}
