import { Button } from "../ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { useEffect } from "react";
import { setWalletAddress } from "../../slices/WalletSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Toaster } from "../ui/sonner";

import { toast } from "sonner";

function Navbar() {
  const { connect } = useConnect();
  const { disconnect: disconnectWallet } = useDisconnect();
  const { address } = useAccount();

  const dispatch = useDispatch();
  const walletState = useSelector((state: RootState) => state.wallet);

  useEffect(() => {
    dispatch(setWalletAddress(address || null));
  }, [address, dispatch]);

  const handleWalletConnect = () => {
    if (walletState.isConnected) {
      toast.success("Copied to clipboard");
      navigator.clipboard.writeText(address as string);
      return;
    }
    connect({ connector: metaMask() });
  };

  const handleDisconnect = () => {
    disconnectWallet();
    dispatch(setWalletAddress(null));
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl">WorkHive</span>
          </div>

          <div className="flex items-center">
            <Button
              onClick={handleWalletConnect}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md "
            >
              {address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect Wallet"}
            </Button>
            <div className="flex items-center">
              <Button onClick={handleDisconnect}>Disconnect</Button>
            </div>
            <Toaster />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
