import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

import PageTitle from '../Common/PageTitle';
import DataTable from '../Common/DataTable';

import data from "../../../TestData/candidates.json"
import { useEffect, useState } from 'react';

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
            name: value.firstName + value.lastName,
            createDate: value.createDate,
            operations: <Button size="small" variant="contained">Take Interview</Button>
        }
    })
}

export default function ListCandidates() {
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
        <PageTitle title="list of candidates">
            <FeaturedPlayListOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <div className='container-top'>
            <Link to={"/candidate/add"}>
                <Button variant="contained" color='info' startIcon={<AddBoxOutlinedIcon />}>
                    Add New Candidate
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

        <div>
            <DataTable rows={rows} cols={columns} />
        </div>
    </>
}