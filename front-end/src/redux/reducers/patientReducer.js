import { ActionTypes } from "../constants/action-types";
const intitialVal = {
  walletAddress: "h",
  userId: null,
  category: "",
};
export const walletReducer = (state = intitialVal, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: payload.walletAddress,
        category: payload.category,
      };
    case ActionTypes.SET_USER_ID:
      return {
        ...state,
        userId: payload,
      };
    default:
      return state;
  }
};
