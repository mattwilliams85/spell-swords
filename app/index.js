import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {Router, browserHistory} from 'react-router'
import ReduxThunk from 'redux-thunk'
import ReduxPromise from 'redux-promise'
import reducers from './reducers'
import routes from './routes'

import 'bootstrap-social'

// for bundling your styles
import './bundle.scss'

const storeComp = compose(applyMiddleware(ReduxThunk, ReduxPromise)(createStore))
export let store = storeComp(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.react-root'))

