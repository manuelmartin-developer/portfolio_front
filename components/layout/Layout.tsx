type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return <main className="main">{children}</main>;
};

export default Layout;
