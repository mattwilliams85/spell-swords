import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {Router, browserHistory} from 'react-router'
import ReduxThunk from 'redux-thunk'
import ReduxPromise from 'redux-promise'
import reducers from './reducers'
import routes from './routes'

import 'bootstrap-social'

// for bundling your styles
import './bundle.scss'

const store = applyMiddleware(ReduxThunk, ReduxPromise)(createStore)

ReactDOM.render(
  <Provider store={store(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.react-root'))

