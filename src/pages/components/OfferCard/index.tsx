import React from 'react'
import * as S from './styles'
import { Cards } from './components/Card'
import { Typography } from '@mui/material'

export const OfferCard = () => {
  return (
    <S.Container>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0A2472', marginBottom: '20px' }}>
        Planos
      </Typography>
      <Cards  title={'Clinic360'} subtitle={'Perfeito para consultorios pequenos'} value={'R$ 89 / Mês'} benefits={'Acesso a plataforma'}  />
    </S.Container>
  )
}
