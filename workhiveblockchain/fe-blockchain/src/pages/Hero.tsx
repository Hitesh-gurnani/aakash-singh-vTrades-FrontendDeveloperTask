import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useAccount, useBalance } from "wagmi";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/sonner";
import { toast } from "sonner";
import { setWalletBalance } from "../slices/WalletSlice";

function Hero() {
  const walletState = useSelector((state: RootState) => state.wallet);
  const { address } = useAccount();
  const dispatch = useDispatch();
  const { data: balance } = useBalance({ address });

  function handleGetBalance() {
    console.log(walletState, "walletState");
    if (walletState.balance) {
      toast.success(`Balance: ${walletState.balance} ${balance?.symbol}`);
      return;
    }
    console.log(balance, "balance");
    toast.success(`Balance: ${balance?.formatted} ${balance?.symbol}`);
    dispatch(setWalletBalance(balance?.formatted || null));
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {walletState.isConnected ? (
        <>
          <Button
            variant={"outline"}
            className="mt-5 flex justify-center items-center"
            onClick={handleGetBalance}
          >
            Get Balance
          </Button>
        </>
      ) : (
        <div className="text-center">
          <p>Please connect your wallet to access features</p>
          <Button
            variant="default"
            className="mt-3"
            onClick={() => {
              // Import and use your wallet connection function here
              // For example: connectWallet() from a wallet connection hook or service
            }}
          >
            Connect Wallet
          </Button>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default Hero;
