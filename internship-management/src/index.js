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
import Groups from './App/Components/Group/Groups';
import Works from './App/Components/Work/Works';
import Feedbacks from './App/Components/Feedback/Feedbacks';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<HashRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="/" element={<Home />} />

				<Route path="candidate/get/" element={<ListCandidates />} />
				<Route path="candidate/add/" element={<NewCandidate />} />
				<Route path="candidate/interns/" element={<ListInterns />} />

				<Route path="groups" element={<Groups />} />

				<Route path="works" element={<Works />} />

				<Route path="feedbacks" element={<Feedbacks />} />
			</Route>
			<Route path="*" element={<Error404 />} />
		</Routes>
	</HashRouter>
);