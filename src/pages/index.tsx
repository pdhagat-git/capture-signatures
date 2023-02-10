import type { NextPage } from "next";
import { ConnectKitButton } from "connectkit";
import { Message } from "../components/Message";
import { useAccount, useConnect } from "wagmi";
import { SignButton } from "../components/SignButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IncorrectWallet } from "../components/IncorrectWallet";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [correctAddress, setCorrectAddress] = useState(false);
  const router = useRouter();
  const { walletAddress } = router.query;

  useEffect(() => {
    if (isConnected) {
      if (walletAddress === address) {
        setCorrectAddress(true);
      } else {
        setCorrectAddress(false);
      }
    }
  }, [isConnected, address, walletAddress]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexBasis: "100%",
          justifyContent: "center",
          marginTop: "40vh",
        }}
      >
        <Message />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexBasis: "100%",
          justifyContent: "center",
          marginTop: "0.1vh",
        }}
      >
        {isConnected && correctAddress ? <SignButton /> : <IncorrectWallet />}
        <ConnectKitButton />
      </div>
    </div>
  );
};

export default Home;
