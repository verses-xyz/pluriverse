import { ButtonClass } from "src/types/styles";
import { ButtonHTMLAttributes, useContext, useState } from "react";
import { UserContext } from "src/helpers/user";

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
  const { connectWallet, getWalletAddress } = useContext(UserContext);

  async function onClickConnectWallet() {
    setLoading(true);
    try {
      await connectWallet();
      const connectedWalletAddress = await getWalletAddress();
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
