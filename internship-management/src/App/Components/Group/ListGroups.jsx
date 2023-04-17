import { createContext, useEffect, useState } from 'react';
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

import common from "../../../common"

export const GroupContext = createContext();


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
            name: value.groupName,
            status: value.status ?? "-",
            createDate: value.createDate,
            operations:
                <>
                    {/* <Link style={{ padding: ".1rem", display: "inline-block" }} to={`/groups/${value._id}/edit`}>
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Edit</Typography></Button>
                    </Link> 
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={`/groups/${value._id}/delete`} >
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Delete</Typography></Button>
                    </Link>*/}
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/works/assign/" + value._id} >
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Assign Work</Typography></Button>
                    </Link>
                </>
        }
    })
}

function fetchData() {
    return new Promise((res, rej) => {
        var myHeaders = new Headers();
        const jwt = common.getCookieJWT();
        myHeaders.append("Authentication", "bearer " + jwt);
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include', // This is required to send cookies with the request
        };

        fetch("http://localhost:2324/group", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                res(result);
            })
            .catch(error => {
                console.log('error', error)
                rej(error);
            });
    })
}

function searchData(query) {
    return new Promise((res, rej) => {
        var myHeaders = new Headers();
        const jwt = common.getCookieJWT();
        myHeaders.append("Authentication", "bearer " + jwt);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:2324/candidate/intern/search?q=" + query, requestOptions)
            .then(response => response.json())
            .then(result => res(result))
            .catch(error => {
                console.log('error', error)
                rej(error);
            });
    })
}

export default function Groups() {
    const [rows, updateRows] = useState([])
    const [data, updateData] = useState([])
    const [searchOptions, updateSearchOptions] = useState([])

    function getData(fetchFrom = fetchData, parameter = "") {
        fetchFrom(parameter).then(data => {
            console.log(data)
            data = data.reverse()
            updateRows(createRows(data));
            updateData(data);

            updateSearchOptions(() => {
                const names = data.map(data => {
                    return { title: data.groupName };
                })
                // return unique group names
                return [...new Set(names.map(data => data.title))].map(title => { return { title } })
            });

        })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getData();
    }, [])

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

        <GroupContext.Provider value={{ data, getData }}>
            <Outlet />
        </GroupContext.Provider>

        <div>
            <DataTable rows={rows} cols={columns} />
        </div>
    </>
}
