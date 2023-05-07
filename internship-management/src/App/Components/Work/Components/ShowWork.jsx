import { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import PopUp from "../../Common/PopUp";

import { WorkContext } from '../ListWork';

export default function ShowWork() {
    const data = useContext(WorkContext);

    console.log(data);
    const workID = useParams().workID;

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/works/");
    };

    let work = data.find(work => work._id === workID)
    console.log(work)
    if (!work) {
        return;
    }

    return <>
        <div>
            <PopUp popUpClose={handleClose} title="candidate" icon={<PersonIcon style={{ fontSize: "2rem" }} />}>
                <DialogContent dividers>
                    <h1>title: {work.title}</h1>
                    <hr />
                    <h2>description: {work.description}</h2>
                    <hr />
                    <h2>deadline: {work.deadline}</h2>
                    <hr />
                    <h2>status: {work.status ? "completed" : "pending"}</h2>
                    <hr />
                    {
                        work.assignTo.map((value, index) => {
                            return <>
                                <li>{value._id.fullName}</li>
                            </>
                        })
                    }
                </DialogContent>
            </PopUp>
        </div>
    </>
}
