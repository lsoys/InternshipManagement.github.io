import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import "./Error404.css"

export default function Error404() {
    return <center>
        <h1>Error 404</h1>
        <NavLink to="/">
            <Button variant="contained" color="error">
                Go To Home Page
            </Button>
        </NavLink>
    </center>
}