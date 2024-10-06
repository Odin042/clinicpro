import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0; /* Reduzindo o padding vertical */

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
    color: #03045e;
  }
`;

export const StyledAppBar = styled.div`
  background-color: #f5f5f5;
  color: #000;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px; /* Reduzindo o padding horizontal */

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export const LogoWrapper = styled.div`
  img {
    width: 100px; /* Reduzindo o tamanho do logo */
    margin-right: 5px; /* Reduzindo o espaçamento ao lado do logo */
  }
`;

export const MenuBox = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  font-weight: bolder;
  font-size: 14px; /* Reduzindo o tamanho da fonte para compactar os itens */
`;

export const MenuIconButton = styled(IconButton)`
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px; /* Reduzindo o espaçamento entre os botões */
`;

export const StyledButton = styled.button`
  margin-right: ${({ theme }) => theme.spacing(0.5)}px; /* Diminuindo a margem */
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.text.secondary};
  border: none;
  padding: 5px 10px; /* Diminuindo o padding dos botões */
  cursor: pointer;
  font-size: 14px; /* Reduzindo o tamanho da fonte dos botões */
`;
