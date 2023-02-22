import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface Message {
  isSigned: boolean
}
export const Message = (props:Message) => {
  const {isSigned} = props;
  const { isConnected } = useAccount();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  return (
    <div
      style={{
        fontSize: '42px',
        color: '#fff',
        marginBottom: '45px',
        lineHeight: '28px',
      }}
    >
      {connected && !isSigned
        ? "Click Sign to sign a custom message"
        : "Thank you!"}
    </div>
  );
};
