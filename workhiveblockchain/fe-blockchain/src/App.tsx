import "./App.css";
import Navbar from "./components/custom/Navbar";

import { config } from "./config/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Provider } from "react-redux";
import { store } from "./store";
import Hero from "./pages/Hero";
import SendEth from "./features/SendEth";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div className="max-w-5xl mx-auto">
            <Navbar />
            <Hero />
            <SendEth />
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  );
}

export default App;
