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
        <Cards icone={Dardo} title={'Seja Acertivo'} description={'Com planejamento certo você pode ir mais longe'}  />
        <Cards icone={Produtividade} title={'Aumente sua produtividade'} description={'Aumente sua produtividade  e aumente seus lucros'}  />
      </S.WrapperCards>
    </S.Container>
  )
}
