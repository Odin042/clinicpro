import {
  Stack, Typography, TextField, Button, Checkbox,
  FormControlLabel, MenuItem
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { SPECIALTIES_CONFIG, SpecialtyKey } from '../../../../../../../../../../../config/specialties'
import { useCreateAnamnesis } from '../../../../../../../../../../../hooks/useCreateAnamnesis'
import { toast } from 'react-toastify'
import { formatSpecialtyLabel } from '../../../../../../../../../../../utils/formats'

export default function AnamnesisCreator ({ patientId, onFinish  }: { patientId: string | number }) {
  const keys = Object.keys(SPECIALTIES_CONFIG) as SpecialtyKey[]
  const [specialty, setSpecialty] = useState<SpecialtyKey>(keys[0])

  const { control, handleSubmit, reset, formState: { errors } } = useForm()
  const create = useCreateAnamnesis(patientId)


  useEffect(() => { reset() }, [specialty, reset])

  const cfg = SPECIALTIES_CONFIG[specialty]

  const onSubmit = async (data: any) => {
    await create.mutateAsync({ specialty, content: data })
    onFinish()
    toast.success('Anamnese salva')
    reset()
  }

  const requiredMsg = (id: string) => cfg.fields.find(f => f.id === id)?.label + ' é obrigatório'

  return (
    <Stack spacing={2}>
      <Typography variant='h6' fontWeight={700}>Preencha a anamnese</Typography>

   
      <TextField
        select label='Especialidade' fullWidth
        value={specialty} onChange={e => setSpecialty(e.target.value as SpecialtyKey)}
      >
        {keys.map(k => <MenuItem key={k} value={k}>{formatSpecialtyLabel(k)}</MenuItem>)}
      </TextField>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {cfg.fields.map(f => (
            <Controller
              key={f.id} name={f.id} control={control}
              rules={{ required: f.required }}
              defaultValue={f.type === 'boolean' ? false : ''}
              render={({ field }) =>
                f.type === 'boolean' ? (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={f.label}
                  />
                ) : f.type === 'select' ? (
                  <TextField {...field} select label={f.label} fullWidth
                    error={!!errors[f.id]} helperText={errors[f.id] && requiredMsg(f.id)}>
                    {f.options!.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                  </TextField>
                ) : (
                  <TextField {...field} label={f.label}
                    type={f.type === 'number' ? 'number' : 'text'}
                    multiline={f.type === 'textarea'} fullWidth
                    error={!!errors[f.id]} helperText={errors[f.id] && requiredMsg(f.id)}
                  />
                )}
            />
          ))}
        </Stack>

        <LoadingButton
          sx={{ mt: 3 }} variant='contained'
          loading={create.isPending} type='submit'
        >
          Salvar
        </LoadingButton>
      </form>
    </Stack>
  )
}