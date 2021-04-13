import React, { ButtonHTMLAttributes } from 'react';
import Loader from '../loader/loader';
import { ButtonStyle } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => {
  return (
    <ButtonStyle type="button" {...props}>
      {loading ? 'Carregando' : children}
      {loading ? <Loader /> : ''}
    </ButtonStyle>
  );
};

export default Button;
