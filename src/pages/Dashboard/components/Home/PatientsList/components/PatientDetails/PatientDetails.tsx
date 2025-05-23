import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Stack, Typography, Avatar, Paper, Skeleton, Button, Divider, Box,
  Pagination, MenuItem, Select, FormControl, Accordion, AccordionSummary,
  AccordionDetails, Tabs, Tab
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DescriptionIcon from '@mui/icons-material/Description'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import usePatient from '../../../../../../../hooks/useGetPatientId'
import useRecords from '../../../../../../../hooks/useGetMedicalRecord'
import { useGetAnamnesis } from '../../../../../../../hooks/useGetAnamnesis'

import PatientMedicalHubModal, { HubItem } from './components/PatientMedicalHubModal/PatientMedicalHubModal'
import { MedicalRecord } from './components/PatientMedicalHubModal/components/MedicalRecord/MedicalRecord'
import AnamnesisList from './components/PatientMedicalHubModal/components/Anamnesis/Anamnesis'
import AnamnesisForm from './components/PatientMedicalHubModal/components/Anamnesis/AnamnesisForm'
import DetailAnamnesis from './components/PatientMedicalHubModal/components/Anamnesis/DetailAnamnesis'

type RecordItem = { id: string; title?: string; content: string; created_at: string }

export default function PatientDetails() {
  const { id } = useParams<'id'>()
  const { data: patient, isLoading } = usePatient(id!)
  const { data: records = [], isLoading: recLoading } = useRecords(id!)
  const { data: anamneses = [] } = useGetAnamnesis(id!)
  const navigate = useNavigate()

  const [openHub, setOpenHub] = useState(false)
  const [selectedRec, setSelectedRec] = useState<RecordItem | null>(null)
  const [selectedAnam, setSelectedAnam] = useState<any | null>(null)
  const [creatingRec, setCreatingRec] = useState(false)
  const [creatingAnam, setCreatingAnam] = useState(false)

  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openList, setOpenList] = useState(true)
  const [tab, setTab] = useState(0)

  const resetStates = () => {
    setCreatingRec(false)
    setCreatingAnam(false)
    setSelectedRec(null)
    setSelectedAnam(null)
  }

  const handleTab = (_: any, value: number) => {
    resetStates()
    setTab(value)
  }

  const handleSelect = (item: HubItem) => {
    resetStates()
    if (item.label === 'Prontuário') {
      setTab(0)
      setCreatingRec(true)
    }
    if (item.label === 'Anamnese') {
      setTab(1)
      setCreatingAnam(true)
    }
    setOpenHub(false)
  }

  const sortedRecords = [...records].sort(
    (a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
  )
  const totalPages = Math.ceil(sortedRecords.length / rowsPerPage)
  const paginated = sortedRecords.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh" width="100%">
        <DotLottieReact
          src="https://lottie.host/2954e96c-70f5-4029-a5b9-00c91dad99a4/AXroSuO420.lottie"
          loop
          autoplay
          style={{ width: 400, height: 300 }}
        />
      </Box>
    )
  if (!patient) return null

  return (
    <>
      <Stack direction="row" spacing={3} px={{ xs: 2, md: 4 }} py={3} width="100%">
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, minWidth: 160 }}>
          <Button fullWidth variant="contained" sx={{ mb: 3 }} startIcon={<AddIcon />} onClick={() => setOpenHub(true)}>
            Adicionar
          </Button>
          <Button fullWidth variant="contained" startIcon={<EditCalendarIcon />} onClick={() => navigate('/calendar')}>
            Agendar
          </Button>
        </Paper>

        <Stack spacing={3} flex={1}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar sx={{ bgcolor: '#9e9e9e', width: 72, height: 72 }}>
                {patient.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
              </Avatar>
              <Stack spacing={0.5}>
                <Typography variant="h5" fontWeight={700}>{patient.name}</Typography>
                <Typography variant="body2">Nascido em {dayjs(patient.birthday).format('DD/MM/YYYY')}</Typography>
                <Typography variant="body2">{patient.email}</Typography>
                <Typography variant="body2">{patient.whatsapp}</Typography>
              </Stack>
              <Divider flexItem orientation="vertical" sx={{ mx: 3 }} />
              <Stack direction="row" spacing={4}>
                <Info label="Peso" value={patient.weight ? `${patient.weight} kg` : '--'} />
                <Info label="Altura" value={patient.height ? `${patient.height} m` : '--'} />
                <Info label="Sexo" value={patient.gender ?? '--'} />
              </Stack>
            </Stack>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tab} onChange={handleTab}>
                <Tab label={`Prontuários (${sortedRecords.length})`} />
                <Tab label={`Anamneses (${anamneses.length})`} />
              </Tabs>
            </Box>

            {tab === 0 && (
              <>
                {creatingRec ? (
                  <MedicalRecord onFinish={() => setCreatingRec(false)} />
                ) : recLoading ? (
                  <Skeleton variant="rectangular" height={120} />
                ) : selectedRec ? (
                  <Stack spacing={2}>
                    <Button variant="text" onClick={() => setSelectedRec(null)}>← Voltar</Button>
                    <Typography variant="h6" fontWeight={700}>
                      {selectedRec.title ?? 'Prontuário'} – {dayjs(selectedRec.created_at).format('DD/MM/YYYY HH:mm')}
                    </Typography>
                    <Box sx={{ typography: 'body2' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRec.content) }} />
                  </Stack>
                ) : (
                  <Accordion expanded={openList} onChange={(_, e) => setOpenList(e)} sx={{ boxShadow: 0, borderRadius: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e8edff', borderRadius: 2, '& .MuiAccordionSummary-content': { m: 0 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DescriptionIcon sx={{ color: 'primary.main', mr: 1 }} fontSize="small" />
                        <Typography variant="h6" fontWeight={700}>Prontuários ({sortedRecords.length})</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        {paginated.map((rec: RecordItem, i: number) => {
                          const idx = sortedRecords.length - ((page - 1) * rowsPerPage + i)
                          return (
                            <Box
                              key={rec.id}
                              onClick={() => setSelectedRec(rec)}
                              sx={{
                                display: 'flex', alignItems: 'center', p: 1.5, mb: 1,
                                border: '1px solid', borderColor: 'grey.300', borderRadius: 2,
                                cursor: 'pointer', '&:hover': { backgroundColor: 'grey.100' }
                              }}
                            >
                              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', width: 32, height: 32, mr: 2, fontSize: 14 }}>
                                {idx}
                              </Avatar>
                              <Typography flex={1} fontSize={14} fontWeight={600}>{`${idx}ª Prontuário`}</Typography>
                              <Typography fontSize={12}>{dayjs(rec.created_at).format('DD/MM/YYYY')}</Typography>
                            </Box>
                          )
                        })}
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <FormControl size="small">
                            <Select
                              value={rowsPerPage}
                              onChange={e => {
                                setRowsPerPage(Number(e.target.value))
                                setPage(1)
                              }}
                            >
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={10}>10</MenuItem>
                              <MenuItem value={20}>20</MenuItem>
                            </Select>
                          </FormControl>
                          <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} />
                        </Stack>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}
              </>
            )}

            {tab === 1 && (
              creatingAnam ? (
                <AnamnesisForm patientId={id!} onFinish={() => setCreatingAnam(false)} />
              ) : selectedAnam ? (
                <Stack spacing={2}>
                  <Button variant="text" onClick={() => setSelectedAnam(null)}>← Voltar</Button>
                  <Typography variant="h6" fontWeight={700}>
                    {selectedAnam.specialty.toLowerCase()} – {dayjs(selectedAnam.created_at).format('DD/MM/YYYY HH:mm')}
                  </Typography>
                  <DetailAnamnesis anam={selectedAnam} />
                </Stack>
              ) : (
                <AnamnesisList patientId={id!} onSelect={a => setSelectedAnam(a)} />
              )
            )}
          </Paper>
        </Stack>
      </Stack>

      <PatientMedicalHubModal open={openHub} onClose={() => setOpenHub(false)} onSelect={handleSelect} />
    </>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="subtitle1" fontWeight={600}>{value}</Typography>
    </Stack>
  )
}
