import { BacklogIcon, BoardIcon, FeedIcon, HeaderNavItem, ReportsIcon } from '../components';

export const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { to: '/backlog', label: 'Backlog', icon: <BacklogIcon /> },
  { to: '/', label: 'Board', icon: <BoardIcon /> },
  { to: '/feed', label: 'Feed', icon: <FeedIcon /> },
  { to: '/reports', label: 'Reports', icon: <ReportsIcon /> },
];
