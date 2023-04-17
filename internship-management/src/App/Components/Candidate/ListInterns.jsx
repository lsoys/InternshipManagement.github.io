import { createContext, useEffect, useState } from 'react';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Link, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';

import PageTitle from '../Common/PageTitle';
import DataTable from '../Common/DataTable';

import common from "../../../common"

export const InternContext = createContext();

const columns = [
    {
        id: 'sr',
        label: '#',
        minWidth: 10
    },
    {
        id: 'name',
        label: 'Name',
        // minWidth: 170
    },
    {
        id: 'email',
        label: 'EmailID',
        // minWidth: 170
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
            name: value.fullName,
            email: value.emailID,
            startDate: value.hireDetails.fromDate,
            endDate: value.hireDetails.toDate,
            // paid: value.paid || "-",
            paidAmount: value.hireDetails.isPaid ? value.hireDetails.amount : "-",
            // stipend: value.stipend,
            stipendAmount: value.hireDetails.isStipend ? value.hireDetails.amount : "-",
            operations:
                <>
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/candidates/interns/" + value._id}>{/* + value._id */}
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Profile</Typography></Button>
                    </Link>
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/works/"}>{/* + value._id */}
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Assign Work</Typography></Button>
                    </Link>
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/feedbacks/"} >{/* + value._id */}
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Feedback</Typography></Button>
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

        fetch("http://localhost:2324/candidate/intern", requestOptions)
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

export default function ListInterns() {
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
                    return { title: data.fullName ?? "" };
                })
                const emails = data.map(data => {
                    return { title: data.emailID ?? "" };
                })
                // give Set a new array that contains only string title, destructure set in array and on that array, iterate through map and get values as objects
                let uniqueNames = [...new Set(names.map(data => data.title))].map(title => { return { title } })
                return [...uniqueNames, ...emails]
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
        <PageTitle title="list of interns">
            <ListAltOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <div className='container-top'>
            <div>{/* Empty to Keep SearchBox Right Aligned */}</div>
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


        <div style={{ width: "100%" }}>
            <DataTable rows={rows} cols={columns} />
        </div>

        <InternContext.Provider value={data}>
            <Outlet />
        </InternContext.Provider>
    </>
}