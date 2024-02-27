// import MainNavigation from "../components/MainNavigation";
import { Container, Typography } from '@mui/material';
const ErrorPage = ()=>{
    return(
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h2' component="h1">Error</Typography>
            <Typography variant='body1'>The page you are looking for does not exist</Typography>
        </Container>
    )
}

export default ErrorPage;