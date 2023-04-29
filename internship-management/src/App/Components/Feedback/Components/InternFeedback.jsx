import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import PopUp from "../../Common/PopUp";
import DialogContent from '@mui/material/DialogContent';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { InternContext } from '../ListFeedbacks';
let dd = `hello my name is sumit and i know one girl. 
I feel good when I see her, and I wish to just see her 😍 for my remaining life
I wish we could together! She is soooo special for me!. I LOVE HER :)
It's hard to describe her in few words,
She is the best one in this earth!! she is pretty, cleaver, polite, free, open minded and with full of active sense of humber!!
she is just beautiful!`

export default function InternFeedback() {
    const data = useContext(InternContext);

    const candidateID = useParams().candidateID

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/feedbacks");
    };

    let candidate = data.find(candidate => candidate._id === candidateID)
    if (!candidate) {
        return;
    }

    return <>
        <PopUp fullWidth popUpClose={handleClose} title="Intern Feedback" icon={<PersonIcon style={{ fontSize: "2rem" }} />}>
            <DialogContent>
                <div>
                    <span style={{ padding: "1rem" }}>
                        <strong style={{ paddingRight: ".5rem" }}>Name: </strong>
                        <code>{candidate.fullName}</code>
                    </span>
                    <span style={{ padding: "1rem" }}>
                        <strong style={{ paddingRight: ".5rem" }}>EmailID: </strong>
                        <code>{candidate.emailID}</code>
                    </span>
                </div>

                <div style={{ borderTop: "1px solid #dedede", marginTop: "1rem", borderBottom: "1px solid #dedede" }}>
                    <Box
                        sx={{
                            m: 2,
                        }}
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-multiline-static"
                                label="Feedback"
                                placeholder="Write Your Feedback Here"
                                fullWidth
                                multiline
                                rows={4.5}
                            />
                            <div style={{ textAlign: "right" }}>
                                <Button variant="contained">Add Feedback</Button>
                            </div>
                        </div>
                    </Box>
                </div>
                <div style={{ padding: "0 1rem", height: "48vh", overflowY: "auto" }}>
                    <ul className="feedbackList">
                        <li>
                            <pre>
                                {dd}
                            </pre>
                            <div className="feedbackFooter">
                                <small>{"2023-04-01 14:03:00"}</small>
                            </div>
                        </li>
                        <li>
                            <pre>
                                {dd}
                            </pre>
                            <div className="feedbackFooter">
                                <small>{"2023-04-01 14:03:00"}</small>
                            </div>
                        </li>
                    </ul>
                </div>
            </DialogContent>
        </PopUp>
    </>
}