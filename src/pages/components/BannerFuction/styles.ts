import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
    padding: 0;
    margin: 0;
  }
`;

export const WrapperImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;

  img {
    width: 150%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 600px) {
    width: 100%;
    display: none;
    order: 2; 
  }
`;

export const WrapperTextCenter = styled.div`
  text-align: left;
  width: 50%;
  background-color: #03045E;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  max-width: 80%;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    order: 1; 
    text-align: left;
  }
`;
