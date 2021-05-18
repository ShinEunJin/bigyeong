import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../_reducers/user_reducer"

export default configureStore({
  reducer: {
    user: userReducer,
  },
})
