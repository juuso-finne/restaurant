import NavItem from './NavLink';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Typography, Toolbar, Button } from '@mui/material';

const MainNavigation = () => {
    return (
        <header style={{ position: 'sticky', top: 0 }}>
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
                        <NavItem style={{ marginRight: '20px' }} text="Home" route="/" />
                        <NavItem style={{ marginRight: '20px' }} text="Menu" route="/Menu" />
                        <NavItem style={{ marginRight: '20px' }} text="Cart" route="/Cart" />
                        <NavItem style={{ marginRight: '20px' }} text="Log in" route="/Auth" />
                    </ul>
                </nav>
            </Toolbar>
        </header>
    )
}

export default MainNavigation;