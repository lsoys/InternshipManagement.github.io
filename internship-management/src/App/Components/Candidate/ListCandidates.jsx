import { useEffect, useState, createContext } from 'react';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';

import PageTitle from '../Common/PageTitle';
import DataTable from '../Common/DataTable';
import common from "../../../common"

export const CandidateContext = createContext();

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
        id: 'email',
        label: 'Email',
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
            name: value.firstName + " " + value.lastName,
            email: value.emailID,
            createDate: value.createDate,
            operations:
                <Link to={"/candidates/" + value._id}>
                    <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Take Interview</Typography></Button>
                </Link>
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

        fetch("http://localhost:2324/candidate/", requestOptions)
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

        fetch("http://localhost:2324/candidate/search?q=" + query, requestOptions)
            .then(response => response.json())
            .then(result => res(result))
            .catch(error => {
                console.log('error', error)
                rej(error);
            });
    })
}

export default function ListCandidates() {
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
                    return { title: data.firstName + " " + data.lastName };
                })
                const emails = data.map(data => {
                    return { title: data.emailID };
                })
                return [...names, ...emails]
            });

        })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getData();
    }, [])

    function submitSearch(e) {
        e.preventDefault();

        const searchText = e.target.searchText.value;

        getData(searchData, searchText)
    }


    return <>
        <PageTitle title="list of candidates">
            <FeaturedPlayListOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <div className='container-top'>
            <Link to={"/candidates/add"}>
                <Button variant="contained" color='info' startIcon={<AddBoxOutlinedIcon />}>
                    Add New Candidate
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
        <CandidateContext.Provider value={{ data, getData }}>
            <Outlet />
        </CandidateContext.Provider>

        <div>
            <DataTable rows={rows} cols={columns} />
        </div>
    </>

}