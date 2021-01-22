import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { Background, Container, Content } from './styles';
import getValidationErros from '../../utils/getValidationErros';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório.')
          .email('Digite um e-mail válido.'),
        password: Yup.string().required('Senha obrigatória.'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      formRef.current?.setErrors(getValidationErros(error));
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logo} alt="Go Barber" />
        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça seu logon</h1>
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            placeholder="Senha"
            type="password"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="forgot">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
