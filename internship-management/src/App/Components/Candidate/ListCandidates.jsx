import { useEffect, useState, createContext } from 'react';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import PageTitle from '../Common/PageTitle';
import DataTable from '../Common/DataTable';
import fetchData from "../Common/fetchData";

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
            name: value.fullName,
            email: value.emailID,
            createDate: value.createDate,
            operations:
                <Link to={"/candidates/" + value._id}>
                    <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Take Interview</Typography></Button>
                </Link>
        }
    })
}

export default function ListCandidates() {
    const [rows, updateRows] = useState([])
    const [data, updateData] = useState([])
    const [searchOptions, updateSearchOptions] = useState([])

    const [loadingStatus, updateLoadingStatus] = useState(true);

    const navigate = useNavigate();

    function getData(fetchFrom = () => fetchData("get", "/candidate/"), reloadSearchOptions = true) {
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

    function submitSearch(e) {
        e.preventDefault();

        const searchText = e.target.searchText.value;

        getData(() => fetchData("get", "/candidate/search?q=" + searchText), false)
    }

    useEffect(() => {
        getData();
    }, [])


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
            <DataTable loading={loadingStatus} rows={rows} cols={columns} />
        </div>
    </>

}