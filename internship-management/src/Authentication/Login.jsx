import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import FingerPrint from '@mui/icons-material/Fingerprint';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import "./login.css"
import { useState } from 'react';

import config from "../config"

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loadingStatus, updateLoadingStatus] = useState(false);

    const [error, setError] = useState({})
    console.log(error);

    function loginFormSubmit(event) {
        event.preventDefault();

        login(username, password, navigate);
    }

    function login(username, password, navigate) {
        updateLoadingStatus(true);
        setError({})

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

        fetch(config.API_BASE_URL + "/authentication/login", requestOptions)
            .then(async response => {
                if (response.ok) {
                    // Store JWT token in cookie
                    // const token = response.headers.get('Authorization').split(' ')[1];
                    // Cookies.set('jwt', token);
                    // console.log(response.headers.get('Set-Cookie'));

                    return response.text();
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
            .catch(error => {
                console.log('error', error.message)
                if (error.message == "Invalid User") {
                    setError({ username: error.message });
                } else if (error.message == "Invalid Password") {
                    setError({ password: error.message });
                } else {
                    setError({ error: "Failed to Login" })
                }
            }).finally(() => {
                updateLoadingStatus(false);
            })
    }

    return <>
        <form className='loginForm' onSubmit={loginFormSubmit}>
            <h1>Login</h1>
            <TextField
                // error
                fullWidth
                id="input-username"
                label="Username"
                onChange={e => setUsername(e.target.value)}
                defaultValue=""
                helperText={error.username}
                error={error.username?.length || false}
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
                helperText={error.password}
                error={error.password?.length || false}
            />
            <br />
            <br />
            <hr />
            <br />
            <div className='alignCenter'>
                <Button
                    type='submit'
                    variant="contained"
                    endIcon={
                        loadingStatus ?
                            <CircularProgress sx={{ color: 'white', zoom: "0.6" }} /> :
                            <FingerPrint />
                    }
                    disabled={loadingStatus}
                >
                    {loadingStatus ? "logging in" : "Login"}
                </Button>
                {/* <button type="submit">Login</button> */}
                {/* <button type="submit" className='simpleBtn'>Login</button> */}
            </div>
            {
                error.error?.length &&
                <h4 className='textCenter' style={{ color: "#d32f2f", paddingTop: "1rem" }}>{error.error}</h4>
            }
        </form >
    </>
}