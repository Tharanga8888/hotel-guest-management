import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import GuestsListPage from './pages/GuestsListPage';
import NewGuestPage from './pages/NewGuestPage';
import GuestDetailPage from './pages/GuestDetailPage';


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/guests" replace />} />
        <Route path="/guests" element={<GuestsListPage />} />
        <Route path="/guests/new" element={<NewGuestPage />} />
        <Route path="/guests/:id" element={<GuestDetailPage />} />
      </Routes>
    </Layout>
  );
}