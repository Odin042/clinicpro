import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, Stack } from '@mui/material'
import Logo from '../../../assets/clinic360prologo.png'
import { useLogin } from '../../Register/hooks/useLoginUser'

export const Login = () => {
  const navigate = useNavigate()
  
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  
  const { mutateAsync: login, isPending } = useLogin()

  const handleLogin = async () => {
    setLocalError(null)

    
    if (!email.includes('@')) {
      setLocalError('Por favor, insira um email válido.')
      return
    }
    if (password.length < 6) {
      setLocalError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    
    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setLocalError('Erro ao fazer login. Verifique suas credenciais.')
    }
  }

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: '100%',
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f5f5f5',
          px: 4
        }}
      >
        <img src={Logo} alt='Logo' style={{ maxWidth: 200 }} />
        <Typography
          variant='h3'
          sx={{
            fontWeight: 'bold',
            mb: 2,
            textAlign: 'center',
            maxWidth: '500px'
          }}
        >
          Bem-vindo ao Clinic360
        </Typography>
        <Typography variant='h6' sx={{ textAlign: 'center', maxWidth: '500px', mt: 2 }}>
          Faça login para acessar sua conta e gerenciar seus pacientes, agendamentos e muito mais.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          bgcolor: '#fff',
          p: 4,
          maxWidth: { xs: '100%', sm: '400px' },
          width: '100%',
          overflowY: 'auto'
        }}
      >
        <Typography
          variant='h4'
          align='center'
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 3 }}
        >
          Login
        </Typography>

        {localError && (
          <Typography color='error' sx={{ mb: 2 }}>
            {localError}
          </Typography>
        )}
        
        <TextField
          label='Email'
          variant='outlined'
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label='Senha'
          variant='outlined'
          type='password'
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant='text'
          color='primary'
          onClick={() => navigate('/forgot-password')}
          sx={{ mb: 2 }}
        >
          Esqueceu sua senha?
        </Button>
        <Button
          variant='contained'
          color='primary'
          loading={isPending}
          loadingIndicator="Entrando…"
          onClick={handleLogin}
          disabled={!email || !password || isPending}
          sx={{ width: '100%', mb: 2 }}
        >
          {'Entrar'}
        </Button>
        <Button variant='contained' color='secondary' onClick={() => navigate('/register')} sx={{ width: '100%' }}>
          Não tem uma conta? Cadastre-se
        </Button>
      </Box>
    </Stack>
  )
}
