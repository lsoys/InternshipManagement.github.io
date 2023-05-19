import { useRef, useState, useContext } from "react";
import DialogActions from '@mui/material/DialogActions';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PopUp from "../../Common/PopUp";
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import FormControlLabel from '@mui/material/FormControlLabel';
import { NumericFormatCustom } from "../../Common/FormCustom";
import InputAdornment from '@mui/material/InputAdornment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';

import { CandidateContext } from '../ListCandidates';
import common from "../../../../common"
import config from "../../../../config";

const questions = [
    "Communication Skills",
    "Collaborative Skills",
    "Experience",
    "Presentation Skills",
    "Problem Solving Skills",
]

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

function updateCandidateData(data) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const jwt = common.getCookieJWT();
    myHeaders.append("Authentication", "bearer " + jwt);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    fetch(config.API_BASE_URL + "/candidate/selection", requestOptions)
        .then(response => response.ok ? response.json() : response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export default function CandidateSelection(props) {
    const { data, getData } = useContext(CandidateContext);

    // eslint-disable-next-line
    const candidateID = useParams().candidateID;

    const [value, setValue] = useState({});
    const [hover, setHover] = useState({});

    const [fromDateHelper, updateFromDateHelper] = useState("");
    const [toDateHelper, updateToDateHelper] = useState("");


    // console.log(value);

    const [internshipType, updateInternshipType] = useState('free');
    const [internshipAmount, updateInternshipAmount] = useState({ amount: 0, take: false });

    const handleInternshipType = (event) => {
        updateInternshipType(event.target.value);
        let take = false;
        let amount = 0;
        if (event.target.value !== "free") {
            take = true;
            amount = internshipAmount.amount
        }
        updateInternshipAmount({ amount, take })
    };
    // console.log(internshipType)
    // console.log(internshipAmount)

    // last popup of duration
    const state = useState(false);

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/candidates/");
    };

    const closeMainPopupRef = useRef(null);

    let candidate = data.find(candidate => candidate._id === candidateID)
    if (!candidate) {
        return;
    }

    function getFeedback() {
        return Object.keys(value).map((v) => {
            if (v == "overallFeedback") {
                return [v, value[v]]
            }
            return [questions[v], value[v]]
        }).filter(v => { return v[1] !== -1 }); // remove questions of which answer is not specified
    }

    function submitReject(popup) {
        const feedback = getFeedback();
        const hire = -1;
        const hireDetails = {}

        const data = { candidateID, feedback, hire, hireDetails };
        updateCandidateData(data);

        popup.handleClose();

        getData();
    }

    function submitHire(e) {
        e.preventDefault();
        let checkStatus = 0;

        const fromDate = new Date(e.target.fromDate.value);
        const toDate = new Date(e.target.toDate.value);
        const today = new Date();

        /**
         * user should not enter fromDate below 6 months and above 6 months from current date
         * user should select toDate as fromDate to minimum 1 month and maximum 1 year
         */

        const fromDateMinLimit = 0; // month/s
        const fromDateMaxLimit = 6; // month/s
        const toDateMaximumLimit = 12; // month/s
        const toDateMinimumLimit = 1; // month/s

        const fromDatePastLimit = new Date();
        fromDatePastLimit.setMonth(fromDatePastLimit.getMonth() - fromDateMinLimit);

        const fromDateFutureLimit = new Date();
        fromDateFutureLimit.setMonth(fromDateFutureLimit.getMonth() + fromDateMaxLimit);

        if (fromDate >= fromDatePastLimit && fromDate <= fromDateFutureLimit) {
            checkStatus++;
            updateFromDateHelper("");
        } else updateFromDateHelper("past date not allowed");

        const toDateMaxLimitDate = new Date(fromDate);
        toDateMaxLimitDate.setMonth(toDateMaxLimitDate.getMonth() + toDateMaximumLimit)

        const toDateMinLimitDate = new Date(fromDate);
        toDateMinLimitDate.setMonth(toDateMinLimitDate.getMonth() + toDateMinimumLimit)

        if (toDate <= toDateMaxLimitDate && toDate >= toDateMinLimitDate) {
            checkStatus++;
            updateToDateHelper("");
        } else updateToDateHelper("can be minimum 1 month and maximum 1 year");


        if (checkStatus == 2) {
            const feedback = getFeedback();
            const hire = 1;
            const hireDetails = {
                fromDate: e.target.fromDate.value,
                toDate: e.target.toDate.value,
                isPaid: internshipType === "paid",
                isStipend: internshipType === "stipend",
                amount: internshipAmount.amount
            }
            const data = { candidateID, feedback, hire, hireDetails };
            updateCandidateData(data);
        } else {
            return false;
        }

        getData();
    }

    return <>
        <PopUp popUpClose={handleClose} goBack ref={closeMainPopupRef}>
            <DialogContent dividers>
                <div>
                    <h4 style={{ fontWeight: "normal", minWidth: "35rem" }}>
                        <b>Candidate Name: </b>
                        {candidate.firstName + " " + candidate.lastName}

                        <span style={{ padding: "0 1rem" }}></span>

                        {/* <b>Candidate ID: </b> */}
                        {/* {candidateID} */}
                    </h4>

                </div>
            </DialogContent>
            <DialogContent dividers>
                <div>
                    {
                        questions.map((question, index) => {
                            return <Box
                                key={"question" + index}
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
                                <span>{question} </span>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Rating
                                        value={value[index] ?? 0}
                                        precision={1}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setValue((value) => {
                                                return { ...value, [index]: (newValue || -1) }
                                            });
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover((value) => {
                                                return { ...value, [index]: (newHover || -1) }
                                            })
                                        }}
                                        icon={<CircleRoundedIcon fontSize="inherit" color="info" />}
                                        emptyIcon={<CircleOutlinedIcon style={{ opacity: 0.55 }} color="primary" fontSize="inherit" />}
                                    />
                                    {
                                        value[index] !== null && (
                                            <Box sx={{ ml: 2, width: "6rem" }}>
                                                {
                                                    labels[(hover[index] !== -1 || hover[index] === undefined)
                                                        ? hover[index]
                                                        : value[index]]
                                                }
                                            </Box>
                                        )
                                    }
                                </Box>
                            </Box>
                        })
                    }
                    <br />
                    <TextField
                        id="outlined-multiline-static"
                        label="Overall Feedback (Optional)"
                        fullWidth
                        multiline
                        rows={4}
                        onChange={(event) => {
                            setValue((value) => {
                                return { ...value, overallFeedback: (event.target.value || "") }
                            });
                        }}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                {/* <Link to={""}> */}
                <Button variant="contained" color="info" onClick={() => state[1](true)}>
                    Proceed
                </Button>
                {/* </Link> */}
                {/* <Link to={""}> */}
                <Button variant="contained" color="error" onClick={() => submitReject(closeMainPopupRef.current)}>
                    Reject
                </Button>
                {/* </Link> */}
            </DialogActions>
        </PopUp>

        <PopUp title="Duration" state={state}>
            <form onSubmit={submitHire}>
                <DialogContent dividers>
                    <div>
                        <Box
                            sx={{
                                '& .MuiTextField-root': { m: 2 },
                            }}
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    required
                                    type={"date"}
                                    id="outlined-required"
                                    label="From Date"
                                    error={fromDateHelper || false}
                                    helperText={fromDateHelper}
                                    variant="filled"
                                    name="fromDate"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    required
                                    type={"date"}
                                    id="outlined-required"
                                    label="To Date"
                                    error={toDateHelper || false}
                                    helperText={toDateHelper}
                                    variant="filled"
                                    name="toDate"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div>
                                <Box sx={{ "marginLeft": "1rem", "marginTop": "1rem" }}>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Internship Type</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={internshipType}
                                        row
                                        onChange={handleInternshipType}
                                    >
                                        <FormControlLabel value="paid" control={<Radio />} label="Paid" />
                                        <FormControlLabel value="stipend" control={<Radio />} label="Stipend" />
                                        <FormControlLabel value="free" control={<Radio />} label="Free" />
                                    </RadioGroup>
                                </Box>
                                <br />
                                {
                                    (internshipType === "free") || < TextField
                                        required
                                        id="outlined-required"
                                        InputProps={{
                                            inputComponent: NumericFormatCustom,
                                        }}
                                        label="Amount ₹"
                                        onKeyUp={e => updateInternshipAmount({ amount: (Number.parseInt(e.target.value) || 0), take: true })}
                                        startadornment={
                                            <InputAdornment position="start">
                                                <CurrencyRupeeIcon />
                                            </InputAdornment>
                                        }
                                        helperText=""
                                    />
                                }
                            </div>
                        </Box>
                    </div>
                </DialogContent>
                <DialogActions>
                    {/* <Link to={""}> */}
                    <Button type="submit" variant="contained" color="info">
                        Hire
                    </Button>
                    {/* </Link> */}
                    {/* <Link to={""}> */}
                    <Button variant="contained" color="error" onClick={() => state[1](false)}>
                        Cancel
                    </Button>
                    {/* </Link> */}
                </DialogActions>
            </form>
        </PopUp>
    </>
}