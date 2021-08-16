import React, { useState } from "react";

import styled from "@emotion/styled";

import { IoMdMenu } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

import Modal from "./Modal";

import RoomSearchForm from "../domain/RoomSearch/SearchForm/RoomSearchForm";
import LoginForm from "../domain/Login/LoginForm";

import { postLogin } from "../api/user/postLogin";

export type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [toggleMenuOpen, setToggleMenuOpen] = useState(false);
  const [loginFormOpen, setLoginFormOepn] = useState(false);
  const [loginFields, setLoginFields] = useState({
    id: "",
    password: "",
  });
  const { id, password } = loginFields;

  const handleToggleMenuButtonClick = () => {
    setToggleMenuOpen((prev) => !prev);
  };

  const handleLoginModalToggle = () => {
    setLoginFormOepn((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postLogin({ id, password });
  };

  return (
    <>
      <Header>
        <Logo>
          <button type="button">HAJULA</button>
        </Logo>
        <Nav>
          <p>
            <button type="button">숙소</button>
          </p>
        </Nav>
        <RoomSearchForm />
        <ToggleMenuButton>
          <button type="button" onClick={handleToggleMenuButtonClick}>
            <span className="menu">
              <IoMdMenu />
            </span>
            <span className="profile">
              <FaUserCircle />
            </span>
          </button>
        </ToggleMenuButton>
        {toggleMenuOpen && (
          <ToggleMenus>
            <li>
              <button type="button" onClick={handleLoginModalToggle}>
                로그인
              </button>
            </li>
          </ToggleMenus>
        )}
      </Header>
      {loginFormOpen && (
        <Modal title="로그인" onOutsideClick={handleLoginModalToggle}>
          <LoginForm
            id={id}
            password={password}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Modal>
      )}
      {children}
    </>
  );
};

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 40px;
  width: 100%;
`;

const Logo = styled.h1`
  button {
    color: #fff;
    font-size: 2rem;
    letter-spacing: 0.2em;
  }
`;

const Nav = styled.nav`
  button {
    color: #fff;
    font-size: 1.5rem;
  }
`;

const ToggleMenuButton = styled.nav`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 2em;
  button {
    display: flex;
    align-items: center;
    margin: auto 0;
    padding: 0.4em 0.5em 0.4em 1em;
    cursor: pointer;
    .menu svg {
      font-size: 1.6rem;
    }
    .profile svg {
      font-size: 2.3rem;
      color: #717171;
    }
    span + span {
      margin-left: 1rem;
    }
  }
`;

const ToggleMenus = styled.ul`
  position: absolute;
  top: 100%;
  right: 40px;
  width: 150px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  li button {
    padding: 20px;
    width: 100%;
    text-align: left;
  }
`;

export default AppLayout;
