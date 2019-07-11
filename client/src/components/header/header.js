import React, { useState } from 'react';

import AuthModal from '../authModal/authModal';

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  Button
} from 'shards-react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AUTH_MODAL_TYPE } from '../../utilities/constants';

function Header() {

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalLabel, setAuthModalLabel] = useState('Sign In');
  const [authModalType, setAuthModalType] = useState(AUTH_MODAL_TYPE.signin);

  const toggleNavbar = () => {
    setCollapseOpen(!collapseOpen);
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const toggleAuthModal = (type) => {
    if (type === AUTH_MODAL_TYPE.signin) {
      setAuthModalLabel('Please Sign In');
    } else if (type === AUTH_MODAL_TYPE.signup) {
      setAuthModalLabel('Create an Account');
    } else {
      console.log('invalid auth modal type');
    }
    setAuthModalOpen(!authModalOpen);
    setAuthModalType(type);
  }

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  }

  return (
    <Navbar type='dark' theme='primary' expand='sm'>
      <NavbarBrand href='#'>Calcutta</NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />

      <Collapse open={collapseOpen} navbar>
        <Nav navbar  className='ml-auto'>
          <Dropdown open={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle nav caret>
              My Account
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem className='text-center'>
                <a className='btn btn-primary' href='#' onClick={() => toggleAuthModal(AUTH_MODAL_TYPE.signin)}>Sign In</a>
              </DropdownItem>
              <DropdownItem className='text-center'>
                <a className='btn btn-link' href='#' onClick={() => toggleAuthModal(AUTH_MODAL_TYPE.signup)}>Create an Account</a>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Collapse>
      <AuthModal open={authModalOpen} toggle={toggleAuthModal} close={closeAuthModal} label={authModalLabel} type={authModalType} />
    </Navbar>
  )
}

export default Header;