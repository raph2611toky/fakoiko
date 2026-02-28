import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import ReportWaste from './pages/ReportWaste'
import AcceptMission from './pages/AcceptMission'
import RecyclingCenter from './pages/RecyclingCenter'
import Municipality from './pages/Municipality'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

import './styles/app.css'

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="app-layout">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/report-waste" element={
                  <ProtectedRoute>
                    <ReportWaste />
                  </ProtectedRoute>
                } />
                <Route path="/accept-mission" element={
                  <ProtectedRoute requiredRoles={['collector', 'validator']}>
                    <AcceptMission />
                  </ProtectedRoute>
                } />
                <Route path="/recycling-center" element={
                  <ProtectedRoute>
                    <RecyclingCenter />
                  </ProtectedRoute>
                } />
                <Route path="/municipality" element={
                  <ProtectedRoute requiredRoles={['municipality']}>
                    <Municipality />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
