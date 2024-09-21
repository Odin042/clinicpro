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
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 30px;

  @media (max-width: 600px) {
    padding: 10px;
    flex-direction: column;
  }
`;