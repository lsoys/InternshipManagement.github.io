import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import "./login.css"
import { useState } from 'react';

function login(username, password, navigate) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ username, password });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        credentials: 'include',
        body: raw,
        // redirect: 'follow'
    };

    fetch("http://localhost:2324/authentication/login", requestOptions)
        .then(async response => {
            if (response.ok) {
                // Store JWT token in cookie
                // const token = response.headers.get('Authorization').split(' ')[1];
                // Cookies.set('jwt', token);
                // console.log(response.headers.get('Set-Cookie'));

                return response.text();;
            }
            else {
                console.log("error aala")
                const json = await response.json();
                throw Error(json.message);
            }
        })
        .then(token => {
            const maxAge = 500 * 2 * 24 * 60 * 60 * 1000; // 1000 days
            document.cookie = `jwt=${token};max-age=${maxAge};SameSite=None;Secure;path=/`;
            console.log("login done")
            navigate("/")
        })
        .catch(error => console.log('error', error));
}

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function loginFormSubmit(event) {
        event.preventDefault();

        login(username, password, navigate);
    }

    return <>
        <form className='loginForm'>
            <h1>Login</h1>
            <TextField
                // error
                fullWidth
                id="input-username"
                label="Username"
                onChange={e => setUsername(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
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
                {/* <Link to="/"> */}
                <button onClick={loginFormSubmit}>Login</button>
                {/* </Link> */}
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/">
                    <button className='simpleBtn'>Login</button>
                </Link> */}
            </div>
        </form>
    </>
}