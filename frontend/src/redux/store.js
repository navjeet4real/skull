import React from 'react';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
//import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer/index";

//redux store
const store = createStore(rootReducer, applyMiddleware(thunk));
const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider; 