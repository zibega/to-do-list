import React, {forwardRef,useRef,useState} from 'react';
import './App.css';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  variant?: 'primary'|'secondary'|'danger';
  size?: 'sm'|'md'|'lg';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled = false,
    leftIcon,
    rightIcon,
    className = '',
    type = 'button',
    children,
    ...props
    },
    ref
  )=>{
    let classes = `bttn ${variant} ${size}`;
    if (fullWidth) classes += ' full-width';
    if (className) classes += ` ${className}`;
    return(
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        {...props}>
        {loading ? (
          'Loading...'
        ):(<>
            {leftIcon && <span>{leftIcon}</span>}
            {children}
            {rightIcon && <span>{rightIcon}</span>}
           </>
        )}
      </button>
      );
  });
function App() {
  const [loading, setLoading] = useState(false);
  const myRef = useRef<HTMLButtonElement>(null);
  const handleClick = () =>{
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };
  return(
    <div className="page">
      <div className="card">
        <h2 className="card-title">Кнопки</h2>
        <Button
          ref={myRef}
          variant="primary"
          size="md"
          leftIcon="➕"
          loading={loading}
          onClick={handleClick}>
          Добавить
        </Button>
        <Button variant="secondary" size="sm" rightIcon="➡️">
          Далее
        </Button>
        <Button variant="danger" size="lg" disabled>
          Удалить
        </Button>
        <Button variant="primary" fullWidth className="my-class">
          На всю ширину
        </Button>
      </div>
    </div>);
}
export default App;