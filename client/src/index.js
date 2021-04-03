import React from 'react';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import promiseMiddleware from "redux-promise"
import ReduxThunk from "redux-thunk"
import Reducer from "./_reducers"
import "./index.css"

import 'antd/dist/antd.css';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>
  , document.getElementById('root')
);

serviceWorker.unregister();
