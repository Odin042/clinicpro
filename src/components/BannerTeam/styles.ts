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

export const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h4 {
    margin: 0;
    color: #03045e; 
  }
`;

export const StackWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 20px;
  
  .MuiAvatar-root {
    margin-bottom: 10px;
  }
`;
