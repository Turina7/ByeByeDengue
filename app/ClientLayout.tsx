"use client";
import TabMenu from "./components/tabMenu/tabMenu";
import Footer from "./components/footer/footer";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <>
      <TabMenu />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;
