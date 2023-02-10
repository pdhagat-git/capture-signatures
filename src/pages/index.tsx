import type { NextPage } from "next";
import { ConnectKitButton } from "connectkit";
import { Message } from "./components/Message";

const Home: NextPage = () => {
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
        <ConnectKitButton theme="midnight" />
      </div>
    </div>
  );
};

export default Home;
