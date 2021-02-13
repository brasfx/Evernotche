import * as yup from 'yup';

const schemaValidation = yup.object().shape({
  email: yup
    .string('Por favor,insira um email')
    .email('Por favor,insira um email válido!')
    .required('O campo é obrigatório!'),
  password: yup.string().required('O campo é obrigatório!'),
});

export default schemaValidation;
