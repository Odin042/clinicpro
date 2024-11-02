import styled from "styled-components";

export const WrapperLogin = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: stretch;
  justify-content: center;
  width: 100%;
  min-height: 100vh; 
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

  @media (max-width: 768px) {
    display: none;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; 
  
  img {
    width: 160px;
    height: auto;
    object-fit: contain;
    margin-bottom: 10px; 
  }

  @media (max-width: 768px) {
    img {
      width: 120px;
    }
    p {
      margin-top: 10px; 
    }
  }
`;
