import { Stack, Typography, } from '@mui/material/';
import { useContext, useEffect, useState } from "react";
import { loginContext } from '../context/LoginContextProvider';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { useMutation } from "react-query"
import { login, signup } from '../UsersAPI';
import { useHistory } from "react-router-dom";
import { CircularProgress } from '@mui/material/';

const Auth = () => {
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(loginContext);
    const [headerText, setHeaderText] = useState('Log in');
    const [bottomText, setBottomText] = useState('Don\'t have an account? Sign up');
    const [hasAccount, setHasAccount] = useState(true);
    const [errorText, setErrorText] = useState("");
    const history = useHistory();

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
                const { id, name, email } = response;
                setUser({ id, name, email });
                setIsLoggedIn(true);
                setErrorText("");
                history.push('/');
            } else if (response.message) {
                setErrorText(response.message);
            }
        },
        onError: (error) => {
            console.log(error);
            setErrorText("Network or server error");
        }

    })

    const signupMutation = useMutation({
        mutationFn: signup,
        onSuccess: (response) => {
            if (response.token) {
                setUser(response.email);
                setIsLoggedIn(true);
                setErrorText("");
                history.push('/');
            } else if (response.message) {
                setErrorText(response.message);
            }
        },
        onError: (error) => {
            console.log(error)
            setErrorText("Network or server error");

        }
    })

    return (
        // Not logged in:
        <Stack alignItems="center">
            <Typography variant='h2' component="h1">{headerText}</Typography>
            {hasAccount ?
                <LoginForm submitHandler={data => loginMutation.mutate(data)} /> :
                <SignUpForm submitHandler={data => signupMutation.mutate(data)} />
            }

            {/*Error text:*/}
            <Typography
                color="#FF0000"
                visibility={errorText.length === 0 ? "hidden" : "block"}
                variant='subtitle1'
            >
                {errorText}
            </Typography>

            {/* Loading icon */}
            <CircularProgress style={{ visibility: (loginMutation.isLoading || signupMutation.isLoading) ? 'block' : 'hidden' }} />

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
        </Stack>
    )
}

export default Auth