import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const Message = () => {
  const { isConnected } = useAccount();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  return (
    <div
      style={{
        marginBottom: "2vh",
      }}
    >
      {connected
        ? "Click Sign to sign a custom message"
        : "Please connect your wallet"}
    </div>
  );
};
