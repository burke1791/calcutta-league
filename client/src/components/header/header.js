import React, { useState } from 'react';

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

function Header() {

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNavbar = () => {
    setCollapseOpen(!collapseOpen);
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
                <Button theme='primary'>Sign In</Button>
              </DropdownItem>
              <DropdownItem className='text-center'>
                <Button theme='link'>Create an Account</Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Header;