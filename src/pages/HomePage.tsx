import { Link } from 'react-router';

export const HomePage = () => {
  return (
    <div style={{ padding: 24 }}>
      <h1>Главная страница (пока пусто )</h1>
      <Link to="/login">Перейти на страницу логина</Link>
    </div>
  );
};
