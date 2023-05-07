import { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import PopUp from "../../Common/PopUp";

import { CandidateContext } from '../ListCandidates';

export default function CandidateInformation(props) {
    const { data } = useContext(CandidateContext);
    // console.log(data)

    // eslint-disable-next-line
    const candidateID = useParams().candidateID

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/candidates/");
    };
    
    let candidate = data.find(candidate => candidate._id === candidateID)
    if (!candidate) {
        return;
    }

    return <>
        <div>
            <PopUp popUpClose={handleClose} title="candidate" icon={<PersonIcon style={{ fontSize: "2rem" }} />}>

                <DialogContent dividers>
                    <div className="space-between">
                        <a href={candidate.resumeLink} target="_blank" rel="noreferrer" style={{ marginRight: "1rem" }}><Button variant="contained">Resume</Button></a>
                        <Link to={"./selection"}>
                            <Button variant="contained">Proceed To Selection</Button>
                        </Link>
                    </div>
                </DialogContent>
                <DialogContent dividers>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 2 },
                        }}
                        autoComplete="off"
                    >
                        <div>
                            <TextField id="standard-basic" label="Name" variant="standard"
                                defaultValue={
                                    candidate.firstName + " " + candidate.lastName
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField id="standard-basic" label="Age" variant="standard"
                                defaultValue={
                                    candidate.age
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic" label="Mobile" variant="standard"
                                defaultValue={
                                    candidate.mobile
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField id="standard-basic" label="Alternative Mobile" variant="standard"
                                defaultValue={
                                    candidate.alternativeMobile
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField id="standard-basic" label="Email" variant="standard"
                                defaultValue={
                                    candidate.emailID
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic" label="GitHub" variant="standard"
                                defaultValue={
                                    candidate.github
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField id="standard-basic" label="Telegram" variant="standard"
                                defaultValue={
                                    candidate.telegram
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic" label="College Name" variant="standard"
                                defaultValue={
                                    candidate.collegeName
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField id="standard-basic" label="Current Graduation" variant="standard"
                                defaultValue={
                                    candidate.currentGraduation
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField id="standard-basic" label="Graduation Year" variant="standard"
                                defaultValue={
                                    candidate.graduationYear
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Link to={"./selection"}>
                        <Button autoFocus>
                            Proceed To Selection
                        </Button>
                    </Link>
                </DialogActions>
            </PopUp>
        </div>
    </>

}