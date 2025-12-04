import React, { useState } from 'react'
import { TextField, Button, Typography, Box, Alert, FormControlLabel, Checkbox } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api.js'

export default function RegisterPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [profissional, setProfissional] = useState(false)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      await api.post('/auth/register', { nome, email, senha, profissional })
      navigate('/login')
    } catch (err) {
      setErro('Erro ao registrar. Tente outro email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Registro
      </Typography>
      {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
      />
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
      <FormControlLabel
        control={
          <Checkbox
            checked={profissional}
            onChange={e => setProfissional(e.target.checked)}
          />
        }
        label="Conta de profissional (cadastra serviços)"
      />
      <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 2 }}>
        {loading ? 'Registrando...' : 'Registrar'}
      </Button>
      <Typography sx={{ mt: 2 }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </Typography>
    </Box>
  )
}
