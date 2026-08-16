import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import PrivateRoute from './components/auth/PrivateRoute'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Dashboard from './pages/Dashboard'
import Productos from './pages/Productos'
import Extras from './pages/Extras'
import Pedidos from './pages/Pedidos'
import Metrics from './pages/Metrics'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/extras" element={<Extras />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/metricas" element={<Metrics />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
