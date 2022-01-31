import React, { useEffect, useState } from "react";
import { ArweaveEssayTransaction, fetchLatestArweaveEssay } from "../api";

export interface ArweaveContextInfo {
  latestEssayInfo?: ArweaveEssayTransaction;
}

export const ArweaveContext = React.createContext<ArweaveContextInfo>({
  latestEssayInfo: undefined,
});

export function ArweaveProvider({ children }) {
  const [essayTransaction, setEssayTransaction] = useState<
    ArweaveEssayTransaction | undefined
  >(undefined);
  useEffect(() => {
    fetchLatestArweaveEssay().then((res) => setEssayTransaction(res));
  }, []);

  const arweaveContext = { latestEssayInfo: essayTransaction };
  return (
    <ArweaveContext.Provider value={arweaveContext}>
      {children}
    </ArweaveContext.Provider>
  );
}
