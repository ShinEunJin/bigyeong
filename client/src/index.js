import React from "react"
import ReactDOM from "react-dom"
import App from "./Components/App"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import promiseMiddleware from "redux-promise"
import ReduxThunk from "redux-thunk"
import Reducer from "./_reducers"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import "./index.css"

import "antd/dist/antd.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore)
const store = createStoreWithMiddleware(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const persistor = persistStore(store) //redux persist

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)
