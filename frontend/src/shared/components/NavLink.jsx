import { NavLink } from 'react-router-dom'
import { Typography, Button } from '@mui/material';

const NavItem = ({ style, route, text }) => {
    return (
        <li style={style}>
            <Button component={NavLink} to={route} color="inherit">
                <Typography variant="h6">{text}</Typography>
            </Button>
        </li>
    )
}

export default NavItem