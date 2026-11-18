import React, { useState,useRef } from 'react';
import { Button, ButtonProps } from '../components';
interface ButtonItem extends ButtonProps {
  id: string;
  text: string;
  ref?: React.Ref<HTMLButtonElement>;
}
export const ButtonList =() =>{
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
      fullWidth: false,
      onClick: handleClick,
    },
    {
      id: '2',
      text: 'Далее',
      variant: 'secondary',
      size: 'sm',
      rightIcon: '➡️',
      fullWidth: false,
    },
    {
      id: '3',
      text: 'Удалить',
      variant: 'danger',
      size: 'lg',
      disabled: true,
      fullWidth: false,
    },
    {
      id: '4',
      text: isFullWidth ? 'Вернуть обычный размер' : 'На всю ширину',
      variant: 'primary',
      fullWidth: isFullWidth,
      className: 'my-class',
      onClick: () => setIsFullWidth(!isFullWidth),
    },
  ];
  
    return (  <div className= "card">
        <h2 className="card-title">Кнопки</h2>
        {buttons.map(({ id, text, ...btnProps })=>(
          <Button key={id} {...btnProps}>
            {text}
          </Button>
          ))}
      </div>)
}