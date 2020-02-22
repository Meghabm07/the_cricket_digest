import React, { Component } from 'react';
import ConfirmDelete from './confirmdelete';
import Pagination from '../../../../../utilities/pagination';
import TableDataSearch from '../../../../../utilities/tabledatasearch';
class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryData: [],
			rowsCount: 10,
			keywords: '',
			categoryId: '',
			pagination: {
				current_page: 1,
				last_page: 1
			}
		};
		this.activeCreateForm = this.activeCreateForm.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.getCategoryData = this.getCategoryData.bind(this);
		this.onRowCountChange = this.onRowCountChange.bind(this);
		this.openEditForm = this.openEditForm.bind(this);
		this.openConfirmModal = this.openConfirmModal.bind(this);
		this.setNewPage = this.setNewPage.bind(this);
	}

	getCategoryData() {
		const url = '/category/list';
		var rowsCountData = this.state.rowsCount;
		var keywordsData = this.state.keywords;
		axios
			.get(url, {
				params: {
					page: this.state.pagination.current_page,
					rowsCount: rowsCountData,
					keywords: keywordsData
				}
			})
			.then((response) => {
				this.setState({ categoryData: response.data });
				this.setState({
					pagination: {
						current_page: response.data.current_page,
						last_page: response.data.last_page
					}
				});
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	}

	openEditForm(id) {
		this.props.onActiveEditForm(id);
	}

	componentDidMount() {
		this.getCategoryData();
	}

	activeCreateForm() {
		this.props.onAddCategory();
	}

	openConfirmModal(id) {
		this.setState({ categoryId: id });
		$('#confirmModel').modal('show');
	}

	onSearch(event) {
		this.setState({ keywords: event.target.value }, this.getCategoryData);
	}

	onRowCountChange() {
		this.setState({ rowsCount: event.target.value }, this.getCategoryData);
	}

	setNewPage(newPage) {
		this.setState(
			{
				pagination: {
					current_page: newPage
				}
			},
			this.getCategoryData
		);
	}
	render() {
		var categoryDetails = this.state.categoryData.data;
		var rows;
		if (categoryDetails != undefined) {
			if (categoryDetails.length != 0) {
				rows = (
					<tbody>
						{categoryDetails.map((category, i) => {
							return (
								<tr key={i}>
									<td>{i + 1}.</td>
									<td>{category.name}</td>
									<td>
										<img src={category.image} alt="" width="50" height="50" />
									</td>
									<td>{category.description}</td>
									<td>
										<a onClick={() => this.openEditForm(category.id)}>
											<i className="fas fa-edit" />
										</a>
									</td>
									<td>
										<a onClick={() => this.openConfirmModal(category.id)}>
											<i className="fas fa-trash" />
										</a>
										<ConfirmDelete
											activeToaster={this.props.onActiveToster}
											categoryId={this.state.categoryId}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				);
			} else if (categoryDetails.length == 0) {
				rows = (
					<tbody>
						<tr>
							<td colSpan="6" className="text-info text-bold text-center">
								No Data
							</td>
						</tr>
					</tbody>
				);
			}
		}

		return (
			<div className="container-fluid">
				<div className="row ">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header">
								<div>
									<TableDataSearch
										onSearch={this.onSearch}
										onRowCountChange={this.onRowCountChange}
										activeCreateForm={this.activeCreateForm}
									/>
								</div>
							</div>
							<div className="card-body table-responsive">
								<table className="table  table-hover table-bordered">
									<thead>
										<tr>
											<th>#</th>
											<th>Name</th>
											<th>Image</th>
											<th>Description</th>
											<th>Edit</th>
											<th>Delete</th>
										</tr>
									</thead>
									{rows}
								</table>
							</div>
							<div className="card-footer clearfix">
								<Pagination pagination={this.state.pagination} setPage={this.setNewPage} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Table;
