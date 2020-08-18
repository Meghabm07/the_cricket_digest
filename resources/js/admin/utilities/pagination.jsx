import React, { Component } from 'react';

class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.changePage = this.changePage.bind(this);
	}

	changePage(page) {
		this.props.setPage(page);
	}

	render() {
		var pagination = this.props.pagination;
		var liElement = [];

		for (let i = 1; i <= pagination.last_page; i++) {
			liElement.push(
				<li key={i} className={pagination.current_page == i ? 'page-item active' : 'page-item'}>
					<a onClick={() => this.changePage(i)} className="page-link" href="#">
						{i}
					</a>
				</li>
			);
		}

		return (
			<nav aria-label="...">
				<ul className="pagination mb-0">
					<li className={pagination.current_page - 1 < 1 ? 'page-item disabled' : 'page-item'}>
						<a
							onClick={() => this.changePage(pagination.current_page - 1)}
							className="page-link"
							href="#"
							tabIndex="-1"
						>
							Previous
						</a>
					</li>
					{liElement}
					<li
						className={
							pagination.current_page + 1 > pagination.last_page ? 'page-item disabled' : 'page-item '
						}
					>
						<a onClick={() => this.changePage(pagination.current_page + 1)} className="page-link" href="#">
							Next
						</a>
					</li>
				</ul>
			</nav>
		);
	}
}
export default Pagination;
