import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			image: '',
			errors: '',
			formTitle: '',
			editData: [],
			buttonName: ''
		};
		this.setValue = this.setValue.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getEditData = this.getEditData.bind(this);
	}

	componentDidMount() {
		if (this.props.categoryId != '' && this.props.editFormActive) {
			this.setState({ formTitle: 'Edit Category', buttonName: 'Update' });
			this.getEditData();
		} else {
			this.setState({ formTitle: 'New Category', buttonName: 'Submit' });
		}
	}

	getEditData() {
		const url = '/category/' + this.props.categoryId;

		axios
			.get(url)
			.then((response) => {
				this.setState({
					name: response.data.name,
					description: response.data.description,
					image: response.data.image
				});
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	}

	onSubmit(event) {
		event.preventDefault();
		let formData = new FormData();
		let url;
		if (this.props.categoryId != '' && this.props.editFormActive) {
			url = '/category/' + this.props.categoryId;
			formData.append('method', 'put');
		} else {
			formData.append('method', 'post');
			url = '/category';
		}

		let config = {
			headers: { 'content-type': 'multipart/form-data' }
		};

		formData.append('name', this.state.name);

		formData.append('description', this.state.description);

		formData.append('image', this.state.image);

		axios
			.post(url, formData, config)
			.then((response) => {
				this.props.onActiveToster({ message: response.data.message, status: 'success' });
				this.props.closeForm();
			})
			.catch((error) => {
				if (error.response.status) {
					if (error.response.status == 422) {
						this.props.onActiveToster({ message: error.response.data.message, status: 'error' });

						this.setState({ errors: error.response.data.errors });
					}
				}
			});
	}

	setValue(event) {
		event.persist();
		if (event.target.name != 'image') {
			this.setState({ [event.target.name]: event.target.value });
		} else if ((event.target.name = 'image')) {
			this.setState({ image: event.target.files[0] });
		}
	}

	render() {
		return (
			<div className="card card-secondary">
				<div className="card-header">
					<h3 className="card-title">{this.state.formTitle}</h3>
				</div>
				<form role="form">
					<div className="card-body">
						<div className="form-group">
							<label htmlFor="exampleInputName">Name</label>
							<input
								onChange={this.setValue}
								type="text"
								name="name"
								value={this.state.name}
								className="form-control"
								id="exampleInputName"
								placeholder="Enter Name"
							/>
							{this.state.errors ? <span className="text-danger">{this.state.errors.name}</span> : null}
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputDescription">Description</label>
							<textarea
								onChange={this.setValue}
								name="description"
								value={this.state.description}
								id="exampleInputDescription"
								className="form-control"
								placeholder="Enter Description"
							/>
							{this.state.errors ? (
								<span className="text-danger">{this.state.errors.description}</span>
							) : null}
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputFile">Image</label>
							<div className="input-group">
								<input
									name="image"
									onChange={this.setValue}
									type="file"
									className="form-control"
									id="exampleInputFile"
								/>
							</div>
							{this.state.errors ? <span className="text-danger">{this.state.errors.image}</span> : null}
						</div>
					</div>

					<div className="card-footer text-right">
						<button type="button" onClick={this.onSubmit} className="btn btn-primary">
							{this.state.buttonName}
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Form;
