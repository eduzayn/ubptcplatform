import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import HomePage from './pages/HomePage';
import AdminLayout from './components/admin/AdminLayout';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import MembersPage from './pages/admin/MembersPage';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import LibraryPage from './pages/LibraryPage';
import CommunityPage from './pages/CommunityPage';
import CalendarEventsPage from './pages/CalendarEventsPage';
import AssociationPage from './pages/AssociationPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountSettings from './pages/AccountSettings';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/calendar" element={<CalendarEventsPage />} />
              <Route path="/association" element={<AssociationPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              
              {/* Rotas de Perfil */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/settings" element={<AccountSettings />} />
              <Route path="/my-courses" element={<ProfilePage />} />

              {/* Rotas Administrativas */}
              <Route
                path="/admin/*"
                element={
                  <AdminLayout>
                    <Routes>
                      <Route index element={<AdminDashboard />} />
                      <Route path="members" element={<MembersPage />} />
                      <Route path="courses/*" element={<AdminDashboard />} />
                      <Route path="content/*" element={<AdminDashboard />} />
                      <Route path="events/*" element={<AdminDashboard />} />
                      <Route path="settings/*" element={<AdminDashboard />} />
                      <Route path="*" element={<Navigate to="/admin" replace />} />
                    </Routes>
                  </AdminLayout>
                }
              />

              {/* Rota 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
