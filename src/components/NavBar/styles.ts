import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 600px) {
    padding: 10px;
    
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
  height: 90px;

  
`;

export const LogoWrapper = styled.div`
  img {
    width: 160px;
    height: auto;
    margin-right: 10px;
    object-fit: contain;
  }
`;

export const MenuBox = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  font-weight: bolder;
  align-items: center;
  height: 100%;

 
`;

export const MenuIconButton = styled(IconButton)`
  display: block;
  
 
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 70px;


  button {
    width: 200px;
  }
`;