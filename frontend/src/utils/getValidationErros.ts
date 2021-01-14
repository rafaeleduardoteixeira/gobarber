import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErros(err: ValidationError): Errors {
  const validation: Errors = {};

  err.inner.forEach(erro => {
    validation[erro.path as string] = erro.message;
  });
  return validation;
}
