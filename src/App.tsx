import './App.css';
import { InputList, ButtonList, LoginForm } from './Wrappers';
import { TaskCard } from './Components';

function App() {
  return (
    <div className="page">
      <ButtonList />
      <InputList />
      <LoginForm />
      <TaskCard flagStatus="done" />
    </div>
  );
}
export default App;
