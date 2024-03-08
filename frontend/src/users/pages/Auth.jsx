import { Stack, Typography, } from '@mui/material/';
import { useContext, useEffect, useState } from "react";
import { loginContext } from '../../App';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { useMutation } from "react-query"
import { login, signup } from '../API/users';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Auth = () => {
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(loginContext);
    const [headerText, setHeaderText] = useState('Log in');
    const [bottomText, setBottomText] = useState('Don\'t have an account? Sign up');
    const [hasAccount, setHasAccount] = useState(true);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        if (hasAccount) {
            setHeaderText('Log in')
            setBottomText('Don\'t have an account? Sign up')
        } else {
            setHeaderText('Sign up')
            setBottomText('Already have an account? Log in')
        }
    }, [hasAccount])

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            if (response.token) {
                setUser(response.email);
                setIsLoggedIn(true);
                setErrorText("");
            } else if (response.message) {
                setErrorText(response.message);
            }
        },
        onError: (error) => console.log(error)
    })

    const signupMutation = useMutation({
        mutationFn: signup,
        onSuccess: (response) => {
            if (response.token) {
                setUser(response.email);
                setIsLoggedIn(true);
                setErrorText("");
            } else if (response.message) {
                setErrorText(response.message);
            }
        },
        onError: (error) => console.log(error)
    })

    const loginHandler = (data) => {
        loginMutation.mutate(data);
    }

    const signupHandler = (data) => {
        signupMutation.mutate(data)
    }

    return (
        <>
            {!isLoggedIn ?
                // Not logged in:
                <Stack alignItems="center">
                    <Typography variant='h2' component="h1">{headerText}</Typography>
                    {hasAccount ?
                        <LoginForm submitHandler={loginHandler} /> :
                        <SignUpForm submitHandler={signupHandler} />
                    }

                    <Typography
                        color="#FF0000"
                        visibility={errorText.length === 0 ? "hidden" : "block"}
                        variant='subtitle1'
                    >
                        {errorText}
                    </Typography>

                    {/* Let the user choose login or signup:*/}
                    <Typography
                        onClick={() => {
                            setHasAccount(oldValue => !oldValue)
                            setErrorText("");
                        }}
                        component="a" href='#'
                    >
                        {bottomText}
                    </Typography>
                </Stack> :

                // Logged in:
                <Stack alignItems="center">
                    <Typography>Logged in as {user}</Typography>
                    <Typography component={NavLink} to='/'>Back to main page</Typography>
                </Stack>
            }
        </>
    )
}

export default Auth