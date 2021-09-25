import styled from "@emotion/styled";
import Link from "next/Link";

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
            {user ? (
              <button type="button" onClick={onLogoutClick}>
                로그아웃
              </button>
            ) : (
              <button type="button" onClick={onLoginModalToggle}>
                로그인
              </button>
            )}
          </li>
          <li>
            <Link href={adminUser ? "/admin/home" : "/admin/login"}>
              <button type="button">관리자 페이지</button>
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
