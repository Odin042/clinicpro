import { Button, Card, CardContent, Typography } from '@mui/material'
import * as S from './styles'

type CardsProps = {
  color?: string, 
  title: string,
  subtitle: string,
  value: string,
  benefits: string,
  backgroundColor?: string,
  titleColor?: string,
  subtitleColor?: string,
  valueColor?: string,
  benefitsColor?: string,
  buttonColor?: string,
  buttonTextColor?: string,
}

export const Cards = ({ 
  title, 
  subtitle, 
  value, 
  benefits, 
  backgroundColor, 
  titleColor = '#0A2472', 
  subtitleColor = '#252525', 
  valueColor = '#0A2472', 
  benefitsColor = '#49504E', 
  buttonColor = '#0A2472', 
  buttonTextColor = '#ffffff' 
}: CardsProps) => {
  return (
    <S.Container>
      <Card sx={{ 
        width: 300, 
        height: 350, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderRadius: '12px',
        backgroundColor: backgroundColor || '#ffffff',
        padding: '10px 0'  
      }}>
        <CardContent sx={{ 
          textAlign: 'center',  
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', margin: '0 10px', color: titleColor, width: '110%', padding: '10px 20px', textAlign: 'center' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ margin: '10px 0', fontSize: '14px', color: subtitleColor }}>
            {subtitle}
          </Typography>
          <Typography variant='h4' sx={{ fontWeight: 'bold', margin: '10px 0', color: valueColor }}>
            {value}
          </Typography>
          <Typography variant="body1" sx={{ color: benefitsColor, marginBottom: '20px', fontSize: '16px' }}>
            {benefits}
          </Typography>
          <Button variant="contained" sx={{ 
            backgroundColor: buttonColor, 
            color: buttonTextColor, 
            width: '80%',
            padding: '10px 0',
            fontWeight: 'bold',
            borderRadius: '8px',
          }}>
            CONTRATAR
          </Button>
        </CardContent>
      </Card>
    </S.Container>
  )
}
