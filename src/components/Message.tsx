import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface Message {
  isSigned: boolean;
  setIsSigned: (isSigned: boolean) => void;
}
export const Message = (props:Message) => {
  const {isSigned, setIsSigned} = props;
  const { isConnected } = useAccount();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log("message", isSigned)
    setConnected(isConnected);
    setIsSigned(isConnected)
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
      {!isSigned
        ? "Click Sign to sign a custom message"
        : "Thank you!"}
    </div>
  );
};
