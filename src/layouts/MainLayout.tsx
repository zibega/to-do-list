import { Outlet } from 'react-router';
import { Header, Subbar } from '../components';

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <Subbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};