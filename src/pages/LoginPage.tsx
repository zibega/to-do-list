import { Link, useNavigate } from 'react-router';
import './LoginPage.css';
import { LoginForm } from '../wrappers';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page login-page">
      <LoginForm onSuccess={() => navigate('/')} />
      <Link to="/" className="login-back-link">
        ← На главную
      </Link>
    </div>
  );
};
