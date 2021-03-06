import styled from "@emotion/styled";
import Link from "next/link";

import { IoMdMenu } from "react-icons/io";

const HamburgerMenu = ({
  toggleMenuOpen,
  user,
  adminUser,
  onMenuButtonClickToggle,
  onLoginModalToggle,
  onLogoutClick,
}) => {
  return (
    <>
      <ToggleMenuButton>
        <button type="button" onClick={onMenuButtonClickToggle}>
          {user ? (
            <span>
              ππ» <em>{user?.nickname}</em>
              λ, μλνμΈμ
            </span>
          ) : (
            <span>ππ» λ‘κ·ΈμΈ ν΄μ£ΌμΈμ</span>
          )}
          <span className="menu">
            <IoMdMenu />
          </span>
        </button>
      </ToggleMenuButton>
      {toggleMenuOpen && (
        <ToggleMenus>
          <li>
            {user ? (
              <button type="button" onClick={onLogoutClick}>
                λ‘κ·Έμμ
              </button>
            ) : (
              <button type="button" onClick={onLoginModalToggle}>
                λ‘κ·ΈμΈ
              </button>
            )}
          </li>
          <li>
            <Link href={adminUser ? "/admin/home" : "/admin/login"}>
              <button type="button">κ΄λ¦¬μ νμ΄μ§</button>
            </Link>
          </li>
        </ToggleMenus>
      )}
    </>
  );
};

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
  li + li {
    border-top: 1px solid #dcdcdc;
  }
  li button,
  li a {
    padding: 20px;
    width: 100%;
    text-align: left;
  }
`;

export default HamburgerMenu;
