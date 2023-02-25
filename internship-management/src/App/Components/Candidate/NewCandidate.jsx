import React from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { NumericFormat } from 'react-number-format';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import PageTitle from '../Common/PageTitle';

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
    props,
    ref,
) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            valueIsNumericString
        />
    );
});

export default function NewCandidate() {
    return <>
        <PageTitle title="add new candidate">
            <AddBoxOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <form>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2 },
                }}
                validate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="First Name"
                        defaultValue=""
                        helperText="Some important text"
                        variant="filled"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Last Name"
                        defaultValue=""
                        helperText="Some important text"
                        variant="filled"
                    />
                    <TextField
                        id="outlined-number"
                        label="Age"
                        type="number"
                        helperText="Some important text"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="ResumeLink"
                        defaultValue=""
                        variant="filled"
                    />
                </div>
                <div>
                    <TextField
                        required
                        label="Mobile"
                        name="numberformat"
                        id="formatted-numberformat-input"
                        InputProps={{
                            inputComponent: NumericFormatCustom,
                        }}
                        variant="filled"
                        helperText="Some important text"
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Alternative Mobile"
                        type="number"
                        helperText="Some important text"
                    />
                    <TextField
                        id="outlined-password-input"
                        label="EmailID"
                        style={{ maxWidth: "29rem" }}
                        type="email"
                        helperText="Some important text"
                    />
                    <br />
                    <TextField
                        id="outlined-password-input"
                        label="GitHub"
                        helperText="Some important text"
                    />
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Telegram"
                        helperText="Some important text"
                        variant="filled"
                    />
                </div>
                <div>
                    <TextField
                        id="standard-required"
                        label="College Name"
                        defaultValue=""
                        variant="standard"
                    />
                    <TextField
                        id="standard-required"
                        label="Current Graduation"
                        defaultValue=""
                        variant="standard"
                    />
                    <TextField
                        id="standard-required"
                        label="Graduation Year"
                        defaultValue=""
                        variant="standard"
                    />

                </div>
                <Button sx={{ m: 2 }} variant="contained">Contained</Button>
            </Box>
        </form>
    </>
}