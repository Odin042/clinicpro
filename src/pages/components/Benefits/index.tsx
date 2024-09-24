import React from 'react'
import * as S from './styles'
import { Cards } from './components/Cards'
import Dardo from '../../../assets/icons/dardo.png'
import Produtividade from '../../../assets/icons/produtividade.png'
import Setas from '../../../assets/icons/setas.png' 
import { Typography } from '@mui/material'

export const Benefits = () => {
  return (
    <S.Container>
      <Typography variant="h2" sx={{ color: 'text.primary', fontWeight: 'bold'}}>
        Benefícios
      </Typography>
      <S.WrapperCards>
        <Cards icone={Setas} title={'Gestão do seu consultório'} description={'Aproveite nossa feramenta para gerenciar seu consultório'}  />
        <Cards icone={Dardo} title={'Seja Acertivo'} description={'Encontre os erros que podem estar dificultando os seus lucros!'}  />
        <Cards icone={Produtividade} title={'Aumente sua produtividade'} description={'Escale de forma organizada e eficiente para lucros mais solidos!'}  />
      </S.WrapperCards>
    </S.Container>
  )
}
