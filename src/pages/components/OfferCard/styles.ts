import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #f0f0f0; 
  padding: 30px;
`;

export const WrapperCards = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;