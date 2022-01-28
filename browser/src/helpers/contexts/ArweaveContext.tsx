import React, { useEffect, useState } from "react";
import { fetchLatestEssayTxId } from "../api";

export interface ArweaveContextInfo {
  latestEssayTxId: string;
}

export const ArweaveContext = React.createContext<ArweaveContextInfo>({
  latestEssayTxId: "",
});

export function ArweaveProvider({ children }) {
  const [txId, setTxId] = useState("");
  useEffect(() => {
    fetchLatestEssayTxId().then((res) => setTxId(res));
  }, []);

  const arweaveContext = { latestEssayTxId: txId };
  return (
    <ArweaveContext.Provider value={arweaveContext}>
      {children}
    </ArweaveContext.Provider>
  );
}
