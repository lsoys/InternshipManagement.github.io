import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import PopUp from "../../Common/PopUp";
import DialogContent from '@mui/material/DialogContent';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import fetchData from "../../Common/fetchData";

import { InternContext } from '../ListFeedbacks';
import common from "../../../../common";
import config from "../../../../config";

export default function InternFeedback() {
    const candidateID = useParams().candidateID

    const [feedbacks, updateFeedbacks] = useState([]);
    const [candidate, updateCandidate] = useState({});
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/feedbacks");
    };

    function getData(fetchFrom = () => fetchData("get", "/feedback?internID=" + candidateID), reloadSearchOptions = true) {
        fetchFrom().then(data => {
            data = data.feedbacks.reverse()
            updateFeedbacks(data);
        })
            .catch(error => {
                console.log(error);
                if (error.message == "token is not valid") {
                    navigate("/authentication/login");
                }
            })
    }

    const listCandidates = useContext(InternContext);
    useEffect(() => {
        if (!listCandidates?.length) {
            return;
        }

        const candidate = listCandidates.find(candidate => candidate._id === candidateID);
        updateCandidate(candidate)
        if (!candidate) {
            return navigate("/feedbacks");
        }

        getData()
    }, [listCandidates])

    function addFeedbackSubmit(event) {
        event.preventDefault();

        const feedback = event.target.feedback.value;

        // FETCH REQUEST
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const jwt = common.getCookieJWT();
        myHeaders.append("Authentication", "bearer " + jwt);

        var raw = JSON.stringify({ internID: candidateID, feedback });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(config.API_BASE_URL + "/feedback/", requestOptions)
            .then(async response => {
                if (response.ok) {
                    return response.json()
                }
                const json = await response.json();
                throw Error(json.message);
            })
            .then(result => {
                console.log(result)
                getData()
                event.target.feedback.value = "";
            })
            .catch(error => {
                console.log('error', error.message)

                if (error.message == "token is not valid") {
                    navigate("/authentication/login");
                }
            });
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
                        <form onSubmit={addFeedbackSubmit}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Feedback"
                                placeholder="Write Your Feedback Here"
                                name="feedback"
                                fullWidth
                                multiline
                                rows={4.5}
                            />
                            <div style={{ textAlign: "right" }}>
                                <Button type="submit" variant="contained">Add Feedback</Button>
                            </div>
                        </form>
                    </Box>
                </div>
                <div style={{ padding: "0 1rem", height: "48vh", overflowY: "auto" }}>
                    <ul className="feedbackList">
                        {feedbacks.map((data, i) => {
                            return <li key={"feedback" + i}>
                                <pre>
                                    {data.feedback}
                                </pre>
                                <div className="feedbackFooter">
                                    <small>{data.createDate}</small>
                                </div>
                            </li>
                        })}

                        {
                            feedbacks.length == 0 &&
                            <>
                                <h3 style={{ textAlign: "center", color: "#777", margin: "2rem 0" }}>No Feedback Given Yet</h3>
                            </>
                        }
                    </ul>
                </div>
            </DialogContent>
        </PopUp>
    </>
}