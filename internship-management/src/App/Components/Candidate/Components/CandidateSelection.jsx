import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PopUp from "../../Common/PopUp";
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

export default function CandidateSelection(props) {
    const params = useParams();
    // eslint-disable-next-line
    const candidateID = params.candidateID;

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/candidates/get/");
    };

    let candidate = {
        "_id": "63f6fe6fa20a5292596faf43",
        "firstName": "sejal",
        "lastName": "khilari",
        "age": "21",
        "mobile": "9898989898.0",
        "alternativeMobile": "8787878787",
        "emailID": "sejalkhilari2002@mail.com",
        "github": "Sejal-Khilari",
        "telegram": "sejalkhilari",
        "collegeName": "pict",
        "currentGraduation": "B.E.",
        "graduationYear": "2024",
        "resumeLink": "http://sejalkhilari/resume/link",
        "createDate": "23/2/2023, 11:18:58 am",
        "__v": "0"
    }

    return <>
        <PopUp popUpClose={handleClose} goBack>
            <DialogContent dividers>
                <div>
                    <h4 style={{ fontWeight: "normal" }}>
                        <b>Candidate Name: </b>
                        {candidate.firstName + " " + candidate.lastName}

                        <span style={{ padding: "0 1rem" }}></span>

                        <b>Candidate ID: </b>
                        {candidateID}
                    </h4>

                </div>
            </DialogContent>
            <DialogContent dividers>
                <div>
                    <p>Question 1: * * * * *</p>
                    <hr />
                    <p>Question 2: * * * * *</p>
                    <hr />
                    <p>Question 3: * * * * *</p>
                    <hr />
                    <p>Question 4: * * * * *</p>
                    <br />
                    <TextField
                        id="outlined-multiline-static"
                        label="Overall Feedback (Optional)"
                        fullWidth
                        multiline
                        rows={4}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Link to={""}>
                    <Button variant="contained" color="primary">
                        Hire
                    </Button>
                </Link>
                <Link to={""}>
                    <Button variant="contained" color="error">
                        Reject
                    </Button>
                </Link>
            </DialogActions>
        </PopUp>
    </>
}