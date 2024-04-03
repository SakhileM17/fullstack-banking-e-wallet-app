import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import _ from 'lodash';

import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import Profile from '../components/Profile';
import Account from '../components/Account';
import Logout from '../components/Logout';

export const history = createBrowserHistory();

const AppRouter = ({ auth }) => {
  const isAuthenticated = !_.isEmpty(auth.token);

  return (
    <BrowserRouter>

      <div className='application-container'>

        <div className='app-header-container'>
          {isAuthenticated && <Header />}
        </div>
        
        <div className='application-pages-containers'>

          <Routes>
            
            <Route path="/" element={isAuthenticated ? <Account /> : <Login />}/>
            
            <Route path="/profile" element={<Profile/>} />
            <Route path="/register" element={<Register />}/>
            <Route path="/account" element={<Account />} />
            <Route path="/logout" element={<Logout/>} />
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AppRouter);
