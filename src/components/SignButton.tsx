import { ConnectKitButton } from "connectkit";
import { useSignMessage } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

interface SignButton {
  isSigned: boolean;
  setIsSigned: (isSigned: boolean) => void;
}
export const SignButton = (props: SignButton) => {
  const { isSigned, setIsSigned } = props;
  const router = useRouter();
  const { walletAddress, email } = router.query;
  const message = JSON.stringify({
    walletAddress,
    email,
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const callWebhook = async (data: { signature: string, walletAddress: string, email: string }) => {
    await axios.post("/api/webhook", data);
  };

  const { signMessage } = useSignMessage({
    onSuccess(data) {
      setIsSuccess(true);
      setIsSigned(true);
      // setTimeout(() => {
      //   setIsSuccess(false)
      // }, 3000);
      callWebhook({ signature: data, walletAddress: walletAddress as string, email: email as string });
    },
  });

  const handleClose = () => {
    setIsSuccess(false)
  }
  return (
    <ConnectKitButton.Custom>
      {() => {
        return (
          <div className="message_inn_wrap">
            {isSigned === false && <button
              className="signButton"
              onClick={() => signMessage({ message })}
            >Sign
            </button>}
            {isSigned === true && isSuccess && (<div className="alert success">
              <p className="inn_txt"><strong className="success_text">Success!</strong> You have signed successfully.</p>
              <span className="closebtn" onClick={handleClose}>&times;</span>
            </div>)}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
