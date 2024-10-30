import styled from "styled-components";

export const WrapperLogin = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: stretch;
  justify-content: center;
  width: 100%;
  height: 100vh; 
  background-color: #fff;
  border-radius: 10px;

`;

export const ImageLogin = styled.div`
  flex: 1;
  display: flex; 
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
  }
`;

export const LoginForm = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 10px;
  background-color: #fafafa;
`;

export const LogoWrapper = styled.div`
  position: relative;
  margin: 0 70px 0 0;
  img {
    width: 160px;
    height: auto;
    object-fit: contain;
  }
  p {
    margin:  0 0 120px 30px;
  }
`;

