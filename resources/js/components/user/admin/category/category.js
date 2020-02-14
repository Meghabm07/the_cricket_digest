import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './subcomponents/table';
import { BrowserRouter } from 'react-router-dom';

export default class Category extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = { date: new Date() };
	// }
	// componentDidMount() {
	// 	this.timerID = setInterval(() => this.tick(), 1000);
	// }

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	// tick() {
	// 	this.setState({
	// 		date: new Date()
	// 	});
	// }
	render() {
		return (
			<BrowserRouter>
				<div>
					<div className="pt-5 row">
						<div className="col-12">
							<Table />
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

if (document.getElementById('category')) {
	ReactDOM.render(<Category />, document.getElementById('category'));
}
