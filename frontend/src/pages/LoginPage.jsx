import React, { useState } from 'react'
import { TextField, Button, Typography, Box, Alert } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api.js'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      const response = await api.post('/auth/login', { email, senha })
      localStorage.setItem('token', response.data.token)
      navigate('/')
    } catch (err) {
      setErro('Falha no login. Verifique os dados.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Entrar
      </Typography>
      {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Senha"
        type="password"
        fullWidth
        margin="normal"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 2 }}>
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
      <Typography sx={{ mt: 2 }}>
        Não tem conta? <Link to="/registro">Registrar</Link>
      </Typography>
    </Box>
  )
}
