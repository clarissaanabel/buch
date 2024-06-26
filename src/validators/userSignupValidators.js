import * as yup from 'yup';

export const userSignUpValidationSchema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
  