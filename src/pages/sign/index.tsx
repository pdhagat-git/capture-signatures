import type { NextPage } from "next";
import { ConnectKitButton } from "connectkit";
import { Message } from "../../components/Message";
import { useAccount, useConnect } from "wagmi";
import { SignButton } from "../../components/SignButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IncorrectWallet } from "../../components/IncorrectWallet";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [correctAddress, setCorrectAddress] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const router = useRouter();
  const { walletAddress } = router.query;

  useEffect(() => {
    console.log("index", isSigned)
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
         <div className="main_header">
           <img src="/images/logo.png" alt="Logo" className="logo" />
        </div>
      <div className="main_content_wra">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexBasis: "100%",
            justifyContent: "center",
          }}
        >
          <Message isSigned={isSigned}  setIsSigned={setIsSigned} />
        </div>
        <div className={`message_wrapper ${isSigned===true ? "success-message" : "error-message"} `}>
          {isConnected && correctAddress ? <SignButton isSigned={isSigned} setIsSigned={setIsSigned} /> : <IncorrectWallet />}
          <div className="connect_kit_btn">
          <ConnectKitButton />
          </div>
          
        </div>
      </div>
     </div>
  );
};

export default Home;
