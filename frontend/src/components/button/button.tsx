import React, { ButtonHTMLAttributes } from 'react';
import { ButtonStyle } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <ButtonStyle type="button" {...props}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
