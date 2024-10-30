import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const LogoWrapper = styled.div`
  position: relative;
  margin: 0 0 0 500px;
  img {
    width: 160px;
    height: auto;
    object-fit: contain;
  }
  p {
    margin:  0 0 120px 30px;
  }
`;

export const LoginWrapper = styled.div`
  display: flex;
  margin: 0 0 60px 300px;
  width: 600px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

export const ButtonsForm = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 340px 0 0;
`;