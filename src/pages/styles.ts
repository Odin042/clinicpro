import styled from "styled-components";

export const WrapperTextCenter = styled.div`
  text-align: center;
  flex-direction: column;
  margin-top: 20px;

  @media (max-width: 600px) {
    h3 {
      font-size: 1.5rem;
      margin: 0 0 0 90px;
      width: 50%;
    }
  }
`;

export const ImageCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  img {
    width: 200px;
  }
`;