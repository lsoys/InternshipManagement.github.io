import { createContext, useEffect, useState } from 'react';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import PageTitle from '../Common/PageTitle';
import DataTable from '../Common/DataTable';

import fetchData from "../Common/fetchData"

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

        const endDate = new Date(value.hireDetails.toDate).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);

        if (endDate >= today) {
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
                        <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/feedbacks/" + value._id} >{/* + value._id */}
                            <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Feedback</Typography></Button>
                        </Link>
                    </>
            }
        } else {
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
                        <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/feedbacks/" + value._id} >{/* + value._id */}
                            <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>Feedback</Typography></Button>
                        </Link>
                    </>
            }
        }


    })
}


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function divideDataToTabs(oldData, data) {
    let currentWorking = [];
    let past = [];
    let all = data.sort((a, b) => {
        return new Date(b.hireDetails.toDate) - new Date(a.hireDetails.fromDate);
    });

    data.forEach((intern) => {
        const endDate = new Date(intern.hireDetails.toDate).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);

        if (endDate >= today) {
            currentWorking.push(intern);
        } else {
            past.push(intern);
        }
    })
    // pending.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))

    return { currentWorking: createRows(currentWorking), past: createRows(past), all: createRows(all) }
}

export default function ListInterns() {
    const [tabIndex, updateTabIndex] = useState(0);

    const [rows, updateRows] = useState([])
    const [data, updateData] = useState([])
    const [searchOptions, updateSearchOptions] = useState([])

    const [loadingStatus, updateLoadingStatus] = useState(true);

    const handleChange = (event, newValue) => {
        updateTabIndex(newValue);
    };

    function getData(fetchFrom = () => fetchData("get", "/candidate/intern"), reloadSearchOptions = true) {
        fetchFrom().then(data => {
            console.log(data)
            data = data.reverse()
            updateRows((oldData) => divideDataToTabs(oldData, data));
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

        updateTabIndex(2);

        getData(() => fetchData("get", "/candidate/intern/search?q=" + searchText), false)
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


        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 2, borderColor: 'divider', }}>
                <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Current-working" {...a11yProps(0)} />
                    <Tab label="Past-Interns" {...a11yProps(1)} />
                    <Tab label="All Interns" style={{ color: "black" }} {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={tabIndex} index={0}>
                <DataTable loading={loadingStatus} rows={rows.currentWorking || []} cols={columns} />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <DataTable loading={loadingStatus} rows={rows.past || []} cols={columns} />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <DataTable loading={loadingStatus} rows={rows.all || []} cols={columns} />
            </TabPanel>
        </Box>

        <InternContext.Provider value={data}>
            <Outlet />
        </InternContext.Provider>
    </>
}