import { ConnectKitButton } from "connectkit";
import { useSignMessage } from "wagmi";
import { useRouter } from 'next/router';
import { verifyMessage } from 'ethers/lib/utils'

export const SignButton = () => {
    const router = useRouter()
    const { walletAddress, email, id } = router.query
    const message = JSON.stringify({
        walletAddress,
        email,
        id,
    })

    const { data, error, isLoading, signMessage } = useSignMessage({
        onSuccess(data) {
          const address = verifyMessage(message, data)
          console.log({address})
        },
      })
      
    return (
        <ConnectKitButton.Custom>
          {({ isConnected, show, truncatedAddress, ensName }) => {
            return (
              <button onClick={() => signMessage({message})}>
                Sign
              </button>
            );
          }}
        </ConnectKitButton.Custom>
      );
};
