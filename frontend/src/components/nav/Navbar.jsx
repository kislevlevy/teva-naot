import React from 'react';
import Button from '../base/Button';
import Logo from '../base/Logo';

export default function Navbar() {
  return (
    <div className="main-navbar">
      <div className="main-navbar-container">
        <div className="logo">
          <Logo />
        </div>
        <Button btnType="buy-now">Buy now </Button>
      </div>
    </div>
  );
}
