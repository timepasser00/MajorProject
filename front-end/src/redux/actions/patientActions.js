import { ActionTypes } from "../constants/action-types";

export const assignWalletAddress = (Info) => {
  return {
    type: ActionTypes.SET_WALLET_ADDRESS,
    payload: Info,
  };
}