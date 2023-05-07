import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import { createContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';

import PageTitle from '../Common/PageTitle';
import DataTable from '../Common/DataTable';
import fetchData from "../Common/fetchData";

import "../../css/feedback.css";

export const InternContext = createContext();

const columns = [
    {
        id: 'sr',
        label: '#',
        minWidth: 10
    },
    {
        id: 'n',
        // label: 'Name',
        minWidth: 30
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
    /* {
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
    }, */
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
            name: value.fullName,
            email: value.emailID,
            operations:
                <>
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"./" + value._id}>{/* + value._id */}
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Feedback</Typography></Button>
                    </Link>
                </>
        }
    })
}

export default function Feedbacks() {
    const [rows, updateRows] = useState([])
    const [data, updateData] = useState([])
    const [searchOptions, updateSearchOptions] = useState([])

    const [loadingStatus, updateLoadingStatus] = useState(true);

    const navigate = useNavigate();

    function getData(fetchFrom = () => fetchData("get", "/candidate/intern"), reloadSearchOptions = true) {
        fetchFrom().then(data => {
            console.log(data)
            data = data.reverse()
            updateRows(createRows(data));
            updateData(data);

            reloadSearchOptions && updateSearchOptions(() => {
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
        e.preventDefault();

        const searchText = e.target.searchText.value;

        getData(() => fetchData("get", "/candidate/intern/search?q=" + searchText), false)
    }

    return <>
        <PageTitle title="feedbacks">
            <FeedbackOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <div className='container-top'>
            <div></div>
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
        <div className='headerGap'></div>

        <div style={{ width: "70%", margin: "0 auto" }}>
            <DataTable loading={loadingStatus} rows={rows} cols={columns} />
        </div>

        <InternContext.Provider value={data}>
            <Outlet />
        </InternContext.Provider>
    </>
}