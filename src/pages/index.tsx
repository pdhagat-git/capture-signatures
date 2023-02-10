import type { NextPage } from "next";
import { ConnectKitButton } from "connectkit";
import { Message } from "./components/Message";
import { useAccount, useSignMessage } from "wagmi";
import { SignButton } from "./components/SignButton";

const Home: NextPage = () => {
  const { isConnected } = useAccount();


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
        {isConnected && <SignButton/>}
        <ConnectKitButton/>
      </div>
    </div>
  );
};

export default Home;
