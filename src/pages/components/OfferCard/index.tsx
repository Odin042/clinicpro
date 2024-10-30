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
      <S.WrapperCards>
        <Cards  title={'Clinic360'} subtitle={'Perfeito para consultorios pequenos'} value={'R$ 89 / Mês'} benefits={'Acesso a plataforma'}  />
        <Cards  buttonTextColor='#0A2472' buttonColor='#ffff'benefitsColor='#ffff' valueColor='#ffff' titleColor='#ffff' subtitleColor='#ffff' backgroundColor={'#0A2472'} title={'Business'} subtitle={'Para gerenciar atendimentos de mais de um profissional'} value={'R$ 120 / Mês'} benefits={'Acesso a plataforma'}  />
      </S.WrapperCards>
    </S.Container>
  )
}
