import React, { useState } from 'react';
import { TextField, Grid, Snackbar, Slide } from '@material-ui/core';
import { BiUserCircle } from 'react-icons/bi';
import { CgPassword } from 'react-icons/cg';
import { apiLogin } from '../apis/user.api';


function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

function FormLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleClose = (reason) => {
        setOpen(false);
    };

    async function login() {
        const res = await apiLogin(username, password);

        const { data } = res.data;
        console.log(res.data);

        if (res.status === 200) {
            localStorage.setItem('x_access_token', data?.token);
            localStorage.setItem('x_iot_user', data?.user?.username);
            localStorage.setItem('x_iot_isAdmin', data?.user?.isAdmin);
            window.location = '/Home';
        } else {
            setErrorMessage(data.data);
            setOpen(true);
        }
    }

    return (
        <div className="bg-primary" style={{ height: '100%' }}>
            <div className="container d-flex justify-content-center align-items-center full-height">
                <form className="shadow border rounded col-md-7 bg-white p-4 mb-5 mt-5">
                    <h2>Sign in</h2>
                    <Grid container alignItems="flex-end">
                        <Grid item xs={2}>
                            <BiUserCircle size="1.5em" color="#007bff" />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                label="username"
                                fullWidth
                                value={username}
                                color="secondary"
                                onChange={(e) => setUsername(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Grid className="mt-2" container alignItems="flex-end">
                        <Grid item xs={2}>
                            <CgPassword size="1.5em" color="#007bff" />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                type="password"
                                label="password"
                                value={password}
                                fullWidth
                                color="secondary"
                                onChange={(e) => setPassword(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        TransitionComponent={SlideTransition}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message={errorMessage}
                    />
                    <button type="button" onClick={login} className="mt-4 bg-primary btn btn-default">Login</button>
                </form>
            </div>
        </div>
    );
}

export default FormLogin;