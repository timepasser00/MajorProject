import { ActionTypes } from "../constants/action-types";

export const assignWalletAddress = (walletAddress) => {
  return {
    type: ActionTypes.SET_WALLET_ADDRESS,
    payload: walletAddress,
  };
}