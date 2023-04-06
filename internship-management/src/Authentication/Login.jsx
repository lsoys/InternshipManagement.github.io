import TextField from '@mui/material/TextField';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';

import "./login.css"

export default function Login() {
    return <>
        <form className='loginForm'>
            <h1>Login</h1>
            <TextField
                // error
                fullWidth
                id="input-username"
                label="Username"
                defaultValue=""
                helperText=""
            />
            <br />
            <br />
            <TextField
                // error
                type='password'
                fullWidth
                id="input-password"
                label="Password"
                defaultValue=""
                helperText=""
            />
            <br />
            <br />
            <hr />
            <br />
            <div className='alignCenter'>
                {/* <Button variant="contained" endIcon={<Fingerprint />}>
                    login
                </Button> */}
                <Link to="/">
                    <button>Login</button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/">
                    <button className='simpleBtn'>Login</button>
                </Link>
            </div>
        </form>
    </>
}