import { Box, Stack, Typography } from "@mui/material";
import Banner from "../../../assets/banner2.png";
import * as S from "./styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const BannerFuction = () => {
  return (
    <S.Container>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={0}
        alignItems="stretch"
      >
        <S.WrapperImage>
          <img src={Banner} alt="Banner" />
        </S.WrapperImage>
        <S.WrapperTextCenter>
          <Typography variant="h2" sx={{ textAlign: "justify"}}>
            <strong>Clinic360</strong> domine sua clínica e alcance o sucesso financeiro.
          </Typography>
          <Typography
            variant="h6"
            sx={{ margin: "30px 0 0 0", textAlign: "justify" }}
          >
            Cansado de não saber como anda a saúde financeira da sua clínica?
            Com a Clinic360, você terá todas as informações nas suas mãos para
            tomar decisões estratégicas e impulsionar seus resultados.
          </Typography>
          <Typography variant="h5" sx={{ margin: "30px 0 0 0", textAlign: "start", fontWeight: 'bold' }}>
            O que a Clinic360 faz por você:
          </Typography>
          <Box>
            {[
              "Coleta e organiza todos os dados da sua clínica.",
              "Analisa seus gastos e receitas, gerando um diagnóstico preciso.",
              "Define o valor ideal para suas consultas e procedimentos.",
              "Automatiza processos como agendamento e emissão de orçamentos.",
              "Oferece insights para você tomar decisões mais assertivas.",
              "Controle total da sua clínica.",
              "Aumento da lucratividade.",
              "Decisões mais estratégicas.",
              "Mais tempo para cuidar dos seus pacientes.",
              "Não perca mais tempo e comece a transformar a sua clínica!"
            ].map((text, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: { xs: "20px 0", sm: "50px 0 0 0" },
                  maxWidth: '300px'
                }}
              >
                <CheckCircleIcon
                  sx={{ color: "#2196f3", marginRight: "10px" }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    wordWrap: "break-word",
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                  }}
                >
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </S.WrapperTextCenter>
      </Stack>
    </S.Container>
  );
};

export default BannerFuction;
