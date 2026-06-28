import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import GetInvolved from './pages/GetInvolved';
import Donate from './pages/Donate';
import NotFound from './pages/NotFound';

import { AuthProvider } from './admin/AuthContext';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import CollectionEditor from './admin/CollectionEditor';
import SettingsEditor from './admin/SettingsEditor';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public site */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="collections/:key" element={<CollectionEditor />} />
            <Route path="settings/:key" element={<SettingsEditor />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
