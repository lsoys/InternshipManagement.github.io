import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import PeopleIcon from '@mui/icons-material/People';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { GroupContext } from './ListGroups';
import PopUp from "../Common/PopUp";
import common from "../../../common"
import config from "../../../config";

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CandidateInformation(props) {
    const { data, getData: getParentData } = useContext(GroupContext);

    const [internsList, updateInternsList] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [selectedInternsListHelperText, updateSelectedInternsListHelperText] = useState("");

    const addGroupPopupState = useState(true);

    const handleListChange = (event, value) => {
        setSelectedOptions(value);
        updateSelectedInternsListHelperText("");
    };

    // eslint-disable-next-line
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/groups/");
    };

    function getData(fetchFrom = fetchInternsData, parameter = "") {
        fetchFrom(parameter).then(array => {
            array = array.reverse()
            updateInternsList((oldData) => {
                let newData = array.map(data => { return { id: data._id, name: data.fullName + " - " + data.emailID, email: data.emailID, type: "intern" } });
                return newData;
            });
            // updateInternsList(oldData => {
            //     let newData = data.map(data => { return { id: data._id, name: data.groupName, type: "group" } });;
            //     return [...oldData, ...newData]
            // })
        })
    }

    useEffect(() => {
        getData();
    }, [])

    function submitCreateGroup(e) {
        e.preventDefault();

        if (!selectedOptions.length) {
            updateSelectedInternsListHelperText("Please Select at least 1 intern");
            return;
        }

        const groupName = e.target.groupName.value
        const newGroup = { groupName, members: selectedOptions }

        var myHeaders = new Headers();
        const jwt = common.getCookieJWT();
        myHeaders.append("Authentication", "bearer " + jwt);
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(newGroup),
            redirect: 'follow',
            credentials: 'include', // This is required to send cookies with the request
        };

        fetch(config.API_BASE_URL + "/group", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                addGroupPopupState[1](false);
                getParentData();
                handleClose();
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    return <>
        <div>
            <PopUp state={addGroupPopupState} popUpClose={handleClose} fullWidth title="Add new group" icon={<PeopleIcon style={{ fontSize: "2rem" }} />}>
                <form onSubmit={submitCreateGroup} autoComplete="off">
                    <DialogContent dividers>
                        <Box
                            sx={{
                                '& .MuiTextField-root': { my: 2 },
                                p: 1,
                            }}
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    required
                                    id="standard-basic"
                                    label="Group Name"
                                    variant="outlined"
                                    name="groupName"
                                    fullWidth
                                />
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
                                        <TextField {...params} error={!!selectedInternsListHelperText || false} helperText={selectedInternsListHelperText || ""} label={`Members (${selectedOptions.length})`} placeholder="List of interns / groups" />
                                    )}
                                />
                            </div>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" variant="contained" color="info">
                            Create Group
                        </Button>
                        <Link to={"../"} style={{ marginLeft: "1rem" }}>
                            <Button variant="contained" color="error">
                                Cancel
                            </Button>
                        </Link>
                    </DialogActions>
                </form>
            </PopUp>
        </div >
    </>

}