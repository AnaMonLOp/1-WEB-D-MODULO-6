import { createRoot } from 'react-dom/client';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx'
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import PostDetail from './pages/PostDetail.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="profile/:username" element={<Profile />} />
        <Route path="tweet/:id" element={<PostDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
