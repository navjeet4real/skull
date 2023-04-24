import {configureStore} from "@reduxjs/toolkit"
import {useDispatch as useAppDispatch, useSelector as useAppSelector} from "react-redux";
import {persistStore, persistReducer} from "redux-persist" 
import { rootPersistConfig, rootReducer } from "./rootReducer";

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  })
});

const persistor = persistStore(store);

const { dispatch } = store

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export {store, persistor, dispatch, useSelector, useDispatch}




// import React from 'react';
// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// //import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "./reducer/index";

// //redux store
// const store = createStore(rootReducer, applyMiddleware(thunk));
// const DataProvider = ({ children }) => {
//   return <Provider store={store}>{children}</Provider>;
// };

// export default DataProvider; 