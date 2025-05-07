import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Stack,
  Typography,
  Avatar,
  Paper,
  Skeleton,
  Button,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Pagination,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import usePatient from "../../../../../../../hooks/useGetPatientId";
import PatientMedicalHubModal from "./components/PatientMedicalHubModal/PatientMedicalHubModal";
import { HubItem } from "./components/PatientMedicalHubModal/PatientMedicalHubModal";
import { MedicalRecord } from "./components/PatientMedicalHubModal/components/MedicalRecord/MedicalRecord";
import useRecords from "../../../../../../../hooks/useGetMedicalRecord";
import DOMPurify from "dompurify";

type Record = { id: string; title: string };

const PatientDetails = () => {
  const { id } = useParams();
  const { data: patient, isLoading } = usePatient(id!);
  const { data: records = [], isLoading: recLoading } = useRecords(id!);
  const [openHub, setOpenHub] = useState(false);
  const [selected, setSelected] = useState<HubItem | null>(null);
  const handleSelect = (item: HubItem) => setSelected(item);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [listOpen, setListOpen] = useState(true);
  const toggleList = () => setListOpen((o) => !o);
  const handleChange = (id: string) => (_: any, isExp: boolean) =>
    setExpanded(isExp ? id : false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(records.length / rowsPerPage);
  const paginated = records.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (isLoading)
    return (
      <Skeleton
        variant="rectangular"
        height={400}
        sx={{ borderRadius: 2, m: 4 }}
      />
    );

  if (!patient) return null;

  return (
    <>
      <Stack
        direction="row"
        spacing={3}
        px={{ xs: 2, md: 4 }}
        py={3}
        width="100%"
      >
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, minWidth: 160 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenHub(true)}
          >
            Adicionar
          </Button>
        </Paper>

        <Stack spacing={3} flex={1}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar sx={{ bgcolor: "#9e9e9e", width: 72, height: 72 }}>
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </Avatar>

              <Stack spacing={0.5}>
                <Typography variant="h5" fontWeight={700}>
                  {patient.name}
                </Typography>
                <Typography variant="body2">
                  Nascido em {dayjs(patient.birthday).format("DD/MM/YYYY")}
                </Typography>
                <Typography variant="body2">{patient.email}</Typography>
                <Typography variant="body2">{patient.whatsapp}</Typography>
              </Stack>

              <Divider flexItem orientation="vertical" sx={{ mx: 3 }} />

              <Stack direction="row" spacing={4}>
                <Info
                  label="Peso"
                  value={patient.weight ? `${patient.weight} kg` : "--"}
                />
                <Info
                  label="Altura"
                  value={patient.height ? `${patient.height} m` : "--"}
                />
                <Info label="Sexo" value={patient.gender ?? "--"} />
              </Stack>
            </Stack>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 2 }}>
            {selected?.label === "Prontuário" ? (
              <MedicalRecord />
            ) : recLoading ? (
              <Skeleton variant="rectangular" height={120} />
            ) : (
              <Accordion
                expanded={listOpen}
                onChange={toggleList}
                sx={{ boxShadow: 0, borderRadius: 2 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    bgcolor: "#e8edff",
                    borderRadius: 2,
                    "& .MuiAccordionSummary-content": { m: 0 },
                  }}
                >
                  <Typography variant="h6" fontWeight={700}>
                    Prontuários ({records.length})
                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ pt: 2 }}>
                  <Stack>
                    {paginated.map((rec) => (
                      <Accordion
                        key={rec.id}
                        expanded={expanded === rec.id}
                        onChange={handleChange(rec.id)}
                        sx={{ mb: 1, borderRadius: 2, boxShadow: 0 }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{
                            bgcolor: "#f1f5ff",
                            "& .MuiAccordionSummary-content": { m: 1 },
                          }}
                        >
                          <Typography fontWeight={600}>
                            {dayjs(rec.created_at).format("DD/MM/YYYY HH:mm")}
                          </Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{ px: 3, py: 2 }}>
                          <Box
                            sx={{ typography: "body2" }}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(rec.content),
                            }}
                          />
                        </AccordionDetails>
                      </Accordion>
                    ))}

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={2}
                    >
                      <FormControl size="small">
                        <Select
                          value={rowsPerPage}
                          onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setPage(1);
                          }}
                        >
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                        </Select>
                      </FormControl>

                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, val) => setPage(val)}
                      />
                    </Stack>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )}
          </Paper>
        </Stack>
      </Stack>

      <PatientMedicalHubModal
        open={openHub}
        onClose={() => setOpenHub(false)}
        onSelect={handleSelect}
      />
    </>
  );
};

const Info = ({ label, value }) => (
  <Stack spacing={0.5}>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="subtitle1" fontWeight={600}>
      {value}
    </Typography>
  </Stack>
);

export default PatientDetails;
