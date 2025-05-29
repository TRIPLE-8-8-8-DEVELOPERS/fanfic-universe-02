import React from 'react';
import MainSidebar from '@/components/MainSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  hideFooter?: boolean;
}

const PageLayout = ({
  children,
  currentPath = '/',
  hideFooter = false,
}: PageLayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background" data-testid="layout-root">
      {currentPath !== "/settings" && <MainSidebar currentPath={currentPath} />}

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />

        <main
          role="main"
          className="flex-1 overflow-auto w-full pt-16"
          data-testid="layout-main"
        >
          <div className="w-full h-full px-4 py-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {!hideFooter && <Footer />}
      </div>
    </div>
  );
};

export default PageLayout;
