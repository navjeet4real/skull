import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/auth";
import appReducer from "./slices/app";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

export { rootPersistConfig, rootReducer };
