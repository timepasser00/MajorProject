import { ActionTypes } from "../constants/action-types";
const intitialVal = {
    walletAddress: "h",
};
export const walletReducer = (state = intitialVal, {type,payload}) => {
    switch (type) {
        case ActionTypes.SET_WALLET_ADDRESS:
            return {
                ...state,
                walletAddress: payload,
            };
        default:
            return state;
    }
};