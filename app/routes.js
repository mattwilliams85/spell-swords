import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/app'

import Games from './components/game/Container'
import Board from './components/board/Container'
import UserLogin from './components/user/login'
import UserRegister from './components/user/register'
import UserProfile from './components/user/profile'
import ResetPassword from './components/user/reset_password'
import {requireAuth} from './api/firebase'
import GameAPI from './api/game'

function clearAndAuth () {
  requireAuth()
  GameAPI.clearGames()
}

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Games} onEnter={requireAuth} />
    <Route path='/login' component={UserLogin} />
    <Route path='/register' component={UserRegister} />
    <Route path='/reset' component={ResetPassword} />
    <Route path='/profile' component={UserProfile} onEnter={requireAuth} />
    <Route path='/games/:key' component={Board} onEnter={clearAndAuth} />
  </Route>
)
