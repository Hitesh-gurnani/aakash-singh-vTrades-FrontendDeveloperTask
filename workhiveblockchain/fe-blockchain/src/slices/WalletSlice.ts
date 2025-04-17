import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string | null;
}

const initialState: WalletState = {
  address: null,
  isConnected: false,
  balance: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string | null>) => {
      state.address = action.payload;
      state.isConnected = !!action.payload;
    },
    setWalletBalance: (state, action: PayloadAction<string | null>) => {
      state.balance = action.payload;
    },
    disconnect: (state) => {
      state.address = null;
      state.isConnected = false;
    },
  },
});

export const { setWalletAddress, disconnect, setWalletBalance } =
  walletSlice.actions;
export default walletSlice.reducer;
