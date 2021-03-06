import { combineReducers } from "redux"
import user from "./user_reducer"
import product from "./product_reducer"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
}

const rootReducer = combineReducers({
  user,
  product,
})

export default persistReducer(persistConfig, rootReducer)
