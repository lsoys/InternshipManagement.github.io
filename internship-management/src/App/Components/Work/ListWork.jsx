import { createContext, useEffect, useState } from 'react';

import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageTitle from '../Common/PageTitle';

import "../../css/work.css"

import DataTable from '../Common/DataTable';
import fetchData from "../Common/fetchData"

export const WorkContext = createContext();

const columns = [
    {
        id: 'sr',
        label: '#',
        minWidth: 10
    },
    {
        id: 'title',
        label: 'Title',
        minWidth: 170
    },
    {
        id: 'priority',
        label: 'Priority',
    },
    // {
    //     id: 'status',
    //     label: 'Status',
    // },
    {
        id: 'assignedOn',
        label: 'Assigned On',
    },
    {
        id: 'deadline',
        label: 'Deadline',
    },
    {
        id: 'operations',
        label: 'Task Details',
        align: 'right',
    },
];

function createRows(rows) {
    return rows.map((value, index) => {
        return {
            sr: ++index,
            title: value.title,
            priority: value.priority,
            status: value.status,
            assignedOn: value.createDate,
            deadline: new Date(value.deadline).toLocaleDateString(),
            operations:
                <>
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/works/" + value._id} >{/* + value._id */}
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>View</Typography></Button>
                    </Link>
                </>
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
    let pending = [];
    let pastDue = [];
    let completed = [];

    const today = new Date();

    data.forEach((work) => {
        const deadline = new Date(work.deadline);
        if (work.status) {
            completed.push(work);
        } else {
            if ((deadline >= today) || (deadline.toLocaleDateString() === today.toLocaleDateString())) {
                pending.push(work);
            } else {
                pastDue.push(work);
            }
        }
    })
    pending.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))

    return { pending: createRows(pending), pastDue: createRows(pastDue), completed: createRows(completed) }
}

export default function ListWorks() {
    const [tabIndex, updateTabIndex] = useState(0);

    const [rows, updateRows] = useState({})
    const [data, updateData] = useState([])
    const [searchOptions, updateSearchOptions] = useState([])

    const [loadingStatus, updateLoadingStatus] = useState(true);

    const handleChange = (event, newValue) => {
        updateTabIndex(newValue);
    };

    function getData(fetchFrom = () => fetchData("get", "/work"), reloadSearchOptions = true) {
        fetchFrom().then(data => {
            // console.log(data)
            data = data.reverse()
            updateRows((oldData) => divideDataToTabs(oldData, data));
            updateData(data);
            console.log(data)

            reloadSearchOptions && updateSearchOptions(() => {
                const titles = data.map(data => {
                    return { title: data.title ?? "" };
                })
                // give Set a new array that contains only string title, destructure set in array and on that array, iterate through map and get values as objects
                let uniqueNames = [...new Set(titles.map(data => data.title))].map(title => { return { title } })
                return [...uniqueNames]
            });

        })
            .catch(error => {
                console.log(error)
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

    return <>
        <PageTitle title="assign work">
            <EngineeringOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <div className='container-top'>
            <Link to={"/works/add"}>
                <Button variant="contained" color='info' startIcon={<AddBoxOutlinedIcon />}>
                    Assign New Task
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

        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 2, borderColor: 'divider', }}>
                <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="PENDING" {...a11yProps(0)} />
                    <Tab label="PAST-DUE" style={{color:"red"}} {...a11yProps(1)} />
                    <Tab label="COMPLETED" style={{color:"green"}} {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={tabIndex} index={0}>
                <DataTable loading={loadingStatus} rows={rows.pending || []} cols={columns} />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <DataTable loading={loadingStatus} rows={rows.pastDue || []} cols={columns} />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <DataTable loading={loadingStatus} rows={rows.completed || []} cols={columns} />
            </TabPanel>
        </Box>
        <WorkContext.Provider value={data}>
            <Outlet />
        </WorkContext.Provider>
    </>
}