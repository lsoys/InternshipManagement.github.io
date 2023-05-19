import { useState } from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import PageTitle from '../Common/PageTitle';
import { NumericFormatCustom } from '../Common/FormCustom';
import LoadingButton from '@mui/lab/LoadingButton';

import common from "../../../common"
import config from "../../../config"

export default function NewCandidate() {
    const [formData, updateFormData] = useState({ mobile: "", alternativeMobile: "" })

    const [helperData, updateHelperData] = useState({})

    const [loading, setLoading] = useState(false);
    const [statusSuccess, updateStatusSuccess] = useState(false);
    function handleSubmit() {
        document.forms["createCandidateForm"].requestSubmit()
    }

    function resetForm() {
        document.forms["createCandidateForm"].reset();
        updateStatusSuccess(false)
        setLoading(false)
        updateFormData({})
        console.log(formData)
    }

    function updateForm(e) {
        updateFormData(prev => {
            const newObj = {
                ...prev,
                [e.target.name]: String(e.target.value).trim()
            }
            // console.log(newObj)
            validateForm(newObj);
            return newObj;
        })
    }

    function validateForm(formData, final = false) {// faltu logic lavla ahe 
        let status = true;
        if (formData.mobile.length !== 10 && final) {
            updateHelperData((oldData) => {
                return { ...oldData, mobile: "Incorrect Mobile Number" }
            })
            status = false;
        } else if (formData.mobile.length > 10) {
            updateHelperData((oldData) => {
                return { ...oldData, mobile: "Incorrect Mobile Number" }
            })
            status = false;
        } else {
            updateHelperData((oldData) => {
                return { ...oldData, mobile: "" }
            })
        }

        if (formData.alternativeMobile.length !== 0) {
            if (formData.alternativeMobile.length !== 10 && final) {
                updateHelperData((oldData) => {
                    return { ...oldData, alternativeMobile: "Incorrect Mobile Number" }
                })
                status = false;
            } else if (formData.alternativeMobile.length > 10) {
                updateHelperData((oldData) => {
                    return { ...oldData, alternativeMobile: "Incorrect Mobile Number" }
                })
                status = false;
            }
            else {
                updateHelperData((oldData) => {
                    return { ...oldData, alternativeMobile: "" }
                })
            }
        }

        return status;
    }

    function submitForm(e) {
        e.preventDefault();
        updateHelperData({})
        setLoading(true);

        if (!validateForm(formData, true)) {
            setLoading(false);
            return;
        };

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

        fetch(config.API_BASE_URL+"/candidate/", requestOptions)
            .then(async response => {
                if (response.ok) {
                    return response.json()
                }
                const json = await response.json();
                throw Error(json.message);
            })
            .then(result => {
                console.log(result)
                setLoading(false);
                updateStatusSuccess(true);
            })
            .catch(error => {
                console.log('error', error)
                setLoading(false);

                if (error.message == "token is not valid") {
                    navigate("/authentication/login");
                }
            });
    }

    return <>
        <PageTitle title="add new candidate">
            <AddBoxOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <div className='bg-light'>
            <form name="createCandidateForm" onSubmit={submitForm} autoComplete="off">
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 2 },
                        py: 4,
                        px: 1
                    }}
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="First Name"
                            variant="filled"
                            name='firstName'
                            onChange={updateForm}
                            helperText={helperData.firstName || ""}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Last Name"
                            variant="filled"
                            name='lastName'
                            onChange={updateForm}
                            helperText={helperData.lastName || ""}
                        />
                        <TextField
                            id="outlined-number"
                            label="Age"
                            InputProps={{
                                inputComponent: NumericFormatCustom,
                            }}
                            name="age"
                            onChange={updateForm}
                            value={formData.age || ""}
                            helperText={helperData.age || ""}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="ResumeLink"
                            variant="filled"
                            name="resumeLink"
                            onChange={updateForm}
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
                            onChange={updateForm}
                            value={formData.mobile || ""}
                            helperText={helperData.mobile || ""}
                            error={helperData.mobile || false}
                        />
                        <TextField
                            label="Alternative Mobile"
                            id="formatted-numberformat-input"
                            InputProps={{
                                inputComponent: NumericFormatCustom,
                            }}
                            name="alternativeMobile"
                            onChange={updateForm}
                            value={formData.alternativeMobile || ""}
                            helperText={helperData.alternativeMobile || ""}
                            error={helperData.alternativeMobile || false}
                        />
                        <TextField
                            required
                            id="outlined-password-input"
                            label="EmailID"
                            style={{ maxWidth: "29rem" }}
                            type="email"
                            variant="filled"
                            name="emailID"
                            onChange={updateForm}
                            helperText={helperData.emailID || ""}
                        />
                        <br />
                        <TextField
                            id="outlined-password-input"
                            label="GitHub"
                            name="github"
                            onChange={updateForm}
                            helperText={helperData.github || ""}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Telegram"
                            name="telegram"
                            onChange={updateForm}
                            helperText={helperData.telegram || ""}
                        />
                    </div>
                    <div>
                        <TextField
                            id="standard-required"
                            label="College Name"
                            name="collegeName"
                            onChange={updateForm}
                            helperText={helperData.collegeName || ""}
                        />
                        <TextField
                            id="standard-required"
                            label="Current Graduation"
                            name="currentGraduation"
                            onChange={updateForm}
                            helperText={helperData.currentGraduation || ""}
                        />
                        <TextField
                            id="standard-required"
                            label="Graduation Year"
                            name="graduationYear"
                            onChange={updateForm}
                            helperText={helperData.graduationYear || ""}
                        />
                    </div>

                    <LoadingButton
                        onClick={statusSuccess ? null : handleSubmit}
                        sx={{ m: 2 }}
                        endIcon={statusSuccess ? <CheckIcon /> : <AddIcon />}
                        loading={loading}
                        loadingPosition="end"
                        color={statusSuccess ? "success" : "primary"}
                        variant="contained"
                    >
                        <span>{statusSuccess ? "CREATED" : "Create"}</span>
                    </LoadingButton>
                    {
                        statusSuccess ?
                            <Button type='reset' onClick={resetForm} sx={{ m: 2 }} variant="contained">Add New Candidate</Button>
                            : ""
                    }
                </Box>
            </form>
        </div>
    </>
}