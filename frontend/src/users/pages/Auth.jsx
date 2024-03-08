import { Stack, Typography, } from '@mui/material/';
import { useContext, useEffect, useState } from "react";
import { loginContext } from '../../App';
import LoginForm from '../components/LoginForm';
import { useMutation } from "react-query"
import { login } from '../API/users';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Auth = () => {
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(loginContext);
    const [headerText, setHeaderText] = useState('Log in')
    const [bottomText, setBottomText] = useState('Don\'t have an account? Sign up')
    const [hasAccount, setHasAccount] = useState(true)

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
            }
        },
        onError: (error) => console.log(error)
    })

    const loginHandler = (data) => {
        loginMutation.mutate(data);
    }

    return (
        <>
            {!isLoggedIn ?
                <Stack alignItems="center">
                    <Typography variant='h2' component="h1">{headerText}</Typography>
                    {!isLoggedIn && <LoginForm submitHandler={loginHandler} />}
                    <a href='#' onClick={() => {
                        setHasAccount(oldValue => !oldValue)
                    }}><Typography>{bottomText}</Typography></a>
                </Stack>
                :
                <Stack alignItems="center">
                    <Typography>Logged in as {user}</Typography>
                    <Typography component={NavLink} to='/'>Back to main page</Typography>
                </Stack>
            }
        </>
    )
}

export default Auth