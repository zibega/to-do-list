import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { HomePage, LoginPage, NotFoundPage } from './pages';
import { MainLayout } from './layouts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;