import { connectBrowserWallet, getWalletAddress } from "src/helpers/wallet";
import { ButtonClass } from "src/types/styles";
import { ButtonHTMLAttributes, useContext, useState } from "react";
import { UserContext } from "src/App";

interface BaseProps {
  children?: React.ReactNode;
  onError: (error: Error) => void;
  onSubmit(connectedWalletAddress: string): void;
}

type Props = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onError" | "onSubmit"
> &
  BaseProps;

export function ConnectWalletButton({
  children = "Connect",
  onError,
  onSubmit,
  ...buttonProps
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { provider } = useContext(UserContext);

  async function onClickConnectWallet() {
    setLoading(true);
    try {
      await connectBrowserWallet();
      const connectedWalletAddress = await getWalletAddress(provider);
      await onSubmit(connectedWalletAddress);
    } catch (err: unknown) {
      console.log(err);
      onError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={`${ButtonClass("blue")}`}
      onClick={onClickConnectWallet}
      disabled={loading}
      {...buttonProps}
    >
      {loading ? "Connecting..." : children}
    </button>
  );
}
