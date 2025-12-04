import React, { useEffect, useState } from 'react'
import { Typography, CircularProgress, Alert, Grid, Card, CardContent, CardActions, Button, TextField, Box } from '@mui/material'
import api from '../api.js'

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [duracao, setDuracao] = useState('')

  const token = localStorage.getItem('token')

  const loadServices = async () => {
    setLoading(true)
    try {
      const response = await api.get('/services')
      setServices(response.data)
    } catch (err) {
      setErro('Erro ao carregar serviços')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  const handleCreateService = async (e) => {
    e.preventDefault()
    try {
      await api.post('/services', {
        titulo,
        descricao,
        preco: parseFloat(preco),
        duracaoMinutos: parseInt(duracao, 10)
      })
      setTitulo('')
      setDescricao('')
      setPreco('')
      setDuracao('')
      loadServices()
    } catch (err) {
      setErro('Erro ao criar serviço (apenas profissional autenticado)')
    }
  }

  const handleCreateAppointment = async (serviceId) => {
    const dataHora = prompt('Informe a data e hora (formato 2025-12-05T14:00)')
    if (!dataHora) return
    try {
      await api.post('/appointments', {
        serviceId,
        dataHora
      })
      alert('Agendamento criado como PENDENTE')
    } catch (err) {
      alert('Erro ao criar agendamento (precisa estar logado como cliente)')
    }
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Serviços disponíveis
      </Typography>
      {loading && <CircularProgress />}
      {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

      {token && (
        <Box component="form" onSubmit={handleCreateService} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>Cadastrar novo serviço (profissional)</Typography>
          <TextField
            label="Título"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Preço"
            type="number"
            value={preco}
            onChange={e => setPreco(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Duração (minutos)"
            type="number"
            value={duracao}
            onChange={e => setDuracao(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Salvar serviço
          </Button>
        </Box>
      )}

      <Grid container spacing={2}>
        {services.map(service => (
          <Grid item xs={12} md={4} key={service.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{service.titulo}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>{service.descricao}</Typography>
                <Typography variant="body2">Preço: R$ {service.preco}</Typography>
                <Typography variant="body2">Duração: {service.duracaoMinutos} minutos</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleCreateAppointment(service.id)}>
                  Agendar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
