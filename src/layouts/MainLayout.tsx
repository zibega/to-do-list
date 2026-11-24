import { Outlet } from 'react-router';
import { Header, HeaderNavItem, Subbar, SubbarProps } from '../components';

export interface MainLayoutProps {
  navItems: HeaderNavItem[];
  subbar: SubbarProps;
}

export const MainLayout = ({ navItems, subbar }: MainLayoutProps) => {
  return (
    <div>
      <Header items={navItems} />
      <Subbar {...subbar} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
