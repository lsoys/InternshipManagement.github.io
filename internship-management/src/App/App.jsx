import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import "./App.css";
import fetchData from './Components/Common/fetchData';

const drawerWidth = 260;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));


const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
);

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();

	const handleDrawerOpen = () => {
		setOpen(true);
		localStorage.setItem("driver-state", true)
	};

	const handleDrawerClose = () => {
		setOpen(false);
		localStorage.removeItem("driver-state")
	};

	const projectTheme = createTheme({
		palette: {
			primary: {
				// main: "#1f1f6f",
				// eslint-disable-next-line
				main: "#370779",
			},
			info: {
				main: "rgb(113,116,255)"
			},
			light: {
				main: "#e6e6e6"
			},
			white: {
				main: "#ffffff"
			}
		},
	})

	React.useEffect(() => {
		localStorage.getItem("driver-state") && setOpen(true);

		fetchData("POST", "/authentication/verify")
			.then(data => {
				// console.log(data)
			})
			.catch(error => {
				// console.log(error)
				// if (error.message == "token is not valid") {
				navigate("/authentication/login");
				// }
			})
	}, [])

	return (
		<ThemeProvider theme={projectTheme}>

			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="fixed" open={open}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								mr: 2,
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<NavLink to="/">
							<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} style={{ color: "white" }}>
								CompanySpace
							</Typography>
						</NavLink>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={open}>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						<ListItem className={"navLink"} disablePadding sx={{ display: 'block' }}>
							<NavLink to="/candidates/add">
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<AddBoxOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary={"Add New Candidate"} sx={{ opacity: open ? 1 : 0 }} />
								</ListItemButton>
							</NavLink>
						</ListItem>
						<ListItem className={"navLink"} disablePadding sx={{ display: 'block' }}>
							<NavLink to="/candidates/">
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<FeaturedPlayListOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary={"List Of Candidates"} sx={{ opacity: open ? 1 : 0 }} />
								</ListItemButton>
							</ NavLink>
						</ListItem>
						<ListItem className={"navLink"} disablePadding sx={{ display: 'block' }}>
							<NavLink to="/candidates/interns">
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<ListAltOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary={"List Of Interns"} sx={{ opacity: open ? 1 : 0 }} />
								</ListItemButton>
							</NavLink>
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem className={"navLink"} disablePadding sx={{ display: 'block' }}>
							<NavLink to="/works/add">
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<WorkOutlineIcon />
									</ListItemIcon>
									<ListItemText primary={"Assign Work"} sx={{ opacity: open ? 1 : 0 }} />
								</ListItemButton>
							</ NavLink>
						</ListItem>
						<ListItem className={"navLink"} disablePadding sx={{ display: 'block' }}>
							<NavLink to="/works/">
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<EngineeringOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary={"List Of Works"} sx={{ opacity: open ? 1 : 0 }} />
								</ListItemButton>
							</ NavLink>
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem className={"navLink"} disablePadding sx={{ display: 'block' }}>
							<NavLink to="/groups">
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<PeopleAltOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary={"Manage Groups"} sx={{ opacity: open ? 1 : 0 }} />
								</ListItemButton>
							</ NavLink>
						</ListItem>
						<ListItem className={"navLink"} disablePadding sx={{ display: 'block' }}>
							<NavLink to="/feedbacks">
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<FeedbackOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary={"Feedbacks"} sx={{ opacity: open ? 1 : 0 }} />
								</ListItemButton>
							</NavLink>
						</ListItem>
					</List>
					<Divider />
					<ListItem className={"navLink"} key={"LogOut"} disablePadding sx={{ display: 'block' }}>
						<NavLink to="/authentication/login" onClick={function () {
							const cookies = document.cookie.split(";");
							for (let i = 0; i < cookies.length; i++) {
								const cookie = cookies[i];
								const eqPos = cookie.indexOf("=");
								const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
								document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
							}

						}}>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary={"LogOut"} sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</NavLink>
					</ListItem>
				</Drawer>
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />
					<main>
						<Outlet />
					</main>
				</Box>
			</Box>
		</ThemeProvider >
	);
}