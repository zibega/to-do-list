import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../Components';

interface LoginFormValues {
  login: string;
  password: string;
  rememberMe: boolean;
}

export function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = () => {
    console.log({
      login,
      password,
      rememberMe,
    });
  };

  return (
    <form className="card" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="card-title">Вход</h2>

      <Input
        label="Логин"
        placeholder="Введите логин"
        fullWidth
        error={errors.login?.message}
        {...register('login', {
          required: 'Введите логин',
          minLength: {
            value: 3,
            message: 'Минимум 3 символа',
          },
          onChange: (e) => setLogin(e.target.value),
        })}
      />

      <Input
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        fullWidth
        error={errors.password?.message}
        {...register('password', {
          required: 'Введите пароль',
          minLength: {
            value: 6,
            message: 'Минимум 6 символов',
          },
          onChange: (e) => setPassword(e.target.value),
        })}
      />

      <Input
        type="checkbox"
        label="Запомнить меня"
        {...register('rememberMe', {
          onChange: (e) => setRememberMe(e.target.checked),
        })}
      />

      <Button type="submit" variant="primary" fullWidth>
        Войти
      </Button>
    </form>
  );
}
