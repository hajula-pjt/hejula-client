import React, { FC } from "react";

export type AdminLayoutProps = {
  children: React.ReactNode;
  isVisibleNav: boolean;
};

const AdminLayout: FC<AdminLayoutProps> = ({ children, isVisibleNav }) => {
  return (
    <>
      {isVisibleNav && (
        <nav>
          <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
          </ul>
        </nav>
      )}
      {children}
    </>
  );
};

export default AdminLayout;
