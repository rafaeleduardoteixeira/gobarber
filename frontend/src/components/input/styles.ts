import styled, { css } from 'styled-components';
import Tooltip from '../tooltip/index';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<IContainerProps>`
  color: #666360;
  background: #232129;
  border-radius: 10px;
  border: 1px solid #232129;
  padding: 16px;
  width: 100%;
  height: 56px;
  transition: border 200ms;
  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}    

  & + div {
    margin-top: 2vh;
  }

  input {
    color: #f4ede8;
    flex: 1;
    border: 0;
    background: transparent;
    &:placeholder {
      color: #666360;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
