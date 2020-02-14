import React, { Component } from 'react';

class Breadcrum extends Component {
	constructor(props) {
		super(props);
		this.state = { date: new Date() };
	}
	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 1000);
	}
	render() {
		return (
			<div className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1 className="m-0 text-dark">Dashboard</h1>
						</div>
						<div className="col-sm-6">
							<ol className="breadcrumb float-sm-right">
								<li className="breadcrumb-item">
									<a href="#">Home</a>
								</li>
								<li className="breadcrumb-item active">Dashboard v1</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Breadcrum;
