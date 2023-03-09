import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import PageTitle from "../../Common/PageTitle";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    'maxWidth': "lg"
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CandidateInformation(props) {
    const params = useParams();
    const candidateID = params.candidateID

    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        navigate("/candidates/get/");
    };

    useEffect(() => {
        handleClickOpen()
    }, [candidateID])

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
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                maxWidth={"lg"}
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <PageTitle title="candidate">
                        <PersonIcon style={{ fontSize: "2rem" }} />
                    </PageTitle>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className="space-between">
                        <a href={candidate.resumeLink} target="_blank" rel="noreferrer" style={{ marginRight: "1rem" }}><Button variant="contained">Resume</Button></a>
                        <Link><Button variant="contained">Proceed To Selection</Button></Link>
                    </div>
                </DialogContent>
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
                    <Button autoFocus onClick={handleClose}>
                        Proceed To Selection
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    </>

}