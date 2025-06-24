import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar'; // Adjust the path if needed
import { AppSidebar } from '../components/sidebar'; // Adjust the path if needed
import { Navbar } from '../components/navbar'; // Adjust the path if needed
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="bg-[#212121]">
      <SidebarProvider>
        <AppSidebar />
        <Navbar />
        <div className="cursor-pointer text-3xl">
          <SidebarTrigger className="text-white scale-150 m-3" />
        </div>
        <div className="w-full md:w-1/2 mx-auto mt-12">
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default RootLayout;
