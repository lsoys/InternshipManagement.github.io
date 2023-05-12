import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from "react-router-dom"
import './index.css';
import App from './App/App';
import Error404 from './Error404';
import Home from './App/Components/Home/Home';
import ListCandidates from './App/Components/Candidate/ListCandidates';
import NewCandidate from './App/Components/Candidate/NewCandidate';
import ListInterns from './App/Components/Candidate/ListInterns';
import Groups from './App/Components/Group/ListGroups';
import ListWorks from './App/Components/Work/ListWork';
import Feedbacks from './App/Components/Feedback/ListFeedbacks';
import CandidateInformation from './App/Components/Candidate/Components/CandidateInformation';
import CandidateSelection from './App/Components/Candidate/Components/CandidateSelection';
import NewGroup from './App/Components/Group/NewGroup';
import Login from './Authentication/Login';
import InternProfile from './App/Components/Candidate/Components/InternProfile';
import InternFeedback from './App/Components/Feedback/Components/InternFeedback';
import NewWork from './App/Components/Work/NewWork';
import ShowWork from './App/Components/Work/Components/ShowWork';
import GroupDetails from './App/Components/Group/Components/GroupDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<HashRouter>
		<Routes>
			<Route path="/authentication/login" element={<Login />} />

			<Route path="/" element={<App />}>
				<Route path="/" element={<Home />} />

				<Route path="candidates/add/" element={<NewCandidate />} />
				<Route path="candidates/" element={<ListCandidates />}>
					<Route path=':candidateID' element={<CandidateInformation />} />
					<Route path=':candidateID/selection' element={<CandidateSelection />} />
				</Route>
				<Route path="candidates/interns/" element={<ListInterns />}>
					<Route path=':candidateID' element={<InternProfile />} />
				</Route>

				<Route path="groups/" element={<Groups />}>
					<Route path="add/" element={<NewGroup />} />
					<Route path=":groupID" element={<GroupDetails />} />
				</Route>

				<Route path="works/add/" element={<NewWork />} />
				<Route path="works/" element={<ListWorks />} >
					<Route path=':workID' element={<ShowWork />} />
				</Route>

				<Route path="feedbacks/" element={<Feedbacks />}>
					<Route path=':candidateID' element={<InternFeedback />} />

				</Route>
			</Route>
			<Route path="*" element={<Error404 />} />
		</Routes>
	</HashRouter>
);