
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
    <div className="flex h-screen w-full overflow-hidden">
      <MainSidebar currentPath={currentPath} />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-auto w-full h-full">
          <div className="w-full h-full">
            {children}
          </div>
        </main>
        
        {!hideFooter && <Footer />}
      </div>
    </div>
  );
};

export default PageLayout;
