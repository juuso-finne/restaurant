import { Stack, Typography, } from '@mui/material/';
import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material/';
import { useLoginMutation, useSignUpMutation } from '../Mutations/Mutations';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';



const Auth = () => {
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

    const loginMutation = useLoginMutation(setErrorText);
    const signUpMutation = useSignUpMutation(setErrorText);


    return (
        <Stack alignItems="center">
            <Typography variant='h2' component="h1">{headerText}</Typography>
            {
                hasAccount ?
                    <LoginForm submitHandler={data => loginMutation.mutate(data)} />
                    :
                    <SignUpForm submitHandler={data => signUpMutation.mutate(data)} />
            }

            {/*Error text TODO: Make own component*/}
            <Typography
                color="#FF0000"
                visibility={errorText.length === 0 ? "hidden" : "block"}
                variant='subtitle1'
            >
                {errorText}
            </Typography>

            {/* Loading icon */}
            <CircularProgress style={{ visibility: (loginMutation.isLoading || signUpMutation.isLoading) ? 'block' : 'hidden' }} />

            {/* Let the user toggle between login and signup TODO: Make own component*/}
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