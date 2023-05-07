import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import PageTitle from "../Common/PageTitle";
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    const { children, onClose, open, ...other } = props;

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
    open: PropTypes.bool.isRequired,
};

const PopUp = forwardRef((props, ref) => {

    let [open, setOpen] = useState(true);
    [open, setOpen] = props?.state ?? [open, setOpen];

    const handleClickOpen = () => {
        setOpen(true);
    };

    function handleClose(close) {
        setOpen(false);
        props.popUpClose && props.popUpClose();
    };


    useEffect(() => {
        open && handleClickOpen();

        // eslint-disable-next-line
    }, [])

    useImperativeHandle(ref, () => ({
        handleClose,
        handleClickOpen,
    }));

    return <div>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            maxWidth={"md"}
            fullWidth={props.fullWidth}
            disableEscapeKeyDown
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} open={open} >
                {
                    props.goBack
                        ?
                        <Link to={"./../"}>
                            <IconButton color="secondary" aria-label="add an alarm">
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        : <PageTitle title={props.title}>
                            {props.icon}
                        </PageTitle>
                }
            </BootstrapDialogTitle>
            {props.children}
        </BootstrapDialog>
    </div>
});

export default PopUp;