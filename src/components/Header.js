import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BiPlus, BiListCheck } from "react-icons/bi";

const Header = () => {
  return (
    <StyleNavigation>
      <NavLink className='header__link' to='/'>
        <BiListCheck className='header__plus_icon' />
      </NavLink>
      <NavLink className='header__link' to='/create-employee'>
        <BiPlus className='header__plus_icon' />
      </NavLink>
    </StyleNavigation>
  );
};

const StyleNavigation = styled.div`
  width: 100%;
  background-color: lightcoral;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .header__plus_icon {
    font-size: 2rem;
    color: white;
  }
  .header__link {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-right: 2rem;
  }
`;

export default Header;
