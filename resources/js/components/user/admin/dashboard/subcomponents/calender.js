import React, { Component } from 'react';

class Calender extends Component {
	render() {
		return (
			<div className="card bg-gradient-success">
				<div className="card-header border-0">
					<h3 className="card-title">
						<i className="far fa-calendar-alt" />
						Calendar
					</h3>
					<div className="card-tools">
						<div className="btn-group">
							<button
								type="button"
								className="btn btn-success btn-sm dropdown-toggle"
								data-toggle="dropdown"
							>
								<i className="fas fa-bars" />
							</button>
							<div className="dropdown-menu float-right" role="menu">
								<a href="#" className="dropdown-item">
									Add new event
								</a>
								<a href="#" className="dropdown-item">
									Clear events
								</a>
								<div className="dropdown-divider" />
								<a href="#" className="dropdown-item">
									View calendar
								</a>
							</div>
						</div>
						<button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
							<i className="fas fa-minus" />
						</button>
						<button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
							<i className="fas fa-times" />
						</button>
					</div>
				</div>
				<div className="card-body pt-0">
					<div id="calendar" />
				</div>
			</div>
		);
	}
}

export default Calender;
