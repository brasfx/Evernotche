import * as yup from 'yup';

const schemaValidation = yup.object().shape({
  name: yup
    .string('Por favor insira um nome válido!')
    .min(3, 'O nome deve conter no mínimo 3 caracteres!')
    .required('O campo é obrigatorio!'),
  email: yup
    .string('Por favor,insira um emial')
    .email('Por favor,insira um email válido!')
    .required('O campo é obrigatório!'),
  password: yup
    .string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres!')
    .required('O campo é obrigatório!'),
  confirmpassword: yup
    .string('Por favor,confirme sua senha!')
    .oneOf([yup.ref('password'), null], 'As senhas são imcompativeis!'),
  country: yup
    .string('Por favor, insira um país!')
  // .required('O campo é obrigatório!'),
});

export default schemaValidation;
