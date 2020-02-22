import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './subcomponents/table';
import Form from './subcomponents/form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { activeToaster } from '../../../../utilities/alerts';

export default class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formActive: false,
			formEditType: false,
			editFormActive: false,
			editCategoryId: '',
			categoryData: []
		};
		this.activateEditForm = this.activateEditForm.bind(this);
		this.activeAddCategoryForm = this.activeAddCategoryForm.bind(this);
		this.closeForm = this.closeForm.bind(this);
	}

	activeAddCategoryForm() {
		this.setState({ formActive: true });
	}

	closeForm() {
		this.setState({ formActive: false, editCategoryId: '', editFormActive: false });
	}

	activateEditForm(categoryId) {
		this.setState({ editFormActive: true, editCategoryId: categoryId, formActive: true });
	}

	render() {
		const isFormActive = this.state.formActive;
		let component;

		if (isFormActive) {
			component = (
				<Form
					categoryId={this.state.editCategoryId}
					editFormActive={this.state.editFormActive}
					onActiveToster={activeToaster}
					closeForm={this.closeForm}
				/>
			);
		} else {
			component = (
				<Table
					onActiveEditForm={this.activateEditForm}
					onActiveToster={activeToaster}
					onAddCategory={this.activeAddCategoryForm}
				/>
			);
		}

		return (
			<div>
				<ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_RIGHT} />
				<div className="row pt-5">
					<div className="col-md-11 m-auto">{component}</div>
				</div>
			</div>
		);
	}
}

if (document.getElementById('category')) {
	ReactDOM.render(<Category />, document.getElementById('category'));
}
