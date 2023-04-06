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
import Works from './App/Components/Work/Works';
import Feedbacks from './App/Components/Feedback/ListFeedbacks';
import CandidateInformation from './App/Components/Candidate/Components/CandidateInformation';
import CandidateSelection from './App/Components/Candidate/Components/CandidateSelection';
import NewGroup from './App/Components/Group/NewGroup';
import Login from './Authentication/Login';

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
				<Route path="candidates/interns/" element={<ListInterns />} />

				<Route path="groups/" element={<Groups />}>
					<Route path="add/" element={<NewGroup />} />
				</Route>

				<Route path="works" element={<Works />} />

				<Route path="feedbacks" element={<Feedbacks />} >

				</Route>
			</Route>
			<Route path="*" element={<Error404 />} />
		</Routes>
	</HashRouter>
);