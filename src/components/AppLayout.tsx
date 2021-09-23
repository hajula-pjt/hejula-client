import React, { useState, useEffect, FC } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IoMdMenu } from "react-icons/io";

import Modal from "./Modal";
import RoomSearchForm from "../domain/RoomSearch/SearchForm/RoomSearchForm";
import LoginForm from "../domain/Login/LoginForm";

import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../utils/localStorage";

export type AppLayoutProps = {
  children: React.ReactNode;
  isMainPage: boolean;
  isUnVisibleSearchForm: boolean;
};

const AppLayout: FC<AppLayoutProps> = ({
  children,
  isMainPage,
  isUnVisibleSearchForm,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);

  const [user, setUser] = useState(null);

  const [toggleMenuOpen, setToggleMenuOpen] = useState(false);
  const [loginFormOpen, setLoginFormOepn] = useState(false);

  const handleSetUser = (userInfo) => {
    setUser(userInfo);
  };

  const handleSetCookie = ({ key, value }) => {
    setCookie(key, value);
  };

  const handleLogoutClick = () => {
    removeCookie("Authorization");
    removeLocalStorageItem({ key: "userInfo" });
    handleSetUser(null);
  };

  const handleLoginModalToggle = () => {
    setLoginFormOepn((prev) => !prev);
  };

  const handleMenuButtonClickToggle = () => {
    setToggleMenuOpen((prev) => !prev);
  };

  const handleToggleMenuClose = () => {
    setToggleMenuOpen(false);
  };

  const handleLoginFormClose = () => {
    setLoginFormOepn(false);
  };

  useEffect(() => {
    handleSetUser(getLocalStorageItem({ key: "userInfo" }));
  }, []);

  useEffect(() => {
    if (cookies) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${cookies.Authorization}`;
    }
  }, [cookies]);

  return (
    <>
      <Header shadow={!isMainPage}>
        <Logo>
          <button type="button">HAJULA</button>
        </Logo>
        {!isUnVisibleSearchForm && <RoomSearchForm shadow={!isMainPage} />}
        <ToggleMenuButton>
          <button type="button" onClick={handleMenuButtonClickToggle}>
            {user ? (
              <span>
                👉🏻 <em>{user?.nickname}</em>
                님, 안녕하세요
              </span>
            ) : (
              <span>👉🏻 로그인 해주세요</span>
            )}
            <span className="menu">
              <IoMdMenu />
            </span>
          </button>
        </ToggleMenuButton>
        {toggleMenuOpen && (
          <ToggleMenus>
            <li>
              <button
                type="button"
                onClick={
                  cookies?.Authorization
                    ? handleLogoutClick
                    : handleLoginModalToggle
                }
              >
                {cookies?.Authorization ? "로그아웃" : "로그인"}
              </button>
            </li>
          </ToggleMenus>
        )}
      </Header>
      {loginFormOpen && (
        <Modal title="로그인" onOutsideClick={handleLoginModalToggle}>
          <LoginForm
            setCookie={handleSetCookie}
            setUser={handleSetUser}
            onLoginFormClose={handleLoginFormClose}
            onToggleMenuClose={handleToggleMenuClose}
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
  z-index: 1;
  ${({ shadow }) =>
    shadow &&
    css`
      background: #fff;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
      h1 *,
      nav * {
        color: #333 !important;
      }
    `}
`;

const Logo = styled.h1`
  button {
    color: #fff;
    font-size: 2rem;
    letter-spacing: 0.2em;
  }
`;

const ToggleMenuButton = styled.div`
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
    span {
      line-height: 1;
    }
    span + span {
      margin-left: 1rem;
    }
  }
`;

const ToggleMenus = styled.ul`
  position: absolute;
  top: 86%;
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
