import HeaderComp from "./component/header/header";
import Sidebar from "./component/sidebar/sidebar";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="h-screen bg-gray-100 overflow-hidden">
        
        <div className="fixed top-0 left-0 w-full h-16 z-50">
          <HeaderComp />
        </div>

        <div className="flex pt-16 h-screen">
          
          <Sidebar />

          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}