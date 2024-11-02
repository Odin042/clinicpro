import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;  
`;

export const FormRegister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 800px;
  gap: 20px;

  @media (max-width: 768px) {
    max-width: 100%; 
  }
`;

export const InputsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 20px;
    margin-top: 10px; 
  }
`;

export const InputsRegister = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%; 
  }
`;
