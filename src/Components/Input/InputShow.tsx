import React, { useState } from 'react';
import { Input } from './Input';

export function InputShow() {
  const [clearableText, setClearableText] = useState('Можно очистить');
  const [searchText, setSearchText] = useState('');

  return(
    <div
      style={{
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 12,
        width: 520,
        maxWidth: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <h2 style={{ margin: 0, textAlign: 'center' }}>Все варианты Input</h2>


      <Input variant="outlined" placeholder="Outlined (по умолчанию)" />
      <Input variant="filled" placeholder="Filled вариант" />
      <Input variant="underlined" placeholder="Underlined вариант" />

      <Input type="text" label="Текст (with label)" placeholder="Введите текст" />
      <Input type="number" label="Номер" placeholder="Введите число" />
      <Input
        type="email"
        label="Email"
        placeholder="example@mail.com"
        leftIcon="✉️"
        helperText="Мы не передаём ваш email третьим лицам"
      />
      <Input
        type="search"
        label="Поиск"
        placeholder="Поиск..."
        leftIcon="🔍"
        clearable
        value={searchText}
        onChange={(e) =>setSearchText(e.target.value)}
        onClear={() =>setSearchText('')}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Введите пароль"
        defaultValue="secret123"
      />
      <Input type="checkbox" label="Checkbox (Согласен с условиями)" />

      <Input size="sm" placeholder="Размер sm" />
      <Input size="md" placeholder="Размер md" />
      <Input size="lg" placeholder="Размер lg" />

      <Input
        label="Clearable"
        clearable
        value={clearableText}
        onChange={(e) =>setClearableText(e.target.value)}
        onClear={() =>setClearableText('')}
        rightIcon="✏️"
      />
      <Input label="Disabled" disabled value="Поле отключено" />
      <Input label="ReadOnly" readOnly defaultValue="Только для чтения" />
      <Input
        label="Error (строка)"
        error="Обязательное поле для заполнения"
        helperText="Этот текст скрыт"
        defaultValue="Некорректное значение"
      />
      <Input label="Error (boolean)" error defaultValue="Просто красная рамка" />
      <Input
        label="FullWidth"
        fullWidth
        placeholder="Растянут на 100% ширины"
      />
    </div>
  );
}