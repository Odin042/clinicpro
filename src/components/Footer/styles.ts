import styled from "styled-components";


export const Container = styled.footer`
  padding: 20px 0;
  margin-top: 20px;

  @media (max-width: 600px) {
    align-items: center;
    justify-content: center;
  }
`;

export const LogoWrapper = styled.div`
  margin-left: 60px;
  img {
    width: 150px;
    margin-left: 60px;
  }
`;

export const TextWrapper = styled.div`
  margin-left: 60px;
  text-align: center;

  @media (max-width: 600px) {
    margin-right: 50px;
  }
`;