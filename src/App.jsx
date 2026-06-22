import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./admin/auth/AuthContext";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import ServiceDetail from "./pages/ServiceDetail";
import SoftwareDetail from "./pages/SoftwareDetail";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import LoginPage from "./admin/pages/LoginPage";
import DashboardPage from "./admin/pages/DashboardPage";
import HeroEditor from "./admin/pages/HeroEditor";
import AboutEditor from "./admin/pages/AboutEditor";
import ServicesEditor from "./admin/pages/ServicesEditor";
import SoftwareEditor from "./admin/pages/SoftwareEditor";
import ServiceDetailEditor from "./admin/pages/ServiceDetailEditor";
import FooterEditor from "./admin/pages/FooterEditor";

function App() {
  return (
    <Router basename="/madinah">
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Public routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/service" element={<ServiceDetail />} />
              <Route path="/download" element={<SoftwareDetail />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="hero" element={<HeroEditor />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="services" element={<ServicesEditor />} />
              <Route path="software" element={<SoftwareEditor />} />
              <Route path="service-detail" element={<ServiceDetailEditor />} />
              <Route path="footer" element={<FooterEditor />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
