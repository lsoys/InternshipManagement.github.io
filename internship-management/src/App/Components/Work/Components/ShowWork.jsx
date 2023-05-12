import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import PopUp from "../../Common/PopUp";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';

import { WorkContext } from '../ListWork';

import "../../../css/showWork.css"

export default function ShowWork() {
    const data = useContext(WorkContext);

    const [formData, updateFormData] = useState({})
    const [helperData, updateHelperData] = useState({})

    const [internsList, updateInternsList] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleListChange = (event, value) => {
        setSelectedOptions(value);
    };

    const [loading, setLoading] = useState(false);
    const [statusSuccess, updateStatusSuccess] = useState(false);

    function handleSubmit() {
        document.forms["createWorkForm"].requestSubmit()
    }

    const workID = useParams().workID;

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/works/");
    };


    useEffect(() => {
        let work = data.find(work => work._id === workID)
        if (work) {
            updateFormData({
                ...work
            });
            console.log(work)
        } else {
            // alert("no work found");
            return navigate("/works/");
        }
    }, [data])

    function deleteWorkRequest() {
        updateStatusSuccess(false)
        setLoading(false)
        updateHelperData({})
        console.log("delete data")
    }

    function updateForm(e) {
        console.log(formData)
        updateFormData(prev => {
            const newObj = {
                ...prev,
                [e.target.name]: String(e.target.value).trim()
            }
            // console.log(newObj)
            return newObj;
        })
    }

    function submitUpdateWork(e) {
        e.preventDefault();
        // setLoading(true)
        updateStatusSuccess(true)
    }

    return <>
        <div>
            <PopUp popUpClose={handleClose} title="Work Details" icon={<PersonIcon style={{ fontSize: "2rem" }} />}>
                <DialogContent dividers>
                    {/* <h1>title: {work.title}</h1>
                    <hr />
                    <h2>description: {work.description}</h2>
                    <hr />
                    <h2>deadline: {work.deadline}</h2>
                    <hr />
                    <h2>status: {work.status ? "completed" : "pending"}</h2>
                    <hr />
                     */}
                    <div>
                        <form name="createWorkForm" autoComplete="off" onSubmit={submitUpdateWork}>
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { my: 2 },
                                    px: 2
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
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={formData.title || ""}
                                        onKeyUp={updateForm}
                                        helperText={helperData.title || ""}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Work Description"
                                        variant="filled"
                                        name='description'
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        multiline
                                        rows={4}
                                        value={formData.description || ""}
                                        onKeyUp={updateForm}
                                        helperText={helperData.description || ""}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    {/* <Autocomplete
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
                                            <TextField {...params} label={`Members (${selectedOptions.length})`} placeholder="List of interns / groups" />
                                        )}
                                    /> */}
                                    <div className="members">
                                        <h3>Members</h3>
                                        <ul className={"showWork"}>
                                            {
                                                formData.assignTo?.map((value, index) => {
                                                    return <li key={value + index}>{value?.name}</li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <TextField
                                        required
                                        type='date'
                                        id="outlined-required"
                                        label="Deadline"
                                        variant="filled"
                                        name='deadline'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={updateForm}
                                        value={formData.deadline || ""}
                                        helperText={helperData.deadline || ""}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />

                                    <FormControl sx={{ minWidth: 150, m: 2 }}>
                                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.priority || 5}
                                            label="Priority"
                                            name="priority"
                                            onChange={updateForm}
                                            readOnly
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                {/* <LoadingButton
                                    onClick={statusSuccess ? null : handleSubmit}
                                    sx={{ mt: 2, mr: 2 }}
                                    endIcon={statusSuccess ? <CheckIcon /> : <EditIcon />}
                                    loading={loading}
                                    loadingPosition="end"
                                    color={statusSuccess ? "success" : "info"}
                                    variant="contained"
                                >
                                    <span>{statusSuccess ? "Updated" : "Update"}</span>
                                </LoadingButton>
                                <Button onClick={deleteWorkRequest} sx={{ mt: 2 }} variant="contained" color='error'>Delete</Button> */}
                                <Button sx={{ mt: 2 }} onClick={function () {
                                    navigate("/works/")
                                }} variant="contained" color='primary'>Close</Button>
                            </Box>
                        </form>
                    </div>
                </DialogContent>
            </PopUp>
        </div>
    </>
}
