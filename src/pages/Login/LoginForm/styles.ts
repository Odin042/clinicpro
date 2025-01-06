import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: stretch;
  justify-content: center;
  width: 100%;
  min-height: 100vh; 
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const LogoWrapper = styled.div`
  margin: 0 0 0 0;
  img {
    width: 140px;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    margin: 0 0 0 0;
  }
`;

export const LoginWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 20px;
  padding: 60px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

export const ImageLogin = styled.div`
  width: 40%;
  display: flex; 
  overflow: hidden;

  img {
    width: 100%;
    height: 100vh;
    object-fit: cover; 
  }

  @media (max-width: 768px) {
    display: none;
  }
`;


export const ButtonsForm = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 220px 0 0;

  @media (max-width: 768px) {
    margin: 0 100px 0 0;
  }
`;