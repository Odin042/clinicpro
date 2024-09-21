import styled from "styled-components";

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

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Roboto, sans-serif;
  align-items: center;
  justify-content: center;
  width: 50%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const ImageBanner = styled.div`
  display: flex;
  width: 50%;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

