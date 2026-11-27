import { Outlet } from 'react-router';
import './MainLayout.css';
import { Header, HeaderNavItem, Subbar, SubbarProps } from '../components';

export interface MainLayoutProps {
  navItems: HeaderNavItem[];
  subbar: SubbarProps;
}

export const MainLayout = ({ navItems, subbar }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <Header items={navItems} />
      <Subbar {...subbar} />
      <main className="main-layout-content">
        <Outlet />
      </main>
    </div>
  );
};
