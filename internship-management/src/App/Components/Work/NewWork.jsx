import { useEffect, useState } from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import PageTitle from '../Common/PageTitle';
import common from "../../../common"
import config from '../../../config';

function fetchInternsData() {
    return new Promise((res, rej) => {
        var myHeaders = new Headers();
        const jwt = common.getCookieJWT();
        myHeaders.append("Authentication", "bearer " + jwt);
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include', // This is required to send cookies with the request
        };

        fetch(config.API_BASE_URL + "/candidate/intern", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                res(result);
            })
            .catch(error => {
                console.log('error', error)
                rej(error);
            });
    })
}

function fetchGroupsData() {
    return new Promise((res, rej) => {
        var myHeaders = new Headers();
        const jwt = common.getCookieJWT();
        myHeaders.append("Authentication", "bearer " + jwt);
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include', // This is required to send cookies with the request
        };

        fetch(config.API_BASE_URL + "h/group", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                res(result);
            })
            .catch(error => {
                console.log('error', error)
                rej(error);
            });
    })
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function NewWork() {
    const [formData, updateFormData] = useState({})
    const [helperData, updateHelperData] = useState({})

    const [internsList, updateInternsList] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [selectedInternsListHelperText, updateSelectedInternsListHelperText] = useState("");

    console.log(formData, selectedOptions)

    const handleListChange = (event, value) => {
        setSelectedOptions(value);
    };

    const [loading, setLoading] = useState(false);
    const [statusSuccess, updateStatusSuccess] = useState(false);

    function handleSubmit() {
        updateSelectedInternsListHelperText("");

        if (!selectedOptions.length) {
            updateSelectedInternsListHelperText("Please Select at least 1 intern");
            return;
        }

        document.forms["createWorkForm"].requestSubmit()
    }

    function resetForm() {
        updateSelectedInternsListHelperText("");
        document.forms["createWorkForm"].reset();
        updateStatusSuccess(false)
        setLoading(false)
        updateFormData({})
        updateHelperData({})
        setSelectedOptions([])
        console.log(formData)
    }

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

    function getData(parameter = "") {
        fetchInternsData(parameter).then(array => {
            array = array.reverse()
            console.log(array);
            updateInternsList((oldData) => {
                let newData = array
                    .filter(intern => { // removing interns who's internship is completed
                        console.log(intern)
                        const endDate = new Date(intern.hireDetails.toDate).setHours(0, 0, 0, 0);
                        const today = new Date().setHours(0, 0, 0, 0);

                        if (endDate >= today) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    .map(data => { return { id: data._id, name: data.fullName + " - " + data.emailID, email: data.emailID, type: "intern" } });
                console.log("data", newData)
                return newData;
            });
        })

        fetchGroupsData(parameter).then(array => {
            array = array.reverse()
            updateInternsList((oldData) => {
                let newData = array.map(data => { return { id: data._id, name: data.groupName + " - group", type: "group" } });
                return [...oldData, ...newData];
            });
        })
    }

    useEffect(() => {
        getData();
    }, [])

    function submitAssignWork(e) {
        e.preventDefault();
        setLoading(true);
        updateHelperData({ deadline: "" })

        const deadline = new Date(e.target.deadline.value).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);

        if (deadline < today) {
            updateHelperData({ deadline: "you cannot give past deadline date" })
            setLoading(false);
            return;
        }

        const assignTo = selectedOptions/* .map((value, index) => {
            const { id: _id, type } = value;
            return { _id, type }
        }) */

        const newWork = { ...formData, assignTo }
        console.log(newWork)

        var myHeaders = new Headers();
        const jwt = common.getCookieJWT();
        myHeaders.append("Authentication", "bearer " + jwt);
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(newWork),
            redirect: 'follow',
            credentials: 'include', // This is required to send cookies with the request
        };

        fetch(config.API_BASE_URL + "/work", requestOptions)
            .then(async response => {
                if (response.ok) {
                    return response.json()
                }
                const data = await response.json();
                throw Error(data.message);
            })
            .then(result => {
                console.log(result);
                setLoading(false);
                updateStatusSuccess(true);
                setTimeout(() => {
                    updateStatusSuccess(false);
                }, 5000)
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
        <PageTitle title="Assign New Work">
            <AddBoxOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <div className='bg-light'>
            <form name="createWorkForm" onSubmit={submitAssignWork} autoComplete="off">
                <Box
                    sx={{
                        '& .MuiTextField-root': { my: 2 },
                        py: 4,
                        px: 3
                    }}
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Title"
                            variant="filled"
                            name='title'
                            fullWidth
                            onKeyUp={updateForm}
                            helperText={helperData.title || ""}
                        />
                        <TextField
                            // required
                            id="outlined-required"
                            label="Work Description"
                            name='description'
                            fullWidth
                            multiline
                            rows={4}
                            onKeyUp={updateForm}
                            helperText={helperData.description || ""}
                        />
                    </div>
                    <div>
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={internsList}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={handleListChange}
                            value={selectedOptions}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} error={selectedInternsListHelperText || false} helperText={selectedInternsListHelperText || ""} label={`Members (${selectedOptions.length})`} placeholder="List of interns / groups" />
                            )}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            type='date'
                            id="outlined-required"
                            label="Deadline"
                            variant="filled"
                            name='deadline'
                            onChange={updateForm}
                            error={!!helperData.deadline}
                            helperText={helperData.deadline || ""}
                            InputLabelProps={{
                                shrink: true,
                            }} />

                        <FormControl sx={{ minWidth: 150, m: 2 }}>
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={5}
                                label="Priority"
                                name="priority"
                                onChange={updateForm}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <LoadingButton
                        onClick={statusSuccess ? null : handleSubmit}
                        sx={{ mt: 2, mr: 2 }}
                        endIcon={statusSuccess ? <CheckIcon /> : <AddIcon />}
                        loading={loading}
                        loadingPosition="end"
                        color={statusSuccess ? "success" : "primary"}
                        variant="contained"
                    >
                        <span>{statusSuccess ? "Assigned" : "Assign"}</span>
                    </LoadingButton>
                    <Button type='reset' onClick={resetForm} sx={{ mt: 2 }} variant="contained" color='light'>Reset</Button>
                </Box>
            </form>
        </div>
    </>
}