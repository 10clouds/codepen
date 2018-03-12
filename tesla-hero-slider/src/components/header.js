import React from 'react';
import logo from './../assets/images/logo.svg';
import hamburger from './../assets/images/hamburger.svg';
import './../styles/scss/components/header.css';

function Header() {
  return (
    <div className='tesla-header'>
      <div className='tesla-header__logo'>
        <img src={logo} alt='' />
      </div>
      <div className='tesla-header__nav'>
        <img src={hamburger} alt='' />
      </div>
    </div>
  );
}

export default Header;
