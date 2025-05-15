
import React from 'react';
import MainSidebar from '@/components/MainSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  hideFooter?: boolean;
}

const PageLayout = ({ children, currentPath = '/', hideFooter = false }: PageLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <MainSidebar currentPath={currentPath} />
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        
        {!hideFooter && <Footer />}
      </div>
    </div>
  );
};

export default PageLayout;
