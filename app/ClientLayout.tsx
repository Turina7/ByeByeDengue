"use client";
import TabMenu from "./components/tabMenu/tabMenu";
import Footer from "./components/footer/footer";
import { AuthProvider } from '@/contexts/AuthContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <TabMenu />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default ClientLayout;