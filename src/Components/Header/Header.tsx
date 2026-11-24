import React from 'react';
import { NavLink } from 'react-router';
import './Header.css';

export interface HeaderNavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

export interface HeaderProps {
  items: HeaderNavItem[];
}

export const Header = ({ items }: HeaderProps) => {
  return (
    <header className="header">
      <nav className="header-nav">
        {items.map((item) => (
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
