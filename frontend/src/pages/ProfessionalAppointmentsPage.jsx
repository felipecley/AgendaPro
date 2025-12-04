import React, { useEffect, useState } from 'react'
import { Typography, CircularProgress, Alert, List, ListItem, ListItemText, Button } from '@mui/material'
import api from '../api.js'

export default function ProfessionalAppointmentsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const response = await api.get('/appointments/me/profissional')
      setItems(response.data)
    } catch (err) {
      setErro('Erro ao carregar agenda do profissional')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, null, {
        params: { status }
      })
      load()
    } catch (err) {
      alert('Erro ao atualizar status')
    }
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Agenda do profissional
      </Typography>
      {loading && <CircularProgress />}
      {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
      <List>
        {items.map(a => (
          <ListItem key={a.id} secondaryAction={
            <>
              <Button size="small" onClick={() => updateStatus(a.id, 'CONFIRMADO')}>Confirmar</Button>
              <Button size="small" onClick={() => updateStatus(a.id, 'CANCELADO')}>Cancelar</Button>
            </>
          }>
            <ListItemText
              primary={`${a.service?.titulo} - ${a.status}`}
              secondary={`Cliente: ${a.cliente?.email} | Data/Hora: ${a.dataHora}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  )
}
