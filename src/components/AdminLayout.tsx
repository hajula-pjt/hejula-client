import styled from "@emotion/styled";
import React, { FC } from "react";

export type AdminLayoutProps = {
  children: React.ReactNode;
  isVisibleNav: boolean;
};

const AdminLayout: FC<AdminLayoutProps> = ({ children, isVisibleNav }) => {
  return (
    <Container>
      {isVisibleNav && (
        <nav>
          <ul>
            <li></li>
          </ul>
        </nav>
      )}
      {children}
    </Container>
  );
};

const Container = styled.div`
  padding: 30px;
  background: #f9f9fd;
`;

export default AdminLayout;
