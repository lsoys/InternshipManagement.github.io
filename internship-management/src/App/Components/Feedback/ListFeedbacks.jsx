import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import PageTitle from '../Common/PageTitle';
import DataTable from '../Common/DataTable';

import data from "../../../TestData/interns.json"

const columns = [
    {
        id: 'sr',
        label: '#',
        minWidth: 10
    },
    {
        id: 'name',
        label: 'Name',
        minWidth: 170
    },
    {
        id: 'startDate',
        label: 'Start Date',
        format: (value) => value.toLocaleString('en-US'),
        // minWidth: 170
    },
    {
        id: 'endDate',
        label: 'End Date',
        format: (value) => value.toLocaleString('en-US'),
        // minWidth: 170
    },
    // {
    //     id: 'paid',
    //     label: 'Paid',
    // },
    {
        id: 'paidAmount',
        label: 'Paid Amount',
        // minWidth: 170
    },
    // {
    //     id: 'stipend',
    //     label: 'Stipend',
    // },
    {
        id: 'stipendAmount',
        label: 'Stipend Amount',
    },
    {
        id: 'operations',
        label: 'Operation',
        align: 'right',
        // minWidth: 170
    },
];

function createRows(rows) {
    return rows.map((value, index) => {
        return {
            sr: ++index,
            name: value.firstName + " " + value.lastName,
            startDate: value.startDate,
            endDate: value.endDate,
            // paid: value.paid || "-",
            paidAmount: value.paidAmount || "-",
            // stipend: value.stipend,
            stipendAmount: value.stipendAmount,
            operations:
                <>
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={""}>{/* + value._id */}
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Give Feedback</Typography></Button>
                    </Link>
                </>
        }
    })
}

export default function Feedbacks() {
    const [rows, updateRows] = useState([])

    useEffect(() => {
        updateRows(createRows(data));
    }, [])

    const searchOptions = [
        { title: 'Sejal Khilari' },
        { title: 'Sumit Kawale' },
        { title: 'Anuja Katruwar' },
    ]

    return <>
        <PageTitle title="feedbacks">
            <FeedbackOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <div className='container-top'>
            <div></div>
            <span>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={searchOptions.map((option) => option.title)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            size="small"
                            label="Search"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                <Button variant="contained" color='info' endIcon={<SearchIcon />}>
                    Search
                </Button>
            </span>
        </div>

        <div style={{ width: "100%" }}>
            <DataTable rows={rows} cols={columns} />
        </div>
    </>
}