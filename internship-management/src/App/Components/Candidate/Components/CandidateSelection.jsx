import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PopUp from "../../Common/PopUp";
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { useState } from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function CandidateSelection(props) {
    const params = useParams();
    // eslint-disable-next-line
    const candidateID = params.candidateID;

    const [value, setValue] = useState({});
    const [hover, setHover] = useState({});

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
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: "100%",
                            p: 2,
                            pt: 1,
                            pb: 1,
                            justifyContent: "space-between"
                        }}
                    >
                        <span>Communication Skills </span>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="question-1"
                                value={value.question1 ?? -1}
                                precision={1}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setValue((value) => {
                                        return { ...value, question1: (newValue ? newValue : -1) }
                                    });
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover((value) => {
                                        return { ...value, question1: (newHover ? newHover : -1) }
                                    })
                                }}
                                icon={<CircleRoundedIcon fontSize="inherit" color="info" />}
                                emptyIcon={<CircleOutlinedIcon style={{ opacity: 0.55 }} color="primary" fontSize="inherit" />}
                            />
                            {value.question1 !== null && (
                                <Box sx={{ ml: 2, width: "6rem" }}>{labels[(hover.question1 !== -1 || hover.question1 === undefined) ? hover.question1 : value.question1]}</Box>
                            )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: "100%",
                            p: 2,
                            pt: 1,
                            pb: 1,
                            justifyContent: "space-between"
                        }}
                    >
                        <span>Collaborative Skills </span>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="question-1"
                                value={value.question2}
                                precision={1}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setValue((value) => {
                                        return { ...value, question2: (newValue ? newValue : -1) }
                                    });
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover((value) => {
                                        return { ...value, question2: (newHover ? newHover : -1) }
                                    })
                                }}
                                icon={<CircleRoundedIcon fontSize="inherit" color="info" />}
                                emptyIcon={<CircleOutlinedIcon style={{ opacity: 0.55 }} color="primary" fontSize="inherit" />}
                            />
                            {value.question2 !== null && (
                                <Box sx={{ ml: 2, width: "6rem" }}>{labels[(hover.question2 !== -1 || hover.question2 === undefined) ? hover.question2 : value.question2]}</Box>
                            )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: "100%",
                            p: 2,
                            pt: 1,
                            pb: 1,
                            justifyContent: "space-between"
                        }}
                    >
                        <span>Experience </span>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="question-1"
                                value={value.question3}
                                precision={1}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setValue((value) => {
                                        return { ...value, question3: (newValue ? newValue : -1) }
                                    });
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover((value) => {
                                        return { ...value, question3: (newHover ? newHover : -1) }
                                    })
                                }}
                                icon={<CircleRoundedIcon fontSize="inherit" color="info" />}
                                emptyIcon={<CircleOutlinedIcon style={{ opacity: 0.55 }} color="primary" fontSize="inherit" />}
                            />
                            {value.question3 !== null && (
                                <Box sx={{ ml: 2, width: "6rem" }}>{labels[(hover.question3 !== -1 || hover.question3 === undefined) ? hover.question3 : value.question3]}</Box>
                            )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: "100%",
                            p: 2,
                            pt: 1,
                            pb: 1,
                            justifyContent: "space-between"
                        }}
                    >
                        <span>Presentation Skills </span>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="question-1"
                                value={value.question4}
                                precision={1}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setValue((value) => {
                                        return { ...value, question4: (newValue ? newValue : -1) }
                                    });
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover((value) => {
                                        return { ...value, question4: (newHover ? newHover : -1) }
                                    })
                                }}
                                icon={<CircleRoundedIcon fontSize="inherit" color="info" />}
                                emptyIcon={<CircleOutlinedIcon style={{ opacity: 0.55 }} color="primary" fontSize="inherit" />}
                            />
                            {value.question4 !== null && (
                                <Box sx={{ ml: 2, width: "6rem" }}>{labels[(hover.question4 !== -1 || hover.question4 === undefined) ? hover.question4 : value.question4]}</Box>
                            )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: "100%",
                            p: 2,
                            pt: 1,
                            pb: 1,
                            justifyContent: "space-between"
                        }}
                    >
                        <span>Problem Solving Skills </span>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="question-1"
                                value={value.question5}
                                precision={1}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setValue((value) => {
                                        return { ...value, question5: (newValue ? newValue : -1) }
                                    });
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover((value) => {
                                        return { ...value, question5: (newHover ? newHover : -1) }
                                    })
                                }}
                                icon={<CircleRoundedIcon fontSize="inherit" color="info" />}
                                emptyIcon={<CircleOutlinedIcon style={{ opacity: 0.55 }} color="primary" fontSize="inherit" />}
                            />
                            {value.question5 !== null && (
                                <Box sx={{ ml: 2, width: "6rem" }}>{labels[(hover.question5 !== -1 || hover.question5 === undefined) ? hover.question5 : value.question5]}</Box>
                            )}
                        </Box>
                    </Box>
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
                    <Button variant="contained" color="info">
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