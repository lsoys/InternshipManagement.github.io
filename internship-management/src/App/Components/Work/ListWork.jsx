import { useEffect, useState } from 'react';

import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
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

import data from "../../../TestData/work.json"

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
    {
        id: 'status',
        label: 'Status',
    },
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
        label: 'Operation',
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
            assignedOn: value.assignedOn,
            deadline: value.deadline,
            operations:
                <>
                    <Link style={{ padding: ".1rem", display: "inline-block" }} to={"/feedbacks/"} >{/* + value._id */}
                        <Button size="small" variant="contained" style={{ textTransform: "capitalize" }}><Typography noWrap>OPERATION</Typography></Button>
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
                    <Typography>{children}</Typography>
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

export default function ListWorks() {
    const [value, setValue] = useState(0);

    const [rows, updateRows] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        updateRows(createRows(data));
    }, [])

    const searchOptions = [
        { title: 'Sejal Khilari' },
        { title: 'Sumit Kawale' },
        { title: 'Anuja Katruwar' },
    ]

    return <>
        <PageTitle title="assign work">
            <EngineeringOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>

        <div className='container-top'>
            <Link to={"/works/assign"}>
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
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="PENDING" {...a11yProps(0)} />
                    <Tab label="PAST-DUE" {...a11yProps(1)} />
                    <Tab label="COMPLETED" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <DataTable rows={rows} cols={columns} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DataTable rows={rows} cols={columns} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DataTable rows={rows} cols={columns} />
            </TabPanel>
        </Box>
    </>
}