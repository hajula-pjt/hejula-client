import React, { useEffect, useRef } from "react";

import styled from "@emotion/styled";

import { FaTimes } from "react-icons/fa";
import { ReactChild } from "react";

const Modal = ({
  children,
  title,
  onOutsideClick,
}: {
  children: ReactChild;
  title: string;
  onOutsideClick: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const handleClick = ({ target }) => {
      if (modalRef.current) {
        const isOutside = modalRef.current.contains(target);

        if (!isOutside) {
          onOutsideClick();
        }
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [modalRef, onOutsideClick]);

  return (
    <Wrap>
      <Inner ref={modalRef}>
        <Header>
          <button type="button" onClick={onOutsideClick}>
            <FaTimes />
          </button>
          {title}
        </Header>
        <Body>{children}</Body>
      </Inner>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const Inner = styled.div`
  max-width: 500px;
  width: 100%;
  background: #fff;
`;

const Header = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding: 25px 50px;
  text-align: center;
  border-bottom: 1px solid #dcdcdc;

  button {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 70px;
    height: 100%;
    font-size: 20px;
  }
`;

const Body = styled.div`
  padding: 0 50px 30px;
`;

export default Modal;
