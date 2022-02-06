import { ButtonClass } from "src/types/styles";
import { ButtonHTMLAttributes, useContext, useState } from "react";
import { UserContext } from "src/helpers/user";

interface BaseProps {
  children?: React.ReactNode;
  onError: (error: Error) => void;
}

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onError"> &
  BaseProps;

// TODO: convert to AsyncButton
export function ConnectWalletButton({
  children = "Connect",
  onError,
  ...buttonProps
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { connectWallet } = useContext(UserContext);

  async function onClickConnectWallet() {
    setLoading(true);
    try {
      await connectWallet();
    } catch (err: unknown) {
      console.log(err);
      onError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={`glass-button glass-button-cta w-full`}
      onClick={onClickConnectWallet}
      disabled={loading}
      {...buttonProps}
    >
      {loading ? "Connecting..." : children}
    </button>
  );
}
