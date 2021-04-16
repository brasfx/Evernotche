import * as yup from 'yup';

const validateName = yup.object().shape({
  name: yup
    .string('Por favor insira um nome válido!')
    .min(3, 'O nome deve conter no mínimo 3 caracteres!')
    .required('O campo é obrigatorio!'),
});

const validateCountry = yup.object().shape({
  country: yup
    .string('Por favor, insira um país!')
    .required('O campo é obrigatório!'),
});

const validatePassword = yup.object().shape({
  password: yup
    .string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres!')
    .required('O campo é obrigatório!'),
});

export { validateName, validatePassword, validateCountry };
