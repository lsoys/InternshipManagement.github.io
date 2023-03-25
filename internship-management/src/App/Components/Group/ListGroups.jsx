import { useEffect, useState } from 'react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PageTitle from '../Common/PageTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';

import DataTable from '../Common/DataTable';

import data from "../../../TestData/candidates.json"

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
        id: 'status',
        label: 'Status',
        // minWidth: 170
    },
    {
        id: 'createDate',
        label: 'Create',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'operations',
        label: 'Operation',
        align: 'right',
    },
];

function createRows(rows) {
    return rows.map((value, index) => {
        return {
            sr: ++index,
            name: value.firstName + " " + value.lastName,
            createDate: value.createDate,
            operations:
                <>
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/id/edit"}>{/* + value._id */}
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Edit</Typography></Button>
                    </Link>
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/id/delete"} >{/* + value._id */}
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Delete</Typography></Button>
                    </Link>
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/works/assign/"} >{/* + value._id */}
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Assign Work</Typography></Button>
                    </Link>
                </>
        }
    })
}

export default function Groups() {
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
        <PageTitle title="manage groups">
            <PeopleAltOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <div className='container-top'>
            <Link to={"/groups/add"}>
                <Button variant="contained" color='info' startIcon={<AddBoxOutlinedIcon />}>
                    Add New Group
                </Button>
            </Link>
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

        <Outlet />

        <div>
            <DataTable rows={rows} cols={columns} />
        </div>
    </>
}
