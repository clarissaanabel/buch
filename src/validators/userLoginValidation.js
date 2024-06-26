import * as yup from 'yup';

export const userLoginValidationSchema = yup.object({
    username: yup.string().email('Invalid email').required('Username is required'),
    password: yup.string().required('Password is required'),
});
  