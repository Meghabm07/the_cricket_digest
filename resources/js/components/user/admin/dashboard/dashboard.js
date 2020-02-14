import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Breadcrum from '../utilities/breadcrum.js';
import ReportCard from './subcomponents/reportcards';
import Todolist from './subcomponents/todolist.js';
import Calender from './subcomponents/calender.js';

export default class Dashboard extends Component {
	render() {
		return (
			<div>
				<Breadcrum />
				<section className="content">
					<div className="container-fluid">
						<ReportCard />
						<div className="row">
							<div className="col-md-6">
								<Todolist />
							</div>
							<div className="col-md-6">
								<Calender />
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

if (document.getElementById('dashboard')) {
	ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
