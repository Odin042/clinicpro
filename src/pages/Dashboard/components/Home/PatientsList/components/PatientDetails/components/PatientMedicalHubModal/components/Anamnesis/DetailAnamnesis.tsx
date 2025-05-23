import { SPECIALTIES_CONFIG } from '../../../../../../../../../../../config/specialties'
import { Stack, Typography } from '@mui/material'

function getValue(obj: any, path: string[]) {
  return path.reduce((o, k) => (o ? o[k] : undefined), obj)
}

function format(v: any) {
  if (typeof v === 'boolean') return v ? 'Sim' : 'Não'
  if (Array.isArray(v)) return v.join(', ')
  return String(v)
}

export default function DetailAnamnesis({ anam }: { anam: any }) {
  const cfg = SPECIALTIES_CONFIG[anam.specialty as keyof typeof SPECIALTIES_CONFIG]
  return (
    <Stack spacing={1}>
      {cfg.fields.map(f => {
        const v = getValue(anam.content, f.id.split('.'))
        if (v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) return null
        return (
          <Stack key={f.id} direction="row" spacing={1}>
            <Typography fontWeight={600}>{f.label}:</Typography>
            <Typography>{format(v)}</Typography>
          </Stack>
        )
      })}
    </Stack>
  )
}
