import {Container, Typography} from '@mui/material';

const Home = () =>{

    return(
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h2' component="h1">Welcome to React Diner!</Typography>
            <Typography>Main chef: Juuso Finne</Typography>
            <Typography>Address: Kuntokatu 3, Tampere, Finland</Typography>
            <Typography>Tel. 040123456</Typography>
            <Typography>E-mail: react.diner@tuni.fi</Typography>
        </Container>
    );
}

export default Home;