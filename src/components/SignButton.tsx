import { ConnectKitButton } from "connectkit";
import { useSignMessage } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";
import ErrorPage from "next/error";
import { env } from "process";

export const SignButton = () => {
  const router = useRouter();
  const { walletAddress, email, id } = router.query;
  const message = JSON.stringify({
    walletAddress,
    email,
    id,
  });

  const callWebhook = async (data: string) => {
    try {
      const res = await axios.post("/api/webhook", data);
      console.log("HEre2");
    } catch (err) {
      return (
        <ErrorPage
          statusCode={500}
          title={"Something went wrong, please try again"}
        />
      );
    }
  };

  const { signMessage } = useSignMessage({
    onSuccess(data) {
      callWebhook(data);
    },
  });

  return (
    <ConnectKitButton.Custom>
      {() => {
        return (
          <button
            className="signButton"
            onClick={() => signMessage({ message })}
          >
            <div className="signText">Sign</div>
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
