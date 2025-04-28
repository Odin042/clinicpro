import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Typography,
  Paper
} from '@mui/material'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined'

import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'


type HubItem = { icon: React.ReactElement; label: string }

const avaliacao: HubItem[] = [
  { icon: <AssignmentOutlinedIcon color='success' />, label: 'Prontuário' },
  { icon: <PersonOutlinedIcon color='secondary' />, label: 'Anamnese' },
  { icon: <ScienceOutlinedIcon color='error' />, label: 'Exames laboratoriais' },
]

const prescricao: HubItem[] = [
  { icon: <EventNoteOutlinedIcon color='info' />, label: 'Prescrições' },
]

type Props = { open: boolean; onClose: () => void }

export default function PatientMedicalHubModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Adicionar</DialogTitle>
      <DialogContent dividers sx={{ p: 4 }}>
        <Section
          title='Escolha uma opção para adicionar uma avaliação'
          items={avaliacao}
        />
        <Section
          title='Escolha uma opção para adicionar uma prescrição'
          items={prescricao}
          mt={4}
        />
      </DialogContent>
    </Dialog>
  )
}

const Section = ({
  title,
  items,
  mt = 0
}: {
  title: string
  items: HubItem[]
  mt?: number
}) => (
  <Stack spacing={2} mt={mt}>
    <Typography variant='subtitle1'>{title}</Typography>

    <Stack
      direction='row'
      flexWrap='wrap'
      columnGap={3}
      rowGap={3}
    >
      {items.map(it => (
        <Paper
          key={it.label}
          sx={{
            width: 200,
            height: 140,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'flex-start',
            border: theme => `1px solid ${theme.palette.divider}`,
            cursor: 'pointer',
            '&:hover': { boxShadow: 3 }
          }}
        >
          {it.icon}
          <Typography variant='caption' color='text.secondary'>
            Adicionar
          </Typography>
          <Typography variant='body2' fontWeight={600}>
            {it.label}
          </Typography>
        </Paper>
      ))}
    </Stack>
  </Stack>

)
