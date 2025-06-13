import Home from './pages/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Carteirinha from './pages/Carteirinha'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute'
import { AuthProvider } from './contexts'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/carteirinha' element={<Carteirinha/>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;