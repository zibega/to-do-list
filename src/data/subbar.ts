import avatar1 from '../assets/Avatar.png';
import avatar2 from '../assets/Avatar1.png';
import avatar3 from '../assets/Avatar2.png';
import avatar4 from '../assets/Avatar3.png';
import { SubbarProps } from '../components';

export const SUBBAR_DATA: SubbarProps = {
  title: 'Product Design Team',
  badge: 'Sprint 9',
  avatars: [avatar1, avatar2, avatar3, avatar4],
  extraMembersCount: 4,
  onActionClick: () => console.log('New member clicked'),
};