import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import Layout from './layout'
import Login from '../views/login'
import HomePage from '../views/homepage';
import Hours from '../views/hourspage';
import UserPage from '../views/userpage';
import AttendancePage from '../views/attendancepage';
import AdminPage from '../views/adminpage';

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout children={[]} />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/hours" element={<Hours />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/admin_page" element={<AdminPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);
