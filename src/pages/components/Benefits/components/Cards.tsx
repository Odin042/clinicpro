import { Box , Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import * as S from './styles'

type CardsProps = {
  icone: string,
  title: string,
  description: string,
}

export const Cards = ({ icone, title, description }: CardsProps) => {
  return (
    <S.Container>
      <Card sx={{ width: 300, height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <img src={icone} alt="icone" style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: '#49504E' }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </S.Container>
  )
}
