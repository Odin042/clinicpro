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
          <Typography variant="h2">Como a consultoria funciona?</Typography>
          <Typography
            variant="h6"
            sx={{ margin: "30px 0 0 0", textAlign: "start" }}
          >
            A consultoria é realizada em 3 etapas: diagnóstico, plano de ação e
            acompanhamento. O diagnóstico é feito através de uma análise
            detalhada do seu negócio, identificando os pontos fortes e fracos.
            Com base nesse diagnóstico, é elaborado um plano de ação para
            melhorar os resultados da sua empresa. Por fim, o acompanhamento é
            feito para garantir que o plano de ação seja implementado
            corretamente e que os resultados esperados sejam alcançados.
          </Typography>

          <Box>
            {[
              "Aprenda a calcular o valor das consultas.",
              "Gerencie seus gastos",
              "Aumente seus lucros",
              "Estratégias de como aplicar o seu dinheiro",
            ].map((text, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: { xs: "20px 0", sm: "50px 0 0 0" },
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
                    whiteSpace: "nowrap",
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
