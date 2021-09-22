import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements'
import {useDispatch, useSelector} from 'react-redux';
import SearchBox from "../../components/SearchBox";

import {logout} from '../../actions/userActions';

function Navbar() {
  
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src='../../images/logo.png' alt="amphibian logo" height="36"></img>
        </NavLink>
        <Bars />
        <NavMenu>
          <SearchBox />
          <NavLink to="/beats">
            Beats
          </NavLink>
          <NavLink to="/soundkits">
            Soundkits
          </NavLink>
          <NavLink to="/licences">
            Licences
          </NavLink>
          <NavLink to="/about">
            About
          </NavLink>

          {userInfo ? (
          <NavLink to="/logout" onClick={logoutHandler}>
            Logout
          </NavLink>
          ) : (
            <NavLink to="/register">
            Register
          </NavLink>
          )}
        </NavMenu>
        {userInfo ? (
        <NavBtn>
            <NavBtnLink to="/profile">Profile</NavBtnLink>
          </NavBtn>
        ) : (
        <NavBtn>
          <NavBtnLink to="/login">Login</NavBtnLink>
        </NavBtn>
        )}

      </Nav>
    </>
  )
}

export default Navbar
