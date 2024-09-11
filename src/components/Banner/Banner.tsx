import React from 'react'
import * as S from './styles'
import { Typography } from '@mui/material'
import BannerImg from '../assets/banner.jpg'

export const Banner = () => {
  return (
    <S.Container>
      <S.Title>
        <Typography variant='h3'>Seja Bem-Vindo ao ClinicPRO</Typography>
        <Typography>A maior plataforma de gestão de consultórios do Brasil</Typography>
      </S.Title>
      <S.ImageBanner>
        <img src={BannerImg} alt="Banner" />
      </S.ImageBanner>
    </S.Container>
  )
}
