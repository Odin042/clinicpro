import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;

  img {
    width: 80px;
    height: 80px;
    margin: 0 0 20px;
  }

  @media (max-width: 600px) {
    padding: 10px;
    flex-direction: column;
  }
`;