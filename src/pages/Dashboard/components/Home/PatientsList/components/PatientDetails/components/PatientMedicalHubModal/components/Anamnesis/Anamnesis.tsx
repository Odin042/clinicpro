import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Avatar } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined'
import dayjs from 'dayjs'
import { useGetAnamnesis } from '../../../../../../../../../../../hooks/useGetAnamnesis'
import { useState } from 'react'

type Props = { patientId: string | number; onSelect: (a: any) => void }

export default function AnamnesisList({ patientId, onSelect }: Props) {
  const { data = [] } = useGetAnamnesis(patientId)
  const [open, setOpen] = useState(true)

  return (
    <Accordion expanded={open} onChange={(_, e) => setOpen(e)} sx={{ boxShadow: 0, borderRadius: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ bgcolor: '#e8edff', borderRadius: 2, '& .MuiAccordionSummary-content': { m: 0 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ScienceOutlinedIcon sx={{ color: 'primary.main', mr: 1 }} fontSize="small" />
          <Typography variant="h6" fontWeight={700}>
            Anamneses ({data.length})
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        {data.map((a: any, idx: number) => {
          const num = data.length - idx
          return (
            <Box
              key={a.id}
              onClick={() => onSelect(a)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                mb: 1,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'grey.100' }
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  width: 32,
                  height: 32,
                  mr: 2,
                  fontSize: 14
                }}
              >
                {num}
              </Avatar>
              <Typography flex={1} fontSize={14} fontWeight={600}>
                {`${num}ª ${a.specialty.toLowerCase()}`}
              </Typography>
              <Typography fontSize={12}>{dayjs(a.created_at).format('DD/MM/YYYY')}</Typography>
            </Box>
          )
        })}
      </AccordionDetails>
    </Accordion>
  )
}
