import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

export const Nav = styled.nav`
  background: #222222;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 2rem 10rem;
  z-index: 10;

  @media screen and (max-width: 1368px) {
    padding: 2rem 8rem;
  }

`;

export const NavLink = styled(Link)`
  font-weight: 600;
  letter-spacing: 0.1rem;
  color: rgba(255,255,255, 0.5);
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: rgba(64, 132, 132, 0.8);
  }

  &:hover {
    background-color: #002d2e;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: rgba(255,255,255, 0.8);

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  font-weight: 600;


  border-radius: 4px;
  background: rgba(64, 132, 132, 0.8);
  padding: 10px 22px;
  color: #222222;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #408484;
    color: #010606;
  }
`;