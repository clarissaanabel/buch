import React from 'react'
import { useFormik } from 'formik'
import tw from 'tailwind-styled-components'
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
    Link,
} from '@mui/material'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { userSignUpValidationSchema } from '@/validators/userSignupValidators'

const StyledContainer = tw(Container)`
  flex 
  flex-col
  items-center
  justify-center
  min-h-screen 
  p-4
`

const StyledPaper = tw(Paper)`
  p-8
  rounded-lg
  shadow-2xl
  w-full
  max-w-md
  bg-white
`

const StyledLink = tw(Link)`
  text-blue-500
  hover:underline
  hover:text-blue-700
  cursor-pointer
`

const SignUpForm = () => {
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
        },
        validationSchema: userSignUpValidationSchema,
        onSubmit: (values) => {
            console.log(values)
            // Handle form submission
        },
    })

    return (
        <StyledContainer>
            <StyledPaper elevation={3}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    className="text-center text-blue-600 font-bold"
                >
                    Sign Up
                </Typography>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                    />

                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                    />

                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                    />

                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                        variant="outlined"
                        autoComplete="new-password"
                    />

                    <Box mt={2}>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Sign Up
                        </Button>
                    </Box>
                </form>
                <Box mt={2} className="text-center">
                    <Typography variant="body1">
                        Already have an account?{' '}
                        <StyledLink onClick={() => router.push('/login')}>Login</StyledLink>
                    </Typography>
                </Box>
            </StyledPaper>
        </StyledContainer>
    )
}

export default SignUpForm
