import { Link, useNavigate } from 'react-router';
import { LoginForm } from '../wrappers';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ flexDirection: 'column', gap: 12 }}>
      <LoginForm onSuccess={() => navigate('/')} />
      <Link
        to="/"
        style={{
          color: '#0013fe',
          fontSize: 14,
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        ← На главную
      </Link>
    </div>
  );
};