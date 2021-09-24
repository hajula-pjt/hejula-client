import React, { useState, FC } from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import RoomSearchForm from "../domain/RoomSearch/SearchForm/RoomSearchForm";
import LoginForm from "../domain/Login/LoginForm";
import Modal from "./Modal";
import HamburgerMenu from "./HamburgerMenu";

import {
  useLogin,
  useLoginCookie,
  useLoginUserInfo,
} from "../domain/Login/hooks";
import { setUserInfo, removeUserInfo } from "../domain/Login/utils";
import { TCookieKey, TStotageKey } from "../domain/Login/type";
import { postLogin } from "../api/user/postLogin";

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
  const [toggleMenuOpen, setToggleMenuOpen] = useState(false);
  const [loginFormOpen, setLoginFormOepn] = useState(false);

  const cookieKey: TCookieKey = "Authorization";
  const storageKey: TStotageKey = "userInfo";

  const { removeCookie, handleSetCookie } = useLoginCookie({ cookieKey });
  const { user, handleSetUser } = useLoginUserInfo({ storageKey });
  const { loginFields, loginError, handleChange, handleSetLoginError } =
    useLogin();

  const { id, password } = loginFields;

  const handleToggleMenuVisible = (status: boolean) => {
    setToggleMenuOpen(status);
  };

  const handleLoginModalVisible = (status: boolean) => {
    setLoginFormOepn(status);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const result = await postLogin({ id, password });

      setUserInfo({
        userInfo: result,
        storageKey: "userInfo",
        cookieKey: "Authorization",
        setUser: handleSetUser,
        setCookie: handleSetCookie,
      });

      handleToggleMenuVisible(false);
      handleLoginModalVisible(false);

      handleSetLoginError(null);
    } catch (e) {
      handleSetLoginError({ message: e.message });
    }
  };

  const handleLogoutClick = () => {
    removeUserInfo({
      cookieKey,
      storageKey,
      removeCookie,
      setUser: handleSetUser,
    });
  };

  return (
    <>
      <Header shadow={!isMainPage}>
        <Logo>
          <button type="button">HAJULA</button>
        </Logo>
        {!isUnVisibleSearchForm && <RoomSearchForm shadow={!isMainPage} />}
        <HamburgerMenu
          toggleMenuOpen={toggleMenuOpen}
          user={user}
          onMenuButtonClickToggle={() =>
            handleToggleMenuVisible(!toggleMenuOpen)
          }
          onLoginModalToggle={() => handleLoginModalVisible(!loginFormOpen)}
          onLogoutClick={handleLogoutClick}
        />
      </Header>
      {loginFormOpen && (
        <Modal
          title="로그인"
          onOutsideClick={() => handleLoginModalVisible(false)}
        >
          <LoginForm
            loginFields={loginFields}
            loginError={loginError}
            onSubmit={handleSubmit}
            onChange={handleChange}
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

export default AppLayout;
