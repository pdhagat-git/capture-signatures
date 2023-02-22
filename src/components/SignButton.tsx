import { ConnectKitButton } from "connectkit";
import { useSignMessage } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";

export const SignButton = () => {
  const router = useRouter();
  const { walletAddress, email } = router.query;
  const message = JSON.stringify({
    walletAddress,
    email,
  });

  const callWebhook = async (data: {signature: string, walletAddress: string, email: string}) => {
      await axios.post("/api/webhook", data);
  };

  const { signMessage } = useSignMessage({
    onSuccess(data) {
      callWebhook({signature: data, walletAddress: walletAddress as string, email: email as string});
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
