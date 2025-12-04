import React, { useEffect, useState } from 'react'
import { Typography, CircularProgress, Alert, List, ListItem, ListItemText } from '@mui/material'
import api from '../api.js'

export default function ClientAppointmentsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await api.get('/appointments/me/cliente')
        setItems(response.data)
      } catch (err) {
        setErro('Erro ao carregar agendamentos do cliente')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Meus agendamentos (cliente)
      </Typography>
      {loading && <CircularProgress />}
      {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
      <List>
        {items.map(a => (
          <ListItem key={a.id}>
            <ListItemText
              primary={`${a.service?.titulo} - ${a.status}`}
              secondary={`Data/Hora: ${a.dataHora}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  )
}
