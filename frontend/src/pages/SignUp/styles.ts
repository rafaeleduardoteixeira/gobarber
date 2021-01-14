import { shade } from 'polished';
import styled from 'styled-components';
import signUpBackground from '../../assets/sign-up-background.png';
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
    color: #f4ede8;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: color 300ms;

    svg {
      margin-right: 1.5vw;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
      text-decoration: underline;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;
