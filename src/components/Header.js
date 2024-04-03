
import React from 'react';

import { Link } from 'react-router-dom';

import EKQiLogo from '../assets/EKQiLogo.svg'; 

import logout from '../assets/logout.svg'
import profile from '../assets/profile.svg'


const Header = () => {



  /* Application header shows on every applicaiton page when user has logged in successfully */

  return (

    <div className='application-header-container'>
      
      <div>

        <div className='menu-container'>

          <aside className="sidebar">

            <div className='inner'>

              <div className='sidebar-header'>

                <img src={EKQiLogo} alt='EKQiLogo'className='ekqi-sideMenu-logo'/>

              </div>

              <div className='side-bar-link-container'>

                <div className='side-bar-link-icon-container'>

                  <div>
                    <img src={profile} alt='profile icon'className='sideMenu-icon'/>
                  </div>

                  <div>
                    <Link to='account' className='sidebar-link'> Account </Link>
                  </div>
                  
                </div>

                <div className='side-bar-link-icon-container'>

                  <div>
                    <img src={logout} alt='logout icon 'className='sideMenu-icon'/>
                  </div>
                  
                  <div>
                    <Link to='logout' className='sidebar-link'> Logout </Link>
                  </div>

                </div>
                  
                  
                  
              </div>

              <div className='side-bar-text'>

                <p>Designed and Developed by Sakhile Mkhalele</p>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </div>

    

  );
};

export default Header;