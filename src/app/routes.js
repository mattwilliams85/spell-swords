import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';

import Home from './components/home';
import MedicationView from './components/medication/Container';
import UserLogin from './components/user/login';
import UserLogout from './components/user/logout';
import UserRegister from './components/user/register';
import UserProfile from './components/user/profile';
import ResetPassword from './components/user/reset_password';
import {requireAuth} from './controllers/auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={UserLogin} />
    <Route path="/logout" component={UserLogout} />
    <Route path="/medications" component={MedicationView} />
    <Route path="/register" component={UserRegister} />
    <Route path="/reset" component={ResetPassword} />
    <Route path="/profile" component={UserProfile} onEnter={requireAuth} />
  </Route>

);
