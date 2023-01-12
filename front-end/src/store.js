// import { configureStore } from "@reduxjs/toolkit";
// import walletReducer from "./walletReducer";




// const store=configureStore({
//     reducer: walletReducer

// })

// export default store;

import { createStore } from "redux";
import { walletReducer } from "./redux/reducers/patientReducer";
const store = createStore(walletReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;