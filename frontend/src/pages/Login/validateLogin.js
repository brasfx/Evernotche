import * as yup from 'yup';
import { useTranslation } from 'react-i18next'


const { t } = useTranslation()

const schemaValidation = yup.object().shape({
  email: yup
    .string(t("require_email_message"))
    .email(t("required_valid_email_message"))
    .required(t("required_field_message")),
  password: yup.string().required(t("required_field_message")),
});

export default schemaValidation;
