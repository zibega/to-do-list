import React, { useRef, useState } from 'react';
import './App.css';
import { Button, ButtonProps } from './Components/Button/Button';

interface ButtonItem extends ButtonProps {
  id: string;
  text: string;
  ref?: React.Ref<HTMLButtonElement>;
}
function App() {
  const [loading, setLoading] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const myRef = useRef<HTMLButtonElement>(null);
  const handleClick =()=>{
    setLoading(true);
    setTimeout(() =>setLoading(false), 1500);
  };
  const buttons: ButtonItem[]=[
    {
      id: '1',
      text: 'Добавить',
      ref: myRef,
      variant: 'primary',
      size: 'md',
      leftIcon: '➕',
      loading: loading,
      fullWidth: isFullWidth,
      onClick: handleClick,
    },
    {
      id: '2',
      text: 'Далее',
      variant: 'secondary',
      size: 'sm',
      rightIcon: '➡️',
      fullWidth: isFullWidth,
    },
    {
      id: '3',
      text: 'Удалить',
      variant: 'danger',
      size: 'lg',
      disabled: true,
      fullWidth: isFullWidth,
    },
    {
      id: '4',
      text: isFullWidth ? 'Вернуть обычный размер' : 'На всю ширину',
      variant: 'primary',
      fullWidth: true,
      className: 'my-class',
      onClick: () => setIsFullWidth(!isFullWidth),
    },
  ];
  return (
    <div className="page">
      <div className={`card ${isFullWidth ? 'card-full' : ''}`}>
        <h2 className="card-title">Кнопки</h2>
        {buttons.map(({ id, text, ...btnProps })=>(
          <Button key={id} {...btnProps}>
            {text}
          </Button>
          ))}
      </div>
    </div>    
  );
}
export default App;