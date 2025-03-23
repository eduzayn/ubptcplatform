import { Suspense, lazy, useState } from "react";
import {
  useRoutes,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

const AdminPage = lazy(() => import("./components/admin/AdminPage"));
const CoursesPage = lazy(() => import("./components/courses/CoursesPage"));
const ProfilePage = lazy(() => import("./components/profile/ProfilePage"));
const CheckoutPage = lazy(() => import("./components/checkout/CheckoutPage"));
const CommunityPage = lazy(
  () => import("./components/community/CommunityPage"),
);
const LibraryPage = lazy(() => import("./components/library/LibraryPage"));
const CalendarEventsPage = lazy(
  () => import("./components/events/CalendarEventsPage"),
);
const AssociationPage = lazy(() => import("./components/auth/AssociationPage"));

import React from "react";

// Auth context to manage authentication state
const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (isAdmin?: boolean) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const login = (isAdmin: boolean = false) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
    if (isAdmin) {
      navigate("/admin");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/");
  };

  // Protected route component
  const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAdmin) {
      return <Navigate to="/" />;
    }
    return <>{children}</>;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      <Suspense fallback={<p>Carregando...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedAdminRoute>
                  <AdminPage />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:tab" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/events" element={<CalendarEventsPage />} />
            <Route path="/associe-se" element={<AssociationPage />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
