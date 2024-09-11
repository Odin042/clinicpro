import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

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
  padding: 0 20px;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export const LogoWrapper = styled.div`
  img {
    height: 60px;
    margin-right: 10px;
  }
`;

export const MenuBox = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  font-weight: bolder;
`;

export const MenuIconButton = styled(IconButton)`
  display: none;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledButton = styled.button`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.text.secondary};
  border: none;
  padding: 8px 16px;
  cursor: pointer;

`;
