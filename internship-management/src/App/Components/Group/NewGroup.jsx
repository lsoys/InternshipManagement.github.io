import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import PeopleIcon from '@mui/icons-material/People';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';

import PopUp from "../Common/PopUp";

export default function CandidateInformation(props) {
    const params = useParams();
    // eslint-disable-next-line
    const candidateID = params.candidateID

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/groups/");
    };

    return <>
        <div>
            <PopUp popUpClose={handleClose} fullWidth title="Add new group" icon={<PeopleIcon style={{ fontSize: "2rem" }} />}>
                <DialogContent dividers>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { my: 2 },
                            p: 1,
                        }}
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="standard-basic"
                                label="Group Name"
                                variant="outlined"
                                fullWidth
                            />
                            <Autocomplete
                                multiple
                                id="Intern List"
                                options={top100Films}
                                getOptionLabel={(option) => option.name}
                                defaultValue={[top100Films[0]]}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Interns"
                                        placeholder="Favorites"
                                    />
                                )}
                            />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Link to={""}>
                        <Button variant="contained" color="info">
                            Create Group
                        </Button>
                    </Link>
                    <Link to={"../"}>
                        <Button variant="contained" color="error">
                            Cancel
                        </Button>
                    </Link>
                </DialogActions>
            </PopUp>
        </div>
    </>

}


const top100Films = [
    { name: 'Sejal Khilari', year: 2002 },
    { name: 'Sumit Kawale', year: 2002 },
    { name: 'Anuja Katruwar', year: 2002 },
    { name: 'Kushal Bhattad', year: 2002 },
];