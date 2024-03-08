import { Stack, Typography, } from '@mui/material/';
import { useContext, useEffect, useState } from "react";
import { loginContext } from '../../App';

const Auth = () => {
    const isLoggedIn = useContext(loginContext);
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

    return (
        <Stack alignItems="center">
            <Typography variant='h2' component="h1">{headerText}</Typography>
            <a href='#' onClick={() => {
                setHasAccount(oldValue => !oldValue)
            }}><Typography>{bottomText}</Typography></a>
        </Stack>
    )
}

export default Auth