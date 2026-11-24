import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { HEADER_NAV_ITEMS } from './data/navigation';
import { SUBBAR_DATA } from './data/subbar';
import { MainLayout } from './layouts';
import { HomePage, LoginPage, NotFoundPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout navItems={HEADER_NAV_ITEMS} subbar={SUBBAR_DATA} />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
