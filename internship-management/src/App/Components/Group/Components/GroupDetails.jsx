import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import PopUp from "../../Common/PopUp";
import DialogContent from '@mui/material/DialogContent';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import GradeIcon from '@mui/icons-material/Grade';

import { GroupContext } from "../ListGroups"

export default function GroupDetails() {
    const { data, getData } = useContext(GroupContext);

    const [formData, updateFormData] = useState({})
    const [helperData, updateHelperData] = useState({})

    const groupID = useParams().groupID

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/groups/");
    };

    let group = data.find(group => group._id === groupID)
    if (!group) {
        return;
    }

    function deleteGroupRequest() {
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
        <PopUp popUpClose={handleClose} title="Group Details" icon={<PeopleAltOutlinedIcon style={{ fontSize: "2rem" }} />}>
            <DialogContent>
                <div className="space-between" style={{ borderTop: "1px solid #dedede", marginTop: "0rem", padding: "0 .5rem", paddingTop: "1rem", minWidth: "25rem" }}>
                    <b>
                        
                    </b>
                    <b>
                        {group.createDate}
                    </b>
                </div>
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
                                    value={group.groupName}
                                    onKeyUp={updateForm}
                                    helperText={helperData.title || ""}
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
                                            group?.members?.map((value, index) => {
                                                return <li key={value + index}>{value?.name}</li>
                                            })
                                        }
                                    </ul>
                                </div>
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
                                navigate("/groups/")
                            }} variant="contained" color='primary'>Close</Button>
                        </Box>
                    </form>
                </div>
            </DialogContent>
        </PopUp>
    </>
}