import { ButtonHTMLAttributes, useState } from "react";
import { ButtonClass } from "src/types/styles";

interface BaseProps {
  children?: React.ReactNode;
  onError: (error: Error) => void;
  onSubmit(): Promise<void>;
}
type Props = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onError" | "onSubmit"
> &
  BaseProps;

export function AsyncButton({
  onError,
  onSubmit,
  className,
  children,
  ...buttonProps
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  async function onClick() {
    setLoading(true);
    try {
      await onSubmit();
    } catch (err: unknown) {
      console.log(err);
      onError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={`${ButtonClass("wide")} ${className ? className : ""}`}
      onClick={onClick}
      disabled={loading}
      {...buttonProps}
    >
      {loading ? "Connecting..." : children}
    </button>
  );
}
