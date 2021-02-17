import { shade } from 'polished';
import styled from 'styled-components';

export const ButtonStyle = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  margin-top: 3vh;
  transition: background-color 300ms;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
