import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <div className="page">
      <div className="card">
        <h2 className="card-title">404 — Страница не найдена</h2>
        <p style={{ margin: 0, textAlign: 'center', color: '#6b7280' }}>
          Возможно, вы перешли по неверной ссылке или страница была удалена.
        </p>
        <Link to="/">Вернуться на главную</Link>
      </div>
    </div>
  );
};