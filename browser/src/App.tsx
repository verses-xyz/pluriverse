import { Canvas } from "@react-three/fiber";
import UniverseScene from "./components/UniverseScene";
import GradientManager from "./components/GradientManager";
import { DevelopmentBanner } from "./components/DevelopmentBanner";
import { Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import { ContributionsPage } from "./pages/ContributionsPage";
import { Navbar } from "./components/Navbar";
import { Main } from "./pages/Main";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Author } from "./types/common/server-api";
import { fetchUserFromWalletAddress } from "./helpers/user";

export interface UserContextInfo {
  provider: ethers.providers.Web3Provider | undefined;
  setProvider(provider: ethers.providers.Web3Provider | undefined): void;
  currentUser: Author | undefined;
  setCurrentUser(user: Author | undefined): void;
}

export const UserContext = React.createContext<UserContextInfo>({
  provider: undefined,
  setProvider: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
});

function UserProvider({ children }) {
  const [provider, setProvider] = useState(
    window.ethereum
      ? new ethers.providers.Web3Provider(window.ethereum)
      : undefined
  );
  const [currentUser, setCurrentUser] = useState<Author | undefined>();

  useEffect(async () => {
    try {
      if (provider) {
        const fetchedUser = await fetchUserFromWalletAddress(provider);
        setCurrentUser(fetchedUser);
      } else {
        setCurrentUser(undefined);
      }
      // eslint-disable-next-line no-empty
    } catch {}
  }, [provider]);

  const userContext = {
    provider,
    setProvider,
    currentUser,
    setCurrentUser,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}

function App() {
  return (
    <div className="mainContainer">
      <main>
        <DevelopmentBanner />
        <Navbar />
        <UserProvider>
          <Routes>
            <Route index={true} element={<Main />} />
            <Route path="about" element={<About />} />
            <Route path="contributions" element={<ContributionsPage />} />
            <Route
              path="contributions/:contributionId"
              element={<ContributionsPage />}
            />
          </Routes>
        </UserProvider>
        <footer className="pt-2 pb-16">
          <span>
            a drop from <a href="https://verses.xyz">Verses</a>, which is
            supported with 💜&nbsp; by <a href="https://gitcoin.co">Gitcoin</a>{" "}
            and <a href="https://fil.org/">Filecoin Foundation</a>
          </span>
        </footer>
      </main>
      <Routes>
        <Route
          index={true}
          element={
            <>
              <GradientManager />
              <div className="canvas-container fadeOutOnScroll fadeInOnTermsOnContributionSection">
                <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
                  <UniverseScene />
                </Canvas>
              </div>
            </>
          }
        />
        <Route path="about" element={<GradientManager />} />
        <Route path="contributions*" element={<GradientManager />} />
      </Routes>
    </div>
  );
}

export default App;
