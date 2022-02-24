import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import account from "@redux/slices/account";
import order from "@redux/slices/order";

const appReducer = combineReducers({ counter, account, order });

const rootReducer = (state: any, action: any) => {
  if (action.type === "account/logout") {
    // for all keys defined in your persistConfig(s)
    localStorage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')

    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
