import { Link } from 'react-router';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="page">
      <div className="card">
        <p className="not-found-code">404</p>
        <h2 className="card-title">Страница не найдена</h2>
        <p className="not-found-text">
          Похоже, такой страницы не существует или она была перемещена.
        </p>
        <Link to="/" className="not-found-link">
          На главную
        </Link>
      </div>
    </div>
  );
};