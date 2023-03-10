import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import PopUp from "../../Common/PopUp";
import DialogContent from '@mui/material/DialogContent';

export default function CandidateSelection(props) {
    const params = useParams();
    // eslint-disable-next-line
    const candidateID = params.candidateID;

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/candidates/get/");
    };

    return <>
        <PopUp popUpClose={handleClose} goBack>
            <DialogContent dividers>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2 },
                    }}
                    validate
                    autoComplete="off"
                >
                    <div>
                        <h1>{candidateID}</h1>

                    </div>
                </Box>
            </DialogContent>
        </PopUp>
    </>
}