import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Stack,
  Typography,
  Avatar,
  Paper,
  Skeleton,
  Button,
  Divider,
  Box,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import usePatient from "../../../../../../../hooks/useGetPatientId";
import PatientMedicalHubModal from "./components/PatientMedicalHubModal/PatientMedicalHubModal";
import { HubItem } from "./components/PatientMedicalHubModal/PatientMedicalHubModal";
import { MedicalRecord } from "./components/PatientMedicalHubModal/components/MedicalRecord/MedicalRecord";
import useRecords from "../../../../../../../hooks/useGetMedicalRecord";
import DOMPurify from "dompurify";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AppointmentModal from "../../../components/AppointmentsModal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";

type RecordItem = {
  id: string;
  title?: string;
  content: string;
  created_at: string;
};

const PatientDetails = () => {
  const { id } = useParams();
  const { data: patient, isLoading } = usePatient(id!);
  const { data: records = [], isLoading: recLoading } = useRecords(id!);
  const navigate = useNavigate()
  const [openHub, setOpenHub] = useState(false);
  const [selected, setSelected] = useState<HubItem | null>(null);
  const handleSelect = (item: HubItem) => setSelected(item);

  const [selectedRec, setSelectedRec] = useState<RecordItem | null>(null);
  const [page, setPage] = useState(1);
  const [openList, setOpenList] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const sortedRecords = [...records].sort(
    (a, b) =>
      new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
  );

  const totalPages = Math.ceil(sortedRecords.length / rowsPerPage);
  const paginated = sortedRecords.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
        width="100%"
      >
        <DotLottieReact
          src="https://lottie.host/2954e96c-70f5-4029-a5b9-00c91dad99a4/AXroSuO420.lottie"
          loop
          autoplay
          style={{ width: 400, height: 300 }}
        />
      </Box>
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
            sx={{ mb: 3 }}
            startIcon={<AddIcon />}
            onClick={() => setOpenHub(true)}
          >
            Adicionar
          </Button>
          <Button
            fullWidth
            variant="contained"
            startIcon={<EditCalendarIcon />}
            onClick={() => navigate("/calendar")}
          >
            Agendar
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
            ) : selectedRec ? (
              <Stack spacing={2}>
                <Button variant="text" onClick={() => setSelectedRec(null)}>
                  ← Voltar
                </Button>
                <Typography variant="h6" fontWeight={700}>
                  {selectedRec.title ?? "Prontuário"} –{" "}
                  {dayjs(selectedRec.created_at).format("DD/MM/YYYY HH:mm")}
                </Typography>
                <Box
                  sx={{ typography: "body2" }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(selectedRec.content),
                  }}
                />
              </Stack>
            ) : (
              <Accordion
                expanded={openList}
                onChange={(_, exp) => setOpenList(exp)}
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <DescriptionIcon
                      sx={{ color: "primary.main", mr: 1 }}
                      fontSize="small"
                    />
                    <Typography variant="h6" fontWeight={700}>
                      Prontuários ({sortedRecords.length})
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Box>
                    {paginated.map((rec: RecordItem, i: number) => {
                      const idx =
                        sortedRecords.length - ((page - 1) * rowsPerPage + i);
                      return (
                        <Box
                          key={rec.id}
                          onClick={() => setSelectedRec(rec)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 1.5,
                            mb: 1,
                            border: "1px solid",
                            borderColor: "grey.300",
                            borderRadius: 2,
                            cursor: "pointer",
                            "&:hover": { backgroundColor: "grey.100" },
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "primary.light",
                              color: "primary.contrastText",
                              width: 32,
                              height: 32,
                              mr: 2,
                              fontSize: 14,
                            }}
                          >
                            {idx}
                          </Avatar>

                          <Typography flex={1} fontSize={14} fontWeight={600}>
                            {`${idx}ª Prontuário`}
                          </Typography>

                          <Typography fontSize={12}>
                            {dayjs(rec.created_at).format("DD/MM/YYYY")}
                          </Typography>
                        </Box>
                      );
                    })}

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
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
                        onChange={(_, v) => setPage(v)}
                      />
                    </Stack>
                  </Box>
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

const Info = ({ label, value }: { label: string; value: string }) => (
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
