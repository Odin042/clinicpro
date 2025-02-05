import * as S from './styles'
import Logo from "../../assets/clinic360prologo.png";
import { Typography } from '@mui/material';

export const Footer = () => {
  return (
    <S.Container>
      <S.LogoWrapper>
          <img src={Logo} alt="Logo" />
      </S.LogoWrapper>
      <S.TextWrapper>
        <Typography variant='body1'>© 2024 Clinic360. Todos os direitos reservados.</Typography>
      </S.TextWrapper>
    </S.Container>
  )
}
