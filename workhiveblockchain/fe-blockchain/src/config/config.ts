import { mainnet } from "wagmi/chains";
import { http, createConfig } from "wagmi";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet], // these are the chains we'll support
  connectors: [metaMask()],
  transports: {
    // this is how we'll talk to mainnet
    [mainnet.id]: http(),
  },
});
