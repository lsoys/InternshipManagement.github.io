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
import fetchData from "../Common/fetchData";

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
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/groups/" + value._id} >
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>View</Typography></Button>
                    </Link>
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/works/assign/" + value._id} >
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Assign Work</Typography></Button>
                    </Link>
                </>
        }
    })
}

export default function Groups() {
    const [rows, updateRows] = useState([])
    const [data, updateData] = useState([])
    const [searchOptions, updateSearchOptions] = useState([])

    const [loadingStatus, updateLoadingStatus] = useState(true);

    function getData(fetchFrom = () => fetchData("get", "/group"), reloadSearchOptions = true) {
        fetchFrom().then(data => {
            console.log(data)
            data = data.reverse()
            updateRows(createRows(data));
            updateData(data);

            reloadSearchOptions && updateSearchOptions(() => {
                const names = data.map(data => {
                    return { title: data.groupName };
                })
                // return unique group names
                return [...new Set(names.map(data => data.title))].map(title => { return { title } })
            });

        })
            .catch(error => {
                if (error.message == "token is not valid") {
                    navigate("/authentication/login");
                }
            }).finally(() => {
                updateLoadingStatus(false);
            })
    }

    useEffect(() => {
        getData();
    }, [])


    function submitSearch(e) {
        console.log("hoty kayi tri")
        e.preventDefault();

        const searchText = e.target.searchText.value;

        getData(() => fetchData("get", "/group/search?q=" + searchText), false)
    }


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
            <form onSubmit={submitSearch}>
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
                                name="searchText"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" color='info' endIcon={<SearchIcon />}>
                        Search
                    </Button>
                </span>
            </form>
        </div>

        <GroupContext.Provider value={{ data, getData }}>
            <Outlet />
        </GroupContext.Provider>

        <div>
            <DataTable loading={loadingStatus} rows={rows} cols={columns} />
        </div>
    </>
}
