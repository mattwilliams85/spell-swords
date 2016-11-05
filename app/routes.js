import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/app'

import Home from './components/home'
import Games from './components/game/Container'
import Board from './components/board/Container'
import UserLogin from './components/user/login'
import UserLogout from './components/user/logout'
import UserRegister from './components/user/register'
import UserProfile from './components/user/profile'
import ResetPassword from './components/user/reset_password'
import {requireAuth} from './api/firebase'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/login' component={UserLogin} />
    <Route path='/logout' component={UserLogout} />
    <Route path='/register' component={UserRegister} />
    <Route path='/reset' component={ResetPassword} />
    <Route path='/profile' component={UserProfile} onEnter={requireAuth} />

    <Route path='/games' component={Games} onEnter={requireAuth} />
    <Route path='/board/:key' component={Board} onEnter={requireAuth} />
  </Route>

)
