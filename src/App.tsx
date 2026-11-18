import './App.css';
import avatar1 from './assets/Avatar.png';
import avatar2 from './assets/Avatar1.png';
import avatar3 from './assets/Avatar2.png';
import { TaskCard } from './components';
import { ButtonList, InputList, LoginForm } from './wrappers';
import { FlagStatus } from './types';

const taskCardData = [
  {
    id: '1',
    title: 'User Research',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque ...',
    tag: 'Maecenas Lacus',
    attachmentsCount: 3,
    status: 'done',
    date: 'Mar 4',
    avatars: [avatar1, avatar2, avatar3],
  },
  {
    id: '2',
    title: 'Design Review',
    description: 'Карточка без вложений с серой скрепкой',
    tag: '---',
    attachmentsCount: 0,
    status: 'in progress',
    date: '---',
    avatars: [avatar2],
  },
];
function App() {
  return (
    <div className="page">
      <ButtonList />
      <InputList />
      <LoginForm />

      {taskCardData.map(
        ({ id, title, description, tag, attachmentsCount, status, date, avatars }) => (
          <TaskCard
            title={title}
            description={description}
            tag={tag}
            attachmentsCount={attachmentsCount}
            status={status as FlagStatus}
            date={date}
            avatars={avatars}
          />
        ),
      )}
    </div>
  );
}

export default App;
