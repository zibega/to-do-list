import { NavLink } from 'react-router';
import { BacklogIcon, BoardIcon, FeedIcon, ReportsIcon } from '../Icons';
import './Header.css';

const NAV_ITEMS = [
  { to: '/backlog', label: 'Backlog', icon: <BacklogIcon /> },
  { to: '/', label: 'Board', icon: <BoardIcon /> },
  { to: '/feed', label: 'Feed', icon: <FeedIcon /> },
  { to: '/reports', label: 'Reports', icon: <ReportsIcon /> },
];

export const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `header-link ${isActive ? 'header-link--active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
