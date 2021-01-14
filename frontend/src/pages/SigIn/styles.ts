import { shade } from 'polished';
import styled from 'styled-components';
import signInBackground from '../../assets/sign-in-background.png';
import { media } from '../../styles/global';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 10vh;
    width: 25vw;
    text-align: center;

    ${media.tablet} {
      width: 45vw;
    }

    h1 {
      color: #f4ede8;
      font-weight: 700;
      margin-bottom: 3vh;
    }

    input {
      color: #f4ede8;
      background: #232129;
      border-radius: 10px;
      border: 1px solid #232129;
      padding: 16px;
      width: 100%;
      height: 56px;
      transition: border 200ms;

      &:placeholder {
        color: #666360;
      }

      & + input {
        margin-top: 2vh;
      }
    }

    button {
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
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 2vh;
      text-decoration: none;
      transition: color 300ms;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
        text-decoration: underline;
      }
    }
  }

  > a {
    color: #ff9000;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: color 300ms;

    svg {
      margin-right: 1.5vw;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
      text-decoration: underline;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
`;
