import React, { ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { IoMdMenu } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

import Modal from "./Modal";

import RoomSearchForm from "../domain/RoomSearch/SearchForm/RoomSearchForm";
import LoginForm from "../domain/Login/LoginForm";

import { postLogin } from "../api/user/postLogin";

import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";
import { useEffect } from "react";

export type AppLayoutProps = {
  children: React.ReactNode;
  isHasShadow: boolean;
};

const AppLayout = ({ children, isHasShadow }: AppLayoutProps) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);

  const [toggleMenuOpen, setToggleMenuOpen] = useState(false);
  const [loginFormOpen, setLoginFormOepn] = useState(false);
  const [loginFields, setLoginFields] = useState({
    id: "",
    password: "",
  });
  const { id, password } = loginFields;

  const [loginError, setLoginError] = useState(null);

  const handleToggleMenuButtonClick = () => {
    setToggleMenuOpen((prev) => !prev);
  };

  const handleLoginModalToggle = () => {
    setLoginFormOepn((prev) => !prev);
  };

  const handleLogoutClick = () => {
    removeCookie("Authorization");
    removeLocalStorageItem({ key: "userInfo" });
    setUser(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await postLogin({ id, password });
      const accessToken = result.token;

      const { nickname, userId, userSeq } = result;

      setCookie("Authorization", accessToken);

      setLocalStorageItem({
        key: "userInfo",
        value: JSON.stringify({ nickname, userId, userSeq }),
      });

      setUser(getLocalStorageItem({ key: "userInfo" })?.nickname);

      setToggleMenuOpen(false);
      setLoginFormOepn(false);
      setLoginError(null);
    } catch (e) {
      setLoginError(e.message);
    }
  };

  useEffect(() => {
    const userInfo = getLocalStorageItem({ key: "userInfo" });

    setUser(userInfo?.nickname || null);

    if (cookies) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${cookies.Authorization}`;
    }
  }, [cookies]);

  return (
    <>
      <Header shadow={isHasShadow}>
        <Logo>
          <button type="button">HAJULA</button>
        </Logo>
        <RoomSearchForm shadow={isHasShadow} />
        <ToggleMenuButton>
          <button type="button" onClick={handleToggleMenuButtonClick}>
            {user ? (
              <span>
                👉🏻 <em>{user}</em>님, 안녕하세요
              </span>
            ) : (
              <span>👉🏻 로그인 해주세요</span>
            )}
            <span className="menu">
              <IoMdMenu />
            </span>
            {/* <span className="profile">
              <FaUserCircle />
            </span> */}
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
            id={id}
            password={password}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loginError={loginError}
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
      & + main {
        position: relative;
        margin-top: 200px;
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

const Nav = styled.nav`
  button {
    color: #fff;
    font-size: 1.5rem;
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
