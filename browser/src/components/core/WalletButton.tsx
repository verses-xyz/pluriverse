import { connectWallet } from "src/helpers/wallet";
import { ButtonClass } from "src/types/styles";
import { ButtonHTMLAttributes, useState } from "react";
// TODO: fill this in with the same from terms of agreement.

interface BaseProps {
  children?: React.ReactNode;
  onError: (error: Error) => void;
  onSubmit(): void;
}

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onError"> &
  BaseProps;

export function ConnectWalletButton({
  children = "Connect",
  onError,
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  async function onClickConnectWallet() {
    setLoading(true);
    try {
      await connectWallet();
      onSubmit();
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
    >
      {loading ? "Connecting..." : children}
    </button>
  );
}
