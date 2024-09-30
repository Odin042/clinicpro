import { Button, Card, CardContent, Typography } from '@mui/material'
import * as S from './styles'

type CardsProps = {
  title: string,
  subtitle: string,
  value: string,
  benefits: string,
}

export const Cards = ({ title, benefits, subtitle, value }: CardsProps) => {
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
        backgroundColor: '#F7F7F7',
        padding: '20px 0'  
      }}>
        <CardContent sx={{ 
          textAlign: 'center', 
          padding: '0', 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', margin: '0', color: '#0A2472' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ margin: '10px 0', fontSize: '14px', color: '#252525' }}>
            {subtitle}
          </Typography>
          <Typography variant='h4' sx={{ fontWeight: 'bold', margin: '10px 0', color: '#0A2472' }}>
            {value}
          </Typography>
          <Typography variant="body1" sx={{ color: '#49504E', marginBottom: '20px', fontSize: '16px' }}>
            {benefits}
          </Typography>
          <Button variant="contained" sx={{ 
            backgroundColor: '#0A2472', 
            color: '#ffffff', 
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
