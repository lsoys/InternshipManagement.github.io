import React, { useState } from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PageTitle from '../Common/PageTitle';
import { NumericFormatCustom } from '../Common/FormCustom';
import common from "../../../common"

export default function NewCandidate() {
    const [formData, updateFormData] = useState({
        firstName: "Sejal",
        lastName: "Khilari",
        age: 20,
        mobile: 9898989898,
        alternativeMobile: 9021368015,
        emailID: "sejalkhilari2002@gmail.com",
        github: "Sejal-Khilari",
        telegram: "sejalkhilari",
        collegeName: "pict",
        currentGraduation: "B.E.",
        graduationYear: "2024",
        resumeLink: "https://sumitkawale.github.io/portfolio/resume"
    })

    const [helperData, updateHelperData] = useState({})


    function updateForm(e) {
        updateFormData(prev => {
            const newObj = {
                ...prev,
                [e.target.name]: String(e.target.value).trim()
            }
            // console.log(newObj)
            return newObj;
        })
    }

    function submitForm(e) {
        e.preventDefault();

        // FETCH REQUEST
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const jwt = common.getCookieJWT();
        myHeaders.append("Authentication", "bearer " + jwt);

        var raw = JSON.stringify(formData);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:2324/candidate/", requestOptions)
            .then(async response => {
                if (response.ok) {
                    return response.json()
                }
                const json = await response.json();
                throw Error(json.message);
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return <>
        <PageTitle title="add new candidate">
            <AddBoxOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <div className='bg-light'>
            <form onSubmit={submitForm}>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 2 },
                        py: 4,
                        px: 1
                    }}
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="First Name"
                            variant="filled"
                            name='firstName'
                            onKeyUp={updateForm}
                            helperText={helperData.firstName || ""}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Last Name"
                            variant="filled"
                            name='lastName'
                            onKeyUp={updateForm}
                            helperText={helperData.lastName || ""}
                        />
                        <TextField
                            id="outlined-number"
                            label="Age"
                            InputProps={{
                                inputComponent: NumericFormatCustom,
                            }}
                            name="age"
                            onKeyUp={updateForm}
                            helperText={helperData.age || ""}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="ResumeLink"
                            variant="filled"
                            name="resumeLink"
                            onKeyUp={updateForm}
                            helperText={helperData.resumeLink || ""}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            label="Mobile"
                            id="formatted-numberformat-input"
                            InputProps={{
                                inputComponent: NumericFormatCustom,
                            }}
                            variant="filled"
                            name="mobile"
                            onKeyUp={updateForm}
                            helperText={helperData.mobile || ""}
                        />
                        <TextField
                            label="Alternative Mobile"
                            id="formatted-numberformat-input"
                            InputProps={{
                                inputComponent: NumericFormatCustom,
                            }}
                            name="alternativeMobile"
                            onKeyUp={updateForm}
                            helperText={helperData.alternativeMobile || ""}
                        />
                        <TextField
                            required
                            id="outlined-password-input"
                            label="EmailID"
                            style={{ maxWidth: "29rem" }}
                            type="email"
                            variant="filled"
                            name="emailID"
                            onKeyUp={updateForm}
                            helperText={helperData.emailID || ""}
                        />
                        <br />
                        <TextField
                            id="outlined-password-input"
                            label="GitHub"
                            name="github"
                            onKeyUp={updateForm}
                            helperText={helperData.github || ""}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Telegram"
                            name="telegram"
                            onKeyUp={updateForm}
                            helperText={helperData.telegram || ""}
                        />
                    </div>
                    <div>
                        <TextField
                            id="standard-required"
                            label="College Name"
                            name="collegeName"
                            onKeyUp={updateForm}
                            helperText={helperData.collegeName || ""}
                        />
                        <TextField
                            id="standard-required"
                            label="Current Graduation"
                            name="currentGraduation"
                            onKeyUp={updateForm}
                            helperText={helperData.currentGraduation || ""}
                        />
                        <TextField
                            id="standard-required"
                            label="Graduation Year"
                            name="graduationYear"
                            onKeyUp={updateForm}
                            helperText={helperData.graduationYear || ""}
                        />

                    </div>
                    <Button type='submit' sx={{ m: 2 }} variant="contained">Create</Button>
                </Box>
            </form>
        </div>
    </>
}