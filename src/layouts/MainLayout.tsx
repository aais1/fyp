import { Outlet } from 'react-router-dom';
import Header from '../components/Shared/Header';
import Footer from '../components/Shared/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
