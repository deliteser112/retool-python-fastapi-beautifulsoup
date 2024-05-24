import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DEFAULT_TITLE = "User | Home";

const Layout: React.FC<LayoutProps> = ({ children, title = DEFAULT_TITLE }) => {
  return (
    <div>
      <Header title={title} />
      <main className="max-w-[1200px] mx-auto my-2 p-4">{children}</main>
    </div>
  );
};

export default Layout;
