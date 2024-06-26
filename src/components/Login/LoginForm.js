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
import { userLoginValidationSchema } from '@/validators/userLoginValidation'
import { useMutation } from '@apollo/client'
import { LOGIN } from '@/graphql/mutation/mutation'

const StyledContainer = tw(Container)`
  flex 
  flex-col
  items-center
  justify-center
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

const LoginForm = () => {
    const router = useRouter()
    const [login, { loading, error }] = useMutation(LOGIN);

    const handleSubmit = async (values) => {
        try {
            const { data } = await login({
                variables: {
                    username: values.username,
                    password: values.password,
                },
            })

            if (data?.login?.access_token) {
                localStorage.setItem('token', data.login.access_token)
                router.push('/') 
            }
        } catch (e) {
            console.error('Login error', e)
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: userLoginValidationSchema,
        onSubmit: handleSubmit,
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
                    Log In
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
                        autoComplete="current-password"
                    />

                    <Box mt={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={loading}
                        >
                            Log In
                        </Button>
                    </Box>
                </form>
                {error && <Typography color="error">{error.message}</Typography>}
                <Box mt={2} className="text-center">
                    <Typography variant="body1">
                        Don't have an account?{' '}
                        <StyledLink onClick={() => router.push('/signup')}>
                            Signup
                        </StyledLink>
                    </Typography>
                </Box>
            </StyledPaper>
        </StyledContainer>
    )
}

export default LoginForm
