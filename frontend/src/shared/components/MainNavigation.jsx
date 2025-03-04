import NavItem from './NavLink';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Typography, Toolbar, Button } from '@mui/material';
import { useContext } from 'react';
import { loginContext } from '../../users/context/LoginContextProvider';
import { useHistory } from 'react-router-dom/';

const MainNavigation = () => {
    const { isLoggedIn, internalLogout, user } = useContext(loginContext);
    const history = useHistory()
    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 99 }}>
            <Toolbar style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'center', zIndex: 10, backgroundColor: 'white',
                width: "100%", top: 0, margin: 0, padding: 0
            }}>
                <Link style={{ textDecoration: 'none' }} to="/">
                    <Typography variant="h1" style={{ marginRight: "5rem", }}>React Diner</Typography>
                </Link>
                <nav>
                    <ul className='list' style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex' }}>
                        <NavItem text="Home" route="/" />
                        <NavItem text="Menu" route="/Menu" />

                        {
                            isLoggedIn &&
                            <NavItem text="Cart" route="/Cart" />
                        }

                        {
                            isLoggedIn ?
                                <>
                                    <Button
                                        color="inherit"
                                        onClick={() => {
                                            history.push('/');
                                            internalLogout();
                                        }}
                                    >
                                        <Typography variant="h6">LOGOUT</Typography>
                                    </Button>
                                </>
                                :
                                <NavItem text="Log in/Sign up" route="/Auth" />
                        }
                    </ul>
                </nav>
            </Toolbar>
        </header>
    )
}

export default MainNavigation;