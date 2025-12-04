import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ClientAppointmentsPage from './pages/ClientAppointmentsPage.jsx'
import ProfessionalAppointmentsPage from './pages/ProfessionalAppointmentsPage.jsx'

function isAuthenticated() {
  return !!localStorage.getItem('token')
}

function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Trabalho Final Frameworks - AgendaPro
          </Typography>
          <Button color="inherit" component={Link} to="/">Serviços</Button>
          <Button color="inherit" component={Link} to="/cliente/agendamentos">Meus Agendamentos</Button>
          <Button color="inherit" component={Link} to="/profissional/agendamentos">Agenda Profissional</Button>
          {isAuthenticated() ? (
            <Button color="inherit" onClick={handleLogout}>Sair</Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">Entrar</Button>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/cliente/agendamentos" element={
            <PrivateRoute>
              <ClientAppointmentsPage />
            </PrivateRoute>
          } />
          <Route path="/profissional/agendamentos" element={
            <PrivateRoute>
              <ProfessionalAppointmentsPage />
            </PrivateRoute>
          } />
        </Routes>
      </Container>
    </>
  )
}
